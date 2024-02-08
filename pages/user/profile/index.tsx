import React, { useState, useRef } from "react";
import UserAside from "../../../components/Client/UserAside/index";
import UserAsideModal from "@/components/Client/UserAsideModal";
import MainHeader from "../../../components/Client/MainHeader/index";
import Image from "next/image";
import { toast } from "react-toastify";
import { QUERIES } from "../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";
import { useQuery } from "react-query";
import uploadImg from "../../../public/svgs/upload2.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { animated } from "@react-spring/web";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, UserDataType } from "@/interfaces";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { fileStorage } from "../../../server/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { updateUser, getUser } from "@/services";
import { isValidPhone } from "@/constant/ValidRegex";
import login from "../../../public/svgs/login.svg";

const ProfileUser = () => {
  const { data: userD, isLoading, isError } = useQuery(QUERIES.User, getUser);
  console.log(userD);
  const fullNRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const userNRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const lastUser: UserDataType = {
    email: "",
    address: "",
    username: "",
    img_url: "",
    phone: null,
    fullname: "",
  };
  const [newUser, setNewUser] = useState<UserDataType>(lastUser);
  const {
    showUserModal,
    setSelectedFile,
    setUserImg,
    userImg,
    closeUserModal,
    modalSpring,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");
  const handleNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUserImg(URL.createObjectURL(file));
      const restaurantId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 1000
      )}`;
      const imageRef = ref(fileStorage, `images/${file.name + restaurantId}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              setNewUser((prevUser) => ({
                ...prevUser,
                img_url: downloadURL,
              }));
              console.log("Dosyanın Firebase Storage URL'si: ", downloadURL);
            })
            .catch((error) => {
              console.error("Download URL alınırken bir hata oluştu: ", error);
            });
        })
        .catch((error) => {
          console.error("Dosya yüklenirken bir hata oluştu: ", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(() => updateUser(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.User);
      setNewUser(lastUser);
      setUserImg(null);
      setSelectedFile(null);
      setTimeout(() => {}, 1000);
      toast.success("Profile Updated successfully!", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error("Error update profile:", error);
      toast.error("Error update profile", {
        autoClose: 1000,
      });
    },
  });
  const handleUpdateUser = () => {
    const phoneValue = phoneRef.current?.value;

    if (
      !fullNRef.current?.value ||
      !userNRef.current?.value ||
      !phoneValue ||
      !addressRef.current?.value
    ) {
      toast.error("Please fill in all required fields", { autoClose: 1500 });
      return;
    }

    if (phoneValue && !isValidPhone(phoneValue)) {
      toast.error("Please enter a valid phone number", { autoClose: 1500 });
      return;
    }
    setNewUser({
      email: mailRef.current?.value,
      address: addressRef.current?.value,
      username: userNRef.current?.value,
      img_url: userImg ?? userD?.data.user.img_url,
      phone: phoneValue,
      fullname: fullNRef.current?.value,
    });

    setTimeout(() => {
      mutation.mutate();
    }, 100);
  };
  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />

        {showUserModal && (
          <>
            <div className="fixed inset-0 bg-black dark:bg-gray-200 opacity-60 z-40 md:opacity-0"></div>

            <animated.div
              style={{
                ...modalSpring,
                position: "fixed",
                top: "30vh",
                left: 0,
                right: 0,
                zIndex: 50,
              }}
              className="bg-white dark:bg-gray-800 rounded-t-[20px] flex flex-col w-full max-h-[45vh] overflow-y-auto items-center justify-start md:hidden asideScroll"
            >
              <div className="my-2" onClick={closeUserModal}>
                <IoIosCloseCircleOutline
                  size={40}
                  className="text-[#BDBDBD] dark:text-sky-400  "
                />
              </div>
              <UserAsideModal />
            </animated.div>
            <animated.div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "black",
                zIndex: 40,
                opacity: 0,
              }}
              onClick={closeUserModal}
            />
          </>
        )}

        <div className="w-10/12 md:w-8/12 bg-[#F3F4F6] dark:bg-gray-900 asideScroll max-h-[75vh] overflow-y-auto">
          <h1 className="capitalize text-[#4F4F4F] dark:text-green-300 text-[30px] font-semibold ml-7 mt-6">
            {t("Your Profile")}
          </h1>

          <div className="flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full ">
            <label
              htmlFor="user_img"
              className="flex flex-col items-center justify-center w-full rounded-[14px]  cursor-pointer  "
            >
              {userImg ? (
                <div className="flex flex-col items-center justify-center py-2 px-7 rounded-full ">
                  <Image
                    src={userImg ? userImg : login}
                    height={75}
                    width={75}
                    alt="Uploaded Image"
                    className="rounded-full w-[110px] h-[110px]"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2 px-7 rounded-full  bg-white dark:bg-black">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                  <p className="text-[#929292] dark:text-[#6FCF97] font-semibold text-lg">
                    {t("upload")}
                  </p>
                </div>
              )}
              <input
                onChange={(e) => handleNewImg(e)}
                id="user_img"
                type="file"
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-wrap justify-evenly w-full pt-2 pb-5">
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("Full Name")}
              </label>
              <input
                type="text"
                defaultValue={userD?.data.user.fullname ?? ""}
                ref={fullNRef}
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("User Name")}
              </label>
              <input
                type="text"
                defaultValue={userD?.data.user.username ?? ""}
                ref={userNRef}
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300  mb-2 font-semibold">
                {t("Contact")}
              </label>
              <input
                type="text"
                defaultValue={userD?.data.user.phone ?? ""}
                ref={phoneRef}
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>

            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("Email")}
              </label>
              <input
                type="email"
                disabled
                defaultValue={userD?.data.user.email ?? ""}
                ref={mailRef}
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("Address")}
              </label>
              <input
                type="text"
                defaultValue={userD?.data.user.address ?? ""}
                ref={addressRef}
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mt-8 w-10/12 md:w-5/12">
              <button
                onClick={() => handleUpdateUser()}
                className="capitalize py-[5px] px-4 bg-[#6FCF97] font-bold text-lg text-white dark:text-gray-900 rounded-[4px] hover:bg-[#54ff9b]  transition-all duration-500 cursor-pointer  "
              >
                {t("Send")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

import React from "react";
import UserAside from "../../../components/Client/UserAside/index";
import UserAsideModal from "@/components/Client/UserAsideModal";
import MainHeader from "../../../components/Client/MainHeader/index";
import Image from "next/image";
import uploadImg from "../../../public/svgs/upload2.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { animated } from "@react-spring/web";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProfileUser = () => {
  const { showUserModal, closeUserModal, modalSpring } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

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
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full rounded-[14px]  cursor-pointer  "
            >
              <div className="flex flex-col items-center justify-center py-2 px-7 rounded-full  bg-white dark:bg-black">
                <Image width={75} height={75} src={uploadImg} alt="upload" />
                <p className="text-[#929292] dark:text-[#6FCF97]  font-semibold text-lg">
                  {t("upload")}
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div className="flex flex-wrap justify-evenly w-full pt-2 pb-5">
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("Full Name")}
              </label>
              <input
                type="text"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("User Name")}
              </label>
              <input
                type="text"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300  mb-2 font-semibold">
                {t("Contact")}
              </label>
              <input
                type="text"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>

            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("Amount")}
              </label>
              <input
                type="email"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-5 w-10/12 md:w-5/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-2 font-semibold">
                {t("Address")}
              </label>
              <input
                type="text"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mt-8 w-10/12 md:w-5/12">
              <button className="capitalize py-[5px] px-4 bg-[#6FCF97] font-bold text-lg text-white dark:text-gray-900 rounded-[4px] hover:bg-[#54ff9b]  transition-all duration-500 cursor-pointer  ">
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

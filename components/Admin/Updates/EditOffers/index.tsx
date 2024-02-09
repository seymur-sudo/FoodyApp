import React, { useEffect, useState } from "react";
import Image from "next/image";
import uploadImg from "../../../../public/svgs/upload.svg";
import { fileStorage } from "@/server/configs/firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { QUERIES } from "@/constant/Queries";
import { useMutation, useQueryClient } from "react-query";
import { SidebarContextProps } from "../../../../interfaces/index";
import { updateOffer } from "@/services";
import { useTranslation } from "next-i18next";

const EditOffer: React.FC = () => {
  const { show, lastOffer, setSelectedFile, setNewImg, newImg, closeModal } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  const [edtOffer, setEdtOffer] = useState(lastOffer);

  const queryClient = useQueryClient();

  const editMutation = useMutation(updateOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Offers);
      toast.success("Offers edited successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        closeModal();
      }, 1100);
    },
    onError: (error) => {
      toast.error(`Error editing Offers: ${error}`, {
        autoClose: 1000,
      });
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setEdtOffer((prevCategory) => ({
      ...prevCategory!,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (lastOffer) {
      setEdtOffer({ ...lastOffer });
      setNewImg(lastOffer?.img_url);
    }
  }, [lastOffer]);

  const handleNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewImg(URL.createObjectURL(file));
      const offerId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 1000
      )}`;
      const imageRef = ref(fileStorage, `images/${file.name + offerId}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              setEdtOffer((prevOffer) => ({
                ...prevOffer!,
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

  const handleEditOffer = async () => {
    if (!edtOffer || !edtOffer.name || !edtOffer.description) {
      toast.error("Please fill out all fields", {
        autoClose: 1000,
      });
      return;
    }
    if (edtOffer) {
      const editWithImg = {
        ...edtOffer,
        img_url: newImg,
      };
      await editMutation.mutateAsync(editWithImg);
    }
  };

  return (
    <>
      <div className=" text-gray1 font-body  leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> {t("Edit Offer")}</h1>
              <p className="capitalize text-lg">
                {" "}
                {t("Upload your category image")}
              </p>
              <div className="h-[50vh] w-3/4 my-4">
                <Image
                  width={300}
                  height={300}
                  src={newImg || uploadImg}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-[14px]"
                />
              </div>
              <p className=" text-lg">
                {" "}
                {t("Edit your Offer description and necesarry information")}
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]">
                  {" "}
                  {t("Edit Offer")}
                </h1>
                <p className="capitalize text-xl">
                  {" "}
                  {t("Edit your Offer description and necesarry information")}
                </p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  show ? "" : "opacity-0 pointer-events-none "
                }`}
              >
                <span className="text-[#F2F2F2] text-3xl cursor-pointer z-50 mb-[6px]">
                  x
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="offer-edt-file"
                className="flex flex-col items-center justify-center w-full rounded-[14px]  bg-[#43445A]  cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                </div>
                <input
                  id="offer-edt-file"
                  name="img_url"
                  onChange={handleNewImg}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
            {t("Edit your Offer description and necesarry information")}

            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">{t("Name")}</label>
                <input
                  type="text"
                  name="name"
                  value={edtOffer?.name}
                  onChange={handleInputChange}
                  className="w-full p-2 py-6 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="my-5 flex flex-col">
                  
                <label className="mb-1">{t("Descriptionn")}:</label>

                <textarea
                  className="w-full pl-5 h-[125px]  rounded-[14px] bg-inputBg leading-10 resize-y"
                  name="description"
                  value={edtOffer?.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[10%] flex justify-around md:justify-between">
          <button className="capitalize rounded-[14px] 	border-color: [#38394E] border-solid  border-0 bg-[#43445A] shadow-shadow1 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px] ">
            cancel
          </button>
          <button
            onClick={handleEditOffer}
            className="capitalize rounded-[14px]  	border-color:[#970e79] border-solid  border-0 bg-[#C035A2] shadow-shadow2 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px]"
          >
            {editMutation.isLoading 
               ? t("offer is editing")
               : t("Edit Offer")
            }
          </button>
        </div>
      </div>
    </>
  );
};

export default EditOffer;

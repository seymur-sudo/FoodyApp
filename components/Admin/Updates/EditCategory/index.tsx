import React, { useState, useEffect } from "react";
import Image from "next/image";
import uploadImg from "../../../../public/svgs/upload.svg";
import { SidebarContextProps } from "../../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { QUERIES } from "../../../../constant/Queries";
import { editCategory } from "../../../../services/index";
import { useTranslation } from "next-i18next";
import useImageUpload from "@/helpers/uploadImage";

const EditCategory: React.FC = () => {
  const { show, closeModal, editedCategory, newImg, setNewImg } =
    useSidebarContext() as SidebarContextProps;

  const [updatedCategory, setUpdatedCategory] = useState(editedCategory);
  const { t } = useTranslation("common");

  const queryClient = useQueryClient();

  const editCategoryMutation = useMutation(editCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Categories);
      toast.success("Category edited successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        closeModal();
      }, 1100);
    },
    onError: (error) => {
      toast.error(`Error editing Category: ${error}`, {
        autoClose: 1000,
      });
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUpdatedCategory((prevCategory) => ({
      ...prevCategory!,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (editedCategory) {
      setUpdatedCategory({ ...editedCategory });
      setNewImg(editedCategory?.img_url || null);
    }
  }, [editedCategory]);

  const { handleImageUpload } = useImageUpload();

  const handleNewImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const downloadURL = await handleImageUpload(file);
      setUpdatedCategory((prevCategory) => ({
        ...prevCategory!,
        img_url: downloadURL,
      }));
    } else {
      console.error("No file selected");
    }
  };
  const handleEditCategory = async () => {
    if (!updatedCategory || !updatedCategory.name) {
      toast.error("Please fill out all fields", {
        autoClose: 1000,
      });
      return;
    }
    if (updatedCategory) {
      const editWithImg = {
        ...updatedCategory,
        img_url: newImg || "",
      };
      await editCategoryMutation.mutateAsync(editWithImg);
    }
  };

  useEffect(() => {
    if (!show) {
      setUpdatedCategory(editedCategory);
    }
  }, [show]);

  return (
    <>
      <div className=" text-gray1 font-body  leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2">
                {" "}
                {t("Edit Category")}
              </h1>
              <p className="capitalize text-lg">
                {" "}
                {t("Upload your offer image")}
              </p>
              <div className="h-[25vh] w-3/4 my-4">
                <Image
                  width={500}
                  height={500}
                  src={newImg || uploadImg}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-sm"
                />
              </div>
              <p className=" text-lg">
                {" "}
                {t("Edit your Category description and necesarry information")}
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]">
                  {" "}
                  {t("Edit Category")}
                </h1>
                <p className="capitalize text-xl">
                  {" "}
                  {t("Upload your category image")}
                </p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  show ? "" : "opacity-0 pointer-events-none "
                }`}
                onClick={closeModal}
              >
                <span className="text-[#F2F2F2] text-3xl cursor-pointer z-50 mb-[6px]">
                  x
                </span>
              </div>
            </div>

            <div className="flex md:hidden h-[16vh]  items-center justify-center mb-4 md:mb-8   w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="add-rest-file"
                className="flex flex-col items-center justify-center  rounded-[14px] w-full h-full bg-[#43445A]  cursor-pointer  "
              >
                {newImg ? (
                  <div className="flex  items-center justify-center  w-full h-full">
                    <Image
                      width={200}
                      height={200}
                      src={newImg ?? uploadImg}
                      alt="upload"
                      className="w-full h-[16vh]  object-cover  rounded-sm"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                    <Image
                      width={75}
                      height={75}
                      src={uploadImg}
                      alt="upload"
                      className="object-cover"
                    />
                  </div>
                )}

                <input
                  id="add-rest-file"
                  type="file"
                  className="hidden"
                  onChange={handleNewImg}
                />
              </label>
            </div>

            <div className="hidden md:flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="add-rest-file"
                className="flex flex-col items-center justify-center w-full rounded-[14px]  bg-[#43445A]  cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                </div>
                <input
                  name="img_url"
                  id="add-rest-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleNewImg(e)}
                />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
              {t("Edit your Category description and necesarry information")}
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1"> {t("Name")}</label>
                <input
                  type="text"
                  className="w-full p-2 py-6 rounded-[14px] bg-inputBg"
                  name="name"
                  value={updatedCategory?.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[18%] flex justify-around md:justify-between">
          <button
            className="capitalize rounded-[14px] 	border-color: [#38394E] border-solid  border-0 bg-[#43445A] shadow-shadow1 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px] "
            onClick={closeModal}
          >
            {t("Cancel")}
          </button>
          <button
            onClick={handleEditCategory}
            className="capitalize rounded-[14px]  	border-color:[#970e79] border-solid  border-0 bg-[#C035A2] shadow-shadow2 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px]"
          >
            {editCategoryMutation.isLoading
              ? t("category is editing")
              : t("Edit Category")}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCategory;

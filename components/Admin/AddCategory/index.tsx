import React, { useState } from "react";
import Image from "next/image";
import uploadImg from "../../../public/svgs/upload.svg";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import { addCategory } from "@/services";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { InitialCategoryState } from "../../../interfaces/index";
import { QUERIES } from "../../../constant/Queries";
import { fileStorage } from "../../../server/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { isFormValid } from "@/constant/ValidRegex";


const initialState: InitialCategoryState = {
  name: "",
  img_url: "",
};

const AddCategory: React.FC = () => {
  const { showAdds, closeAddsModal, newImg, setNewImg, setSelectedFile } =
    useSidebarContext() as SidebarContextProps;
  const [newCategory, setNewCategory] =
    useState<InitialCategoryState>(initialState);

  const queryClient = useQueryClient();
  const mutation = useMutation(() => addCategory(newCategory), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Categories);
      setNewCategory(initialState);
      setTimeout(() => {
        closeAddsModal();
      }, 1100);
      setSelectedFile(null);
      toast.success("Category added successfully!", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error("Error added Category:", error);
      toast.error("Error added Category", {
        autoClose: 1000,
      });
    },
  });


  const handleAddCategory = async () => {
    if (isFormValid(newCategory)) {
      mutation.mutate();
    } else {
      toast.error("Please fill in all fields before creating the Category", {
        autoClose: 1000,
      });
    }
  };


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };
  const handleNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewImg(URL.createObjectURL(file));
      const categorytId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 10000
      )}`;
      const storagePath = `images/${file.name + categorytId}`;
      const imageRef = ref(fileStorage, storagePath);

      uploadBytes(imageRef, file)
        .then((snapshot) => {
          console.log("File uploaded successfully:", snapshot);
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          setNewCategory((prevProduct) => ({
            ...prevProduct,
            img_url: downloadURL,
          }));
          console.log("Dosyanın Firebase Storage URL'si: ", downloadURL);
        })
        .catch((error) => {
          console.error("Error during file upload:", error);
          console.error("Dosya yüklenirken bir hata oluştu: ", error);
        });
    } else {
      console.error("No file selected");
    }
  };


  return (
    <>
      <div className=" text-gray1 font-body  leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> add Category</h1>
              <p className="capitalize text-lg">upload your Category image</p>
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
                Add your Category description and necesarry information
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]"> add category</h1>
                <p className="capitalize text-xl">upload your category image</p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  showAdds ? "" : "opacity-0 pointer-events-none "
                }`}
                onClick={closeAddsModal}
              >
                <span className="text-[#F2F2F2] text-3xl cursor-pointer z-50 mb-[6px]">
                  x
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full rounded-[14px] bg-[#43445A]">
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
              Add your Category description and necesarry information
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 py-4 rounded-[14px] bg-inputBg"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[18%] flex justify-around md:justify-between">
          <button
            className="capitalize rounded-[14px] 	border-color: [#38394E] border-solid  border-0 bg-[#43445A] shadow-shadow1 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px] "
            onClick={closeAddsModal}
          >
            cancel
          </button>
          <button
            className={`capitalize rounded-[14px] border-solid border-0 shadow-shadow1 transition-all duration-500 w-5/12 py-3 md:py-4 text-lg font-bold leading-5 tracking-[0.25px] ${
              !isFormValid(newCategory)
                ? "bg-[#5a6874] cursor-not-allowed"
                : "bg-[#C035A2] hover:opacity-75"
            }`}
            disabled={!isFormValid(newCategory)}
            onClick={handleAddCategory}
          >
            {mutation.isLoading ? "category is creating" : " create category"}
          </button>
        </div>
      </div>

    </>
  );
};

export default AddCategory;

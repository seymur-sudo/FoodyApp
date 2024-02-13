import React, { useState, useEffect } from "react";
import Image from "next/image";
import uploadImg from "../../../public/svgs/upload.svg";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import {
  RestaurantPostDataType,
  SidebarContextProps,
} from "../../../interfaces/index";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { InitialStateType } from "../../../interfaces/index";
import { addProduct } from "../../../services/index";
import { useQuery } from "react-query";
import { getRestaurant } from "@/services/index";
import { QUERIES } from "../../../constant/Queries";
import { isFormValid } from "@/constant/ValidRegex";
import { useTranslation } from "next-i18next";
import useImageUpload from "@/helpers/uploadImage";


const initialState: InitialStateType = {
  name: "",
  description: "",
  price: 0,
  img_url: "",
  rest_id: "",
};

const AddProduct: React.FC = () => {
  const { data } = useQuery(QUERIES.Restaurants, getRestaurant);
  const { isSidebarOpen, closeSidebar, newImg } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  const [newProduct, setNewProduct] = useState<InitialStateType>(initialState);
  const queryClient = useQueryClient();
  const mutation = useMutation(() => addProduct(newProduct), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Products);
      setNewProduct(initialState);
      setTimeout(() => {
        closeSidebar();
      }, 1100);
      toast.success("Product added successfully!", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error("Error added Product:", error);
      toast.error("Error added Product", {
        autoClose: 1000,
      });
    },
  });

  useEffect(() => {
    if (!isSidebarOpen) {
      setNewProduct(initialState);
    }
  }, [isSidebarOpen]);

  const handleAddProduct = async () => {
    if (isFormValid(newProduct)) {
      mutation.mutate();
    } else {
      toast.error("Please fill in all fields before creating the product", {
        autoClose: 1000,
      });
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === "price" ? parseFloat(value) : value;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: parsedValue,
    }));
  };

  const { handleImageUpload } = useImageUpload();

  const handleNewImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const downloadURL = await handleImageUpload(file);
      setNewProduct((previous) => ({
        ...previous!,
        img_url: downloadURL,
      }));
    } else {
      console.error("No file selected");
    }
  };

  return (
    <>
      <div className=" text-gray1 font-body leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> {t("Add Product")}</h1>
              <p className="capitalize text-lg">
                {t("Upload your product image")}
              </p>
              <div className="h-[25vh] w-3/4 my-4">
                {newImg ? (
                  <Image
                    width={500}
                    height={500}
                    src={newImg || uploadImg}
                    alt="newImg"
                    className="object-cover w-full h-full rounded-sm"
                  />
                ) : (
                  ""
                )}
              </div>
              <p className=" text-lg">
                {t("Add your Product description and necesarry information")}
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]">
                  {" "}
                  {t("Add Product")}
                </h1>
                <p className="capitalize text-xl">
                  {t("Upload your product image")}
                </p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  isSidebarOpen ? "" : "opacity-0 pointer-events-none "
                }`}
                onClick={closeSidebar}
              >
                <span className="text-[#F2F2F2] text-3xl cursor-pointer z-50 mb-[6px]">
                  x
                </span>
              </div>
            </div>
         
           <div className="flex md:hidden h-[16vh]  items-center justify-center mb-4 md:mb-8   w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="dropzone-file"
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
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleNewImg}
                />
              </label>
            </div>  

            <div className="hidden md:flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full rounded-[14px]  bg-[#43445A]  cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleNewImg}
                />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
              {t("Add your Product description and necesarry information")}
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1"> {t("Name")}</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-5 flex flex-col">
                <label className="mb-1">{t("Description")}:</label>

                <textarea
                  className="w-full h-[100px] px-2 rounded-[14px] bg-inputBg leading-10 resize-y"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-5 flex flex-col">
                <label className="mb-1">{t("Price")}</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="restaurant" className="mb-1">
                  {t("Select Restaurant")}:
                </label>
                <select
                  id="restaurant"
                  className="w-full cursor-pointer p-3 rounded-[14px] bg-inputBg"
                  name="rest_id"
                  value={newProduct.rest_id}
                  onChange={handleInputChange}
                >
                  <option value="">{t("Select")}...</option>
                  {data?.data.result.data.map(
                    (restaurant: RestaurantPostDataType, index) => (
                      <option key={index} value={`${restaurant.name}`}>
                        {restaurant.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-around md:justify-between">
          <button
            className="capitalize rounded-[14px] 	border-color: [#38394E] border-solid  border-0 bg-[#43445A] shadow-shadow1 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px] "
            onClick={closeSidebar}
          >
            {t("Cancel")}:
          </button>
          <button
            className={`capitalize rounded-[14px] border-solid border-0 shadow-shadow1 transition-all duration-500 w-5/12 py-3 md:py-4 text-lg font-bold leading-5 tracking-[0.25px] ${
              !isFormValid(newProduct)
                ? "bg-[#5a6874] cursor-not-allowed"
                : "bg-[#C035A2] hover:opacity-75"
            }`}
            disabled={!isFormValid(newProduct)}
            onClick={handleAddProduct}
          >
            {mutation.isLoading
              ? t("product is creating")
              : t("create product")}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

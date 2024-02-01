import React from "react";
import pizza from "../../../public/svgs/pizza.svg";
import Image from "next/image";
import { LuTrash } from "react-icons/lu";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, BasketPostDataType } from "@/interfaces";
import { IoIosBasket } from "react-icons/io";
import DeleteUserProduct from "../Deletes/DeleteUserProduct";


const BasketResCard = () => {
  const {
    setshowDelete,
    setDeletedBasket,
    handleBasket,
    basketProducts,
    basketProductsItems,
  } = useSidebarContext() as SidebarContextProps;

  const openDeleteModal = (basketId: BasketPostDataType | null) => {
    setshowDelete(true);
    setDeletedBasket(basketId);
  };





  return (
    <>
      <div
        className={`bg-[#D63626] dark:bg-cyan-300 hover:opacity-75 hover:scale-105 transition-all duration-700 cursor-pointer mr-1 py-1 px-6 rounded-md flex items-center justify-center my-2 ${
          basketProductsItems && basketProductsItems.length === 0
            ? "hidden"
            : ""
        }`}
        onClick={() => openDeleteModal(basketProducts?.id || "")}
      >
        <LuTrash className="text-gray-200 dark:text-gray-900 text-xl  " />
        <p className="capitalize font-semibold ml-2 text-gray-200 dark:text-gray-900 ">
          clear all
        </p>
      </div>

      {basketProductsItems && basketProductsItems.length > 0 ? (
        basketProductsItems.map((product: BasketPostDataType) => (
          <div
            key={product.id}
            className="flex z-10 items-center w-[80vw] justify-around py-3 border-b-2 border-gray-300 dark:border-sky-300"
          >
            <Image
              src={product.img_url ?? pizza}
              alt="pizza"
              width={100}
              height={100}
              className=" w-[45px] h-[45px] md:w-[95px] md:h-[95px] mx-5 rounded-full  object-cover"
            />
            <div className="w-7/12 ml-4">
              <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[12px] md:text-[22px] font-medium">
                {product.name}
              </h1>
              <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[12px] md:text-[18px] font-medium">
                $ {product.price}
              </span>
            </div>

            <div className="md:text-xl  bg-gray-100 dark:bg-gray-700 text-black dark:text-cyan-300 font-medium flex flex-col items-center px-2 py-1 rounded-3xl">
              <span
                className="cursor-pointer"
                onClick={() => handleBasket(product.id || "", "increment")}
              >
                +
              </span>
              <span className="font-semibold"> {product.count}</span>

              <span
                className="cursor-pointer"
                onClick={() => handleBasket(product.id || "", "decrement")}
              >
                -
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className=" flex z-10 items-center w-[80vw]   flex-col  justify-center pt-7 text-red-600 dark:text-cyan-300">
          <div>
            <IoIosBasket className="w-[175px] h-[150px] " />
          </div>
          <p className="capitalize font-bold text-xl flex flex-col items-center pb-3 ">
            <span>oops !</span> <span>basket is empty</span>
          </p>
        </div>
      )}

      <DeleteUserProduct />
    </>
  );
};

export default BasketResCard;

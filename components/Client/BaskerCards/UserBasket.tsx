import React from "react";
import pizza from "../../../public/svgs/pizza.svg";
import Image from "next/image";
import { LuTrash } from "react-icons/lu";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, BasketPostDataType } from "@/interfaces";
import DeleteUserProduct from "../Deletes/DeleteUserProduct";
import { IoBasketOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { ROUTER } from "../../../shared/constant/router";
import { useTranslation } from "next-i18next";
import EmptyBasket from "../../../public/svgs/emptyBasket.svg";

const UserBasket = () => {
  const {
    setshowDelete,
    setDeletedBasket,
    isBasketEmpty,
    handleBasket,
    basketProducts,
    basketProductsItems,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  const { push } = useRouter();

  const openDeleteModal = (basketId: BasketPostDataType | null) => {
    setshowDelete(true);
    setDeletedBasket(basketId);
  };

  return (
    <>
      <div className="w-full  flex flex-col items-center">
        {basketProducts && (
          <div className="flex justify-between items-center px-2 py-3 w-full">
            <div className="flex justify-center items-center">
              <h1 className="capitalize py-2 text-[#4F4F4F)] dark:text-cyan-400 font-bold text-[25px]"></h1>
              <IoBasketOutline className="cursor-pointer text-3xl text-[#D63626] dark:text-cyan-300 hover:scale-110 transition-all duration-700 mx-2" />

              <p className="capitalize  text-[#D63626]  dark:text-cyan-400 font-bold text-[16px]">
                <span className="mr-1">
                  {basketProducts?.total_item} {t("items")}
                </span>
                <span className="mr-1">
                  - {basketProducts?.total_count} {t("count")}
                </span>
              </p>
            </div>

            <div
              className={`bg-[#D63626] dark:bg-cyan-300 hover:opacity-75 hover:scale-105 transition-all duration-700 cursor-pointer mr-1 py-1 px-6 rounded-md flex items-center ${
                basketProductsItems && basketProductsItems.length === 0
                  ? "hidden"
                  : ""
              }`}
              onClick={() => openDeleteModal(basketProducts?.id || "")}
            >
              <LuTrash className="text-gray-200 dark:text-gray-900 text-xl  " />
              <p className="capitalize font-semibold ml-2 text-gray-200 dark:text-gray-900 ">
                {t("clear all")}
              </p>
            </div>
          </div>
        )}
        <div className=" w-full bg-[#F3F4F6] dark:bg-gray-900 md:flex flex-col  items-center my-scrollable-component  overflow-y-auto">
          <div className="w-full min-h-[45vh] max-h-[45vh]">
            {basketProductsItems && basketProductsItems.length > 0 ? (
              basketProductsItems.map((product: BasketPostDataType) => (
                <div
                  className="w-full border-t-2 py-2 dark:border-sky-300"
                  key={product.id}
                >
                  <div className="flex items-center justify-around pt-2 pb-1 ">
                    <Image
                      src={product.img_url ?? pizza}
                      alt="product.name"
                      width={100}
                      height={100}
                      className=" w-[80px] h-[80px]  rounded-lg  object-cover"
                    />
                    <div className=" w-5/12">
                      <div className="flex flex-col justify-center items-center ">
                        <h1 className="capitalize pt-2  text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                          {product.name}
                        </h1>
                        <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                          <span className="mr-2">Price:</span> $ {product.price}
                        </span>
                        <span className="capitalize ml-2 text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                          <span className="mr-2">Price Total:</span> ${" "}
                          {product.amount}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 text-xl text-black dark:text-cyan-300 font-medium flex flex-col items-center px-3 py-2 rounded-3xl">
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          handleBasket(product.id || "", "increment")
                        }
                      >
                        +
                      </span>
                      <span className="font-semibold"> {product.count}</span>

                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          handleBasket(product.id || "", "decrement")
                        }
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" w-full flex flex-col items-center justify-center  text-[#BDBDBD] ">
                <div>
                  <Image
                    src={EmptyBasket}
                    alt="EmptyBasket"
                    width={300}
                    height={300}
                    className="w-[276px] h-[236px] object-cover "
                  />
                </div>
                <p className="capitalize font-bold text-2xl flex flex-col items-center pb-2 ">
                  <span>oops !</span> <span>{t("basket is empty")}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {basketProducts && (
          <div
            onClick={() => push(ROUTER.USER_CHECKOUT)}
            className={`h-12 w-11/12  md:w-10/12 ml-5 md:ml-0 my-3 cursor-pointer flex justify-center ${
              isBasketEmpty
                ? "opacity-20 pointer-events-none"
                : "hover:opacity-90 transition-all duration-500"
            }  flex items-center justify-between rounded-[100px]  bg-[#D63626] dark:bg-blue-500 text-white`}
          >
            <button className="capitalize mx-[3%] font-medium flex items-center">
              {t("Checkout")}
            </button>

            <p className="text-[#D63626] flex  items-center px-8 text-lg font-medium h-full rounded-[80px] border-2 border-[#D63626] dark:border-blue-500 bg-white dark:bg-gray-900 dark:text-sky-200">
              $ <span className="ml-2">{basketProducts?.total_amount}</span>
            </p>
          </div>
        )}
      </div>
      <DeleteUserProduct />
    </>
  );
};

export default UserBasket;

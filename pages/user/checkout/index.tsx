import React from "react";
import UserAside from "../../../components/Client/UserAside/index";
import MainHeader from "../../../components/Client/MainHeader/index";
import { BsDot } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery } from "react-query";
import { QUERIES } from "../../../constant/Queries";
import { BasketPostDataType } from "@/interfaces";
import { toast } from "react-toastify";
import { getBasket } from "@/services";

const UserCheckout = () => {
  const { t } = useTranslation("common");
  const { data: basket } = useQuery(QUERIES.Basket, getBasket);
  const basketProducts = basket?.data.result.data;
  const basketProductsItems = basket?.data.result.data.items;

  console.log("basketProductsItems", basketProductsItems);

  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />

        <div className="w-10/12 md:w-5/12 py-3 bg-[#F3F4F6] dark:bg-gray-900 ">
          <h1 className="capitalize text-[#4F4F4F] dark:text-green-300 text-[30px] font-semibold ml-10 my-6">
            {t("Checkout")}
          </h1>

          <div className="flex flex-wrap justify-evenly w-full pt-2 pb-5">
            <div className="flex flex-col mb-7 text-lg  w-10/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-4 font-semibold">
                Delivery Address
              </label>
              <input
                type="text"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col mb-7 text-lg w-10/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-4 font-semibold">
                Contact Number
              </label>
              <input
                type="text"
                className="py-2 px-4 bg-white dark:bg-black text-black dark:text-white rounded-[4px]"
              />
            </div>

            <div className="flex flex-col my-3 mr-5 w-10/12">
              <label className="capitalize text-xl text-[#4F4F4F] dark:text-green-300 font-bold m-4 ">
                {t("Payment Method")}
              </label>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    data-ripple-dark="true"
                  >
                    <input
                      name="type"
                      type="radio"
                      className="before:content[''] peer relative h-10 w-10 cursor-pointer appearance-none rounded-full border-2 border-green-500 text-green-600 duration-500  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                      id="on"
                    />
                    <span className="absolute text-green-600 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <BsDot
                        size={100}
                        className="text-green-600 daek:text-green-300"
                      />
                    </span>
                  </label>
                  <label className="mt-px  text-green-600 dark:text-green-300 font-semibold cursor-pointer select-none">
                    Pay at the door
                  </label>
                </div>
                <div className="inline-flex items-center">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                    <input
                      name="type"
                      type="radio"
                      className="before:content[''] peer relative h-10 w-10 cursor-pointer duration-500 appearance-none rounded-full border-2 border-green-500 text-green-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                      id="off"
                    />
                    <span className="absolute text-green-700 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <BsDot
                        size={100}
                        className="text-green-600 daek:text-green-300"
                      />
                    </span>
                  </label>
                  <label className="mt-px  font-semibold text-green-600 dark:text-green-300 cursor-pointer select-none">
                    By Credit Card
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-8 w-10/12">
              <button className="capitalize py-[5px] px-4 bg-[#6FCF97] font-bold text-lg text-white dark:text-gray-900 rounded-[4px] hover:bg-[#54ff9b]  transition-all duration-500 cursor-pointer  ">
                {t("Send")}
              </button>
            </div>
          </div>
        </div>

        <div className="w-10/12 md:w-3/12 mt-[5%] md:mt-[0%] capitalize text-[#828282)] px-6 py-3 dark:text-green-300 bg:[#F3F4F6] dark:bg-gray-900  asideScroll max-h-[45vh] overflow-y-auto">
          <div>
            <h1 className=" font-body font-semibold  text-lg text-center py-3">
              {t("Your Order")}
            </h1>

            {basketProductsItems && basketProductsItems.length > 0 ? (
              basketProductsItems.map((product: BasketPostDataType) => (
                <ul className="py-2 w-full " key={product.id}>
                  <li className="text-[14px] my-1">
                    <span className="text-lg font-medium">
                      <span>{product.count}</span>
                      <span>
                        <span className="mx-[6px]">x</span>
                        {product.name}
                      </span>
                      <span>
                        <span className="mx-[6px] text-[18px]">$</span>
                        <span className="ml-[2px]">{product.amount}</span>
                      </span>
                    </span>
                  </li>
                </ul>
              ))
            ) : (
              <p>No data</p>
            )}

            <div className="border-t-2 border-t-gray-400 dark:border-t-green-400 py-5 px-2 flex justify-between">
              <p className="font-medium text-[18px]"> {t("Total")} </p>
              {basketProducts && (
                <p className="font-semibold">
                  $ {basketProducts?.total_amount}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCheckout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

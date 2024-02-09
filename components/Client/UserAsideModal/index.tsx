import React from "react";
import { useRouter } from "next/router";
import { HiUsers } from "react-icons/hi";
import { ROUTER } from "../../../shared/constant/router";
import { IoBasketSharp } from "react-icons/io5";
import { FaBowlFood, FaSquareCheck } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useTranslation } from "next-i18next";


const UserAsideModal = () => {
  const { push, pathname } = useRouter();
  const { t } = useTranslation("common");


  return (
    <div className="w-full flex flex-col items-center pt-4 pb-8  bg-[#F3F4F6] dark:bg-gray-900 capitalize rounded-md ">
  
      <ul className="cursor-pointer py-4   text-[#828282)] dark:text-cyan-300 ">
      <li
          className={`flex items-center mb-5 ${
            pathname === ROUTER.USER_PROFILE
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_PROFILE)}
        >
          <HiUsers className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">{t("Your Profile")} </span>
        </li>

        <li
          className={`flex items-center ${
            pathname === ROUTER.USER_BASKET
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_BASKET)}
        >
          <IoBasketSharp className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">{t("Your Basket")}</span>
        </li>

        <li
          className={`flex items-center my-5 ${
            pathname === ROUTER.USER_ORDERS
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_ORDERS)}
        >
          <FaBowlFood className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">{t("Your Order")}</span>
        </li>
        <li
          className={`flex items-center ${
            pathname === ROUTER.USER_CHECKOUT
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_CHECKOUT)}
        >
          <FaSquareCheck className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">{t("Checkout")}</span>
        </li>
        <li
          className={`flex items-center mt-5 ${
            pathname === ROUTER.USER_BASKET
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_BASKET)}
        >
          <RiLogoutBoxFill className=" text-2xl hover:scale-110 transition-all duration-500 mr-2 " />
          <span className="text-xl font-semibold ">{t("Logout")}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserAsideModal;

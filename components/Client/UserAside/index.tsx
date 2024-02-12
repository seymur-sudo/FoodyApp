import React from "react";
import { useRouter } from "next/router";
import { HiUsers } from "react-icons/hi";
import { ROUTER } from "../../../shared/constant/router";
import { IoBasketSharp } from "react-icons/io5";
import { FaBowlFood, FaSquareCheck } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useTranslation } from "next-i18next";

const UserAside = () => {
  const { push, pathname } = useRouter();
  const { t } = useTranslation("common");

  const logout = () => {
    localStorage.removeItem("access_token");
    setTimeout(() => {
      push(ROUTER.LOGIN);
    }, 1500);
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    <div className="w-[22%] hidden h-[66.3vh] md:flex flex-col items-center pt-4 pb-6  bg-[#F3F4F6] dark:bg-gray-900 capitalize rounded-md ">
      <ul className="cursor-pointer py-5 pb-7 w-7/12 text-[#828282)] dark:text-cyan-300 font-poppins ">
        <li
          className={`flex items-center  py-[14px] pl-2  mb-[14px]  rounded-[4px] ${
            pathname === ROUTER.USER_PROFILE
              ? "text-[#D63626] dark:text-green-800 bg-red-100 dark:bg-green-300"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_PROFILE)}
        >
          <HiUsers className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-lg font-semibold "> {t("Your Profile")} </span>
        </li>
        <li
          className={`flex items-center py-[14px] pl-2  my-[14px]  rounded-[4px] ${
            pathname === ROUTER.USER_BASKET
              ? "text-[#D63626] dark:text-blue-500 bg-red-100 dark:bg-cyan-100"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_BASKET)}
        >
          <IoBasketSharp className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-lg font-semibold ">{t("Your Basket")}</span>
        </li>

        <li
          className={`flex items-center py-[14px] pl-2  my-[14px] rounded-[4px] ${
            pathname === ROUTER.USER_ORDERS
              ? "text-[#D63626] dark:text-blue-500 bg-red-100 dark:bg-cyan-100"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_ORDERS)}
        >
          <FaBowlFood className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-lg font-semibold ">{t("Your Order")}</span>
        </li>
        <li
          className={`flex items-center py-[14px] pl-2  my-[14px]   rounded-[4px] ${
            pathname === ROUTER.USER_CHECKOUT
              ? "text-[#D63626] dark:text-green-800 bg-red-100 dark:bg-green-300"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_CHECKOUT)}
        >
          <FaSquareCheck className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-lg font-semibold ">{t("Checkout")}</span>
        </li>
        <li
          className="flex items-center py-[14px] pl-2  my-[14px]  rounded-[4px] text-[#828282] dark:text-gray-400"
          onClick={() => logout()}
        >
          <RiLogoutBoxFill className=" text-2xl hover:scale-110 transition-all duration-500 mr-2 " />
          <span className="text-lg font-semibold ">{t("Logout")}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserAside;

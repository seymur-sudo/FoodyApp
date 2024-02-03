import React from "react";
import { useRouter } from "next/router";
import { HiUsers } from "react-icons/hi";
import { ROUTER } from "../../../shared/constant/router";
import { IoBasketSharp } from "react-icons/io5";
import { FaBowlFood, FaSquareCheck } from "react-icons/fa6";
import { RiLogoutBoxFill } from "react-icons/ri";

const UserAside = () => {
  const { push, pathname } = useRouter();

  return (
    <div className="w-3/12 hidden md:flex flex-col items-center pt-4 pb-8  bg-[#F3F4F6] dark:bg-gray-900 capitalize rounded-md ">
      <ul className="cursor-pointer py-4   text-[#828282)] dark:text-cyan-300 ">
        <li
          className={`flex items-center px-6 py-3 rounded-[4px] ${
            pathname === ROUTER.USER_PROFILE
              ? "text-[#D63626] dark:text-blue-500 bg-red-100 dark:bg-cyan-100"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_PROFILE)}
        >
          <HiUsers className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">your profile</span>
        </li>
        <li
          className={`flex items-center px-6 py-3 rounded-[4px] ${
            pathname === ROUTER.USER_BASKET
              ? "text-[#D63626] dark:text-blue-500 bg-red-100 dark:bg-cyan-100"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_BASKET)}
        >
          <IoBasketSharp className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">your basket</span>
        </li>

        <li
          className={`flex items-center px-6 py-3 mt-2 rounded-[4px] ${
            pathname === ROUTER.USER_ORDERS
              ? "text-[#D63626] dark:text-blue-500 bg-red-100 dark:bg-cyan-100"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_ORDERS)}
        >
          <FaBowlFood className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">your orders</span>
        </li>
        <li
          className={`flex items-center px-6 py-3 my-2 rounded-[4px] ${
            pathname === ROUTER.USER_CHECKOUT
              ? "text-[#D63626] dark:text-green-800 bg-red-100 dark:bg-green-300"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_CHECKOUT)}
        >
          <FaSquareCheck className=" text-2xl hover:scale-110 transition-all duration-500 mr-2" />
          <span className="text-xl font-semibold ">checkout</span>
        </li>
        <li
          className={`flex items-center px-6 py-3 rounded-[4px] ${
            pathname === ROUTER.USER_BASKET
              ? "text-[#D63626] dark:text-blue-500 bg-red-100 dark:bg-cyan-100"
              : "text-[#828282] dark:text-gray-400"
          }`}
          onClick={() => push(ROUTER.USER_BASKET)}
        >
          <RiLogoutBoxFill className=" text-2xl hover:scale-110 transition-all duration-500 mr-2 " />
          <span className="text-xl font-semibold ">logout</span>
        </li>
      </ul>
    </div>
  );
};

export default UserAside;

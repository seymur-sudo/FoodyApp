import React from "react";
import pizza from "../../../public/svgs/pizza.svg";
import Image from "next/image";
import { LuTrash } from "react-icons/lu";

const BasketResCard = () => {
  return (
    <>
      <div className="flex items-center justify-around pt-1 pb-2 border-b-2 border-gray-300 dark:border-sky-300">
        <Image
          src={pizza}
          alt="pizza"
          width={50}
          height={50}
          className=" w-[45px] h-[45px] mx-5 rounded-full  object-cover"
        />
        <div>
          <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[12px] font-medium">
            papa johns pizza restaurant
          </h1>
          <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[14px] font-medium">
            $7.99
          </span>
        </div>
        <LuTrash className="text-red-500 dark:text-sky-300 text-xl mx-5 hover:scale-110 transition-all duration-500 cursor-pointer" />
        <div className="bg-gray-100 dark:bg-gray-700 text-black dark:text-cyan-300 font-medium flex flex-col items-center px-2 py-1 rounded-3xl">
          <span>+</span>
          <span className="font-semibold">5</span>
          <span>-</span>
        </div>
      </div>
    </>
  );
};

export default BasketResCard;

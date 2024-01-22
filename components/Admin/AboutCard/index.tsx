import React from "react";
import soup from "../../../public/svgs/soup.svg";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import Image from "next/image";

const AboutCard = () => {
  return (
    <>
      <div className="relative  shadow-shadow5 dark:shadow5Dark rounded-[20px] w-[275px]  bg-white dark:bg-gray-800 font-mutka">
        <Image
          src={soup}
          alt="soup"
          width={200}
          height={200}
          className="absolute bottom-[110px] left-[130px]  hover:scale-105 transition-all duration-500 w-[100px] h-[97px]  md:w-[120px] md:h-[120px] rounded-full  object-cover "
        />
        <div className="pt-[20%] md:pt-[25%] px-5 pb-4">
          <h1 className="capitalize text-[#4F4F4F] dark:text-cyan-300 font-semibold text-[22px]">
            soup
          </h1>
          <div className="flex items-center my-[3%] md:my-[4%] text-[9px] md:text-sm">
            <FaStar color="gold"  />
            <FaStar color="gold" className="mx-[1%] md:mx-[3%]" />
            <FaStar color="gold" />
            <FaStar color="gold" className="mx-[1%] md:mx-[3%]" />
            <FaStarHalfAlt color="gold" />
          </div>
          <p className="text-[#4F4F4F] dark:text-cyan-300 font-semibold text-[20px]">
            $5.99
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutCard;

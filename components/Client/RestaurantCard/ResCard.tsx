import React, { useEffect } from "react";
import soup from "../../../public/svgs/soup.svg";
import Image from "next/image";
import { RestaurantPostDataType } from "@/interfaces";
import AOS from "aos";
import "aos/dist/aos.css";

type ResCardProps = {
  restaurant: RestaurantPostDataType;
};

const ResCard: React.FC<ResCardProps> = ({ restaurant }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div
        className="bg-white dark:bg-black shadow-shadow4 dark:shadow-shadow4Dark  font-roboto font-medium rounded-md hover:scale-110 transition-all duration-700"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <div className="capitalize flex flex-col items-center md:items-start  w-full ">
          <Image
            src={restaurant.img_url ? restaurant.img_url : soup}
            alt="restaurant"
            width={500}
            height={200}
            className="hover:scale-105 transition-all duration-500 w-full  h-[160px] object-cover"
          />
          <h1 className="text-[#1E1E30] dark:text-gray-200 text-[24px] md:text-[18px] mt-3 mb-2 px-2">
            {restaurant.name?.slice(0, 10)}...
          </h1>
          <p className="text-[#828282] dark:text-[#a7a7a7] text-xl md:text-base p-2">
            {restaurant.cuisine}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center px-2 py-5">
          <p className="text-[#4F4F4F] dark:text-[#979797]  text-2xl md:text-lg font-bold">
            $ {restaurant.delivery_min}
          </p>
          <div className="flex items-center text-xl md:text-base bg-[#D63626] text-white rounded-full py-2 px-[25%]  md:px-[5%] md:py-1 my-[4%] md:my-[0%]">
            {restaurant.delivery_price} min
          </div>
        </div>
      </div>
    </>
  );
};

export default ResCard;

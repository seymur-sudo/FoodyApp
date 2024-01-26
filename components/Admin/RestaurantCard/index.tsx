import React, { useEffect } from "react";
import Image from "next/image";
import del from "../../../public/svgs/delete.svg";
import edt from "../../../public/svgs/edit.svg";
import { RestaurantPostDataType } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
import AOS from "aos";
import "aos/dist/aos.css";
import defaultRes from "../../../public/svgs/default.png"
interface RestaurantCardProps {
  key: string;
  restaurant: RestaurantPostDataType;
}
const RestaurantCard: React.FC<RestaurantCardProps> = ({ key, restaurant }) => {
  const { setShow, show, showDelete, setshowDelete } =
    useSidebarContext() as SidebarContextProps;

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  
  return (
    <div
      key={key}
      data-aos="fade-up"
      data-aos-delay={150}
      className="bg-white  rounded-[5px] flex flex-row items-center justify-between"
    >
      <Image
        className="w-[50px] ml-4 my-4 mr-6 h-[55px]"
        src={restaurant.img_url||defaultRes}
        alt="resimg"
        width={100}
        height={100}
      />
      <div className="flex flex-col">
        <p className="text-[18px] font-medium text-[#1E1E30]">
          {restaurant.name}
        </p>
        <p className="text-[14px] line-height-6 font-medium text-[#828282]">
          {restaurant.category_id}
        </p>
      </div>
      <div className="flex h-full ml-6 mr-1 flex-col justify-between">
        <Image
          onClick={() => setshowDelete(!showDelete)}
          className="mt-2 cursor-pointer hover:scale-[120%] duration-500"
          src={del}
          alt="del"
        />
        <Image
          onClick={() => setShow(!show)}
          className="mb-2 cursor-pointer hover:scale-[120%] duration-500"
          src={edt}
          alt="edt"
        />
      </div>
    </div>
  );
};

export default RestaurantCard;

import React, { useEffect } from "react";
import Image from "next/image";
import del from "../../../public/svgs/delete.svg";
import edt from "../../../public/svgs/edit.svg";
import { RestaurantPostDataType } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
import AOS from "aos";
import "aos/dist/aos.css";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import EditModal from "@/components/Admin/Modals/EditModal";
import defaultRes from "../../../public/svgs/default.png";
import { useTranslation } from "next-i18next";



interface RestaurantCardProps {
  id: string | number;
  restaurant: RestaurantPostDataType;
}
const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, restaurant }) => {
  const {
    setShow,
    setNewImg,
    show,
    setLastData,
    lastData,
    showDelete,
    setshowDelete,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  
  const handleEdit = (item: RestaurantPostDataType) => {
    setLastData(item);
    setNewImg(item.img_url ?? null);
    setTimeout(() => {
      setShow(!show);
      console.log(lastData);
    }, 100);
  };
  const handleDelete = (delItem: RestaurantPostDataType) => {
    setLastData(delItem);
    setshowDelete(!showDelete);
  };

  return (
    <>
      <div
        key={id}
        data-aos="fade-right "
        data-aos-delay={150}
        className="bg-white  rounded-[5px] flex flex-row items-center justify-between min-w-[252px] max-w-[252px]"
      >
        <Image
          className="w-[55px] ml-4 my-4 mr-6 h-[55px] rounded-md"
          src={restaurant.img_url || defaultRes}
          alt="resimg"
          width={100}
          height={100}
        />
        <div className="flex flex-col font-body tracking-wide">
          <p className="text-[18px] font-semibold text-[#28283f]">
            {restaurant.name}
          </p>
          <p className="text-[14px] line-height-6 font-medium text-[#828282]">
            {restaurant.category_id}
          </p>
        </div>
        <div className="flex h-full ml-6 mr-1 flex-col justify-between">
          <Image
            onClick={() => handleDelete(restaurant)}
            className="mt-2 cursor-pointer hover:scale-[120%] duration-500"
            src={del}
            alt="del"
          />
          <Image
            onClick={() => handleEdit(restaurant)}
            className="mb-2 cursor-pointer hover:scale-[120%] duration-500"
            src={edt}
            alt="edt"
          />
        </div>
      </div>
      <EditModal />
      <DeleteModal />
    </>
  );
};

export default RestaurantCard;

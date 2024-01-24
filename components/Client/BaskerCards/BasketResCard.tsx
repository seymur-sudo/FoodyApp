import React,{useEffect} from "react";
import pizza from "../../../public/svgs/pizza.svg";
import Image from "next/image";
import { LuTrash } from "react-icons/lu";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
// import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import AOS from "aos";
import "aos/dist/aos.css";

const BasketResCard = () => {
  const { showDelete, setshowDelete } =
    useSidebarContext() as SidebarContextProps;

    useEffect(() => {
      AOS.init({
        duration: 1000,
      });
      AOS.refresh();
    }, []);
  return (
    <>
      <div className="flex items-center justify-around py-3 border-b-2 border-gray-300 dark:border-sky-300"  
          data-aos="fade-up"
          data-aos-delay={150}>
        <Image
          src={pizza}
          alt="pizza"
          width={100}
          height={100}
          className=" w-[45px] h-[45px] md:w-[95px] md:h-[95px] mx-5 rounded-full  object-cover"
        />
        <div>
          <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[12px] md:text-[22px] font-medium">
            papa johns pizza restaurant
          </h1>
          <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[12px] md:text-[18px] font-medium">
            $7.99
          </span>
        </div>
        <LuTrash
          className="text-red-500 dark:text-sky-300 text-xl md:text-3xl mx-5 hover:scale-110 transition-all duration-500 cursor-pointer"
          onClick={() => setshowDelete(!showDelete)}
        />
        <div className="md:text-xl  bg-gray-100 dark:bg-gray-700 text-black dark:text-cyan-300 font-medium flex flex-col items-center px-2 py-1 rounded-3xl">
          <span>+</span>
          <span className="font-semibold">5</span>
          <span>-</span>
        </div>
      </div>
      {/* <DeleteModal/> */}
      
    </>
  );
};

export default BasketResCard;

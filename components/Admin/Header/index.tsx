import React from "react";
import Image from "next/image";
import AdminProfile from "../../../public/svgs/AdminProfile.svg";
import NavBtn from "../../../public/svgs/NavBtnAdmin.svg";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import Sidebar from "../Sidebar/Sidebar";
import ResNavbar from "../ResNavbar";
import { LangSelect } from "../Langs";
import { useTranslation } from "next-i18next";

export const Header: React.FC = () => {
  const { t } = useTranslation("common");
  const {
    setSidebarOpen,
    setNavbarOpen,
    isNavbarOpen,
    isSidebarOpen,
    setNewImg,
  } = useSidebarContext() as SidebarContextProps;

  const handleOpenModal = () => {
    setNewImg(null);
  };

  return (
    <>
     <div className="pb-[1.5%]" >
      <div className="bg-[#27283C] sm:mx-5 flex items-center justify-between  h-16 rounded-b-xl font-body tracking-wide ">
        <div className="flex ">
          <Image
            onClick={() => setNavbarOpen(!isNavbarOpen)}
            alt="navbtn"
            className="block mx-2 cursor-pointer sm:hidden"
            src={NavBtn}
          />
          <p className="sm:ml-5 flex flex-row items-center text-center font-mukta text-[28px]  font-extrabold text-[#F5F5F5]">
            Foody<span className="text-[#EAAB00]">.</span>
          </p>
        </div>
        <div className="flex gap-5 items-center ">
          <button
            className="flex justify-center items-center font-bold  font-body w-[42px] h-[42px] md:w-[122px] md:h-[28px] py-2 rounded-full  md:rounded-2xl hover:bg-[#f15cd1] text-[#F5F5F5] bg-[#C035A2] hover:opacity-90 transition-all duration-500"
            onClick={() => { setSidebarOpen(!isSidebarOpen); handleOpenModal(); }}
          >
            <span className="text-2xl md:text-base mt-[1px]">+</span>
            <span className="hidden tracking-wider font-bold font-poppins text-[10px] md:flex px-1">{t("btnProduct")}</span>
          </button>
          <div className="mb-2 md:mb-0"><LangSelect /></div>
          
          <div className="flex items-center mr-3">
            <Image className="sm:mr-4" alt="adminProfile" src={AdminProfile} />
            <p className="text-[16px] hidden sm:block font-medium font-body text-[#F5F5F5DE] mt-1">
              Admin
            </p>
          </div>
        </div>
        <Sidebar />
        <ResNavbar />
      </div>
      </div>
    </>
  );
};

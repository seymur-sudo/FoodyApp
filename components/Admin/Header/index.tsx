import React from "react";
import Image from "next/image";
import en from "../../../public/svgs/en.svg";
import AdminProfile from '../../../public/svgs/AdminProfile.svg'
import NavBtn from '../../../public/svgs/NavBtnAdmin.svg'
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import Sidebar from "../Sidebar/Sidebar";
import ResNavbar from "../ResNavbar";
import { LangSelect } from "../Langs";
import { useTranslation } from 'next-i18next'
export const Header: React.FC = () => {
  const {t}=useTranslation('common')
  const { setSidebarOpen, setNavbarOpen,isNavbarOpen,isSidebarOpen} =useSidebarContext() as SidebarContextProps

  return (
    <>
    <div className="bg-[#27283C] sm:mx-5 flex justify-between mb-4 flex-row items-center h-16 rounded-b-xl">
      <div className="flex flex-row">
        <Image onClick={()=>setNavbarOpen(!isNavbarOpen)} alt="navbtn" className="block mx-2 cursor-pointer sm:hidden" src={NavBtn}/>
        <p className="sm:ml-5 flex flex-row items-center text-center font-mukta text-[28px] font-extrabold text-[#F5F5F5]">
          Foody<span className="text-[#EAAB00]">.</span>
        </p>
      </div>
      <div className="flex gap-5 flex-row items-center ">
        <button
          className=" flex-row flex font-bold text-[14px] font-body px-2 py-1 scale-150 sm:scale-100 sm:p-2 rounded-2xl hover:bg-[#f15cd1] text-[#F5F5F5] bg-[#C035A2]"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          + <span className="hidden  sm:flex">{t('Add Product')}</span>
        </button>
        <LangSelect/>
        <div className="flex flex-row items-center mr-3">
          <Image className="sm:mr-4" alt="adminProfile" src={AdminProfile} />
          <p className="text-[16px] hidden sm:block font-medium font-body text-[#F5F5F5DE] mt-1">
            Admin
          </p>
        </div>
      </div>
      <Sidebar />
      <ResNavbar/>
    </div>
    </>
  );
};

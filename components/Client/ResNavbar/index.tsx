import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import { getUser } from "@/services";
import { useQuery } from "react-query";
import { useTranslation } from 'next-i18next'
import profileImg from '../../../public/svgs/profile.svg'
import {ROUTER} from '../../../shared/constant/router'
import { MdClose } from "react-icons/md";

const ClientNavbar: React.FC = () => {
  const {t} = useTranslation('common')
  const { isNavbarOpen,userImg,setUserImg, closeNavbar } = useSidebarContext() as SidebarContextProps;
  const router = useRouter();
  const { data:userD, isLoading, isError } = useQuery(["user"],getUser);
  const [imageURL,setImageURL]=useState<string>("")
  useEffect(() => {
    if (userD?.data.user.img_url) {
      setImageURL(userD?.data.user.img_url);
  } else if (userImg) {
    setImageURL(userImg);
  } else {
      // Burada statik bir resim URL'si atanabilir
      setImageURL(profileImg);
  }
  }, [userD,userImg]);
  return (
    <div onClick={closeNavbar} className={`${isNavbarOpen ? 'right-0 sm:hidden' : 'right-full'} fixed duration-300 top-0 z-50 w-full h-full bg-[#00000066]`}>
      <div className="h-full z-50 duration-500 w-fit dark:bg-[#272727] bg-white ">
        <div className="flex pt-4 mb-8 flex-row">
          <MdClose size={'30px'} onClick={closeNavbar} className=" text-black dark:text-white cursor-pointer ml-4 mt-4"/>
        </div>
        {!userD?(
            <div className="sm:hidden flex justify-center">
              <button onClick={()=>router.push("/login")} className="text-18px font-medium text-white bg-[#D63626] rounded-[30px] px-[21px] py-2">Sign up</button>
            </div>
        ):(
          <div className="sm:hidden items-center flex justify-start">
            <Image alt="" width={100} height={100} src={imageURL} className=" ml-6 rounded-full mr-2 w-10 h-10 cursor-pointer scale-100 hover:scale-11 text-[20px] font-medium text-white"/>
            <p className="text-16px text-black mr-12 font-medium dark:text-sky-400">{userD?.data.user.fullname??"User"}</p>
          </div>
        )}

        
        <div className="w-fit z-50 gap-4 pb-10 mt-14 pl-6 pr-4">
        <Link className={`flex mb-2 font-medium text-[18px] ${router.pathname === "/"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.HOME}>Home</Link>
        <Link className={`flex mb-2 font-medium text-[18px] ${router.pathname === "/restaurants"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.ADMIN}>Restaurants</Link>
        <Link className={`${userD?"flex":"hidden"} mb-2 font-medium text-[18px] ${router.pathname === "/user/profile"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.USER_PROFILE}>Profile</Link>
        <Link className={`${userD?"flex":"hidden"} mb-2 font-medium text-[18px] ${router.pathname === "/user/basket"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.USER_BASKET}>Your Basket</Link>
        <Link className={`${userD?"flex":"hidden"} mb-2 font-medium text-[18px] ${router.pathname === "/user/orders"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.USER_ORDERS}>Your Orders</Link>
        <Link className={`${userD?"flex":"hidden"} mb-2 font-medium text-[18px] ${router.pathname === "/user/checkout"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.USER_CHECKOUT}>Checkout</Link>
        <Link className={`flex mb-2 font-medium text-[18px] ${router.pathname === "/about-us"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.ABOUT_US}>About us</Link>
        <Link className={`flex mb-2 font-medium text-[18px] ${router.pathname === "/how-it-works"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.HOW_IT_WORKS}>How it works?</Link>
        <Link className={`flex mb-2 font-medium text-[18px] ${router.pathname === "/faqs"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.FAQS}>FAQs</Link>
        <Link className={`${userD?"flex":"hidden"} mb-2 font-medium text-[18px] ${router.pathname === "/login"? "text-[#D63626] dark:text-cyan-400" : "text-[#828282] dark:text-gray-100"} cursor-pointer`} href={ROUTER.LOGIN}>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default ClientNavbar;
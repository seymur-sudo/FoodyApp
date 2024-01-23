import React from "react";
import profileImg from '../../../public/svgs/profile.svg'
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import basketIcon from "../../../public/svgs/basketIcon.svg";
import { LangSelect } from "../../Admin/Langs";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { ThemeContextProps } from "../../../interfaces/index";
import { FiSun, FiMoon } from "react-icons/fi";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";


const MainHeader: React.FC = () => {
  const { toggleTheme } = useThemeContext() as ThemeContextProps;
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div className="h-[120px] sm:mt-[30px] sm:mx-[30px] flex items-center rounded-t-5 justify-between flex-row bg-[#F3F4F6]  dark:bg-gray-900">
      <p className=" flex py-auto sm:ml-14 flex-row items-center text-center font-mukta text-[36px] font-extrabold text-[#000000] dark:text-gray-100">
        Foody<span className="text-[#EAAB00] dark:text-sky-400 ">.</span>
      </p>
      <div className="hidden md:flex">
        <Link
          className={`text-[18px] sm:mr-8  text-[Roboto] font-medium ${
            router.pathname === "/"
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={"/"}
        >
          {t("Home")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8  text-[Roboto] font-medium ${
            router.pathname === "/restaurants"
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={"/restaurants"}
        >
          {t("Restaurants")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8  text-[Roboto] font-medium ${
            router.pathname === "/about-us"
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={"/about-us"}
        >
          {t("About us")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8  text-[Roboto] font-medium ${
            router.pathname === "/how-it-works"
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={"/how-it-works"}
        >
          {t("How it works")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8  text-[Roboto] font-medium ${
            router.pathname === "/faqs"
              ? "text-[#D63626] dark:text-cyan-400 "
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={"/faqs"}
        >
          {t("FAQs")}
        </Link>
      </div>

      <div className="hidden md:block">
        <input
          className="h-11 sm:pl-5 w-max rounded-[10px]"
          placeholder="Search Restaurant..."
          type="text"
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="flex items-center ">
          <button
            className="px-3  transition-all duration-700 "
            onClick={toggleTheme}
          >
            <FiSun
              size={50}
              className="text-[#ea9000] dark:text-gray-900 block dark:hidden"
            />
            <FiMoon
              size={50}
              className="text-[#F3F4F6] dark:text-sky-400  hidden dark:block"
            />
          </button>
        </div>
        <LangSelect />
        <div className="flex">
          <Image
            className="ml-3 cursor-pointer scale-100 hover:scale-110"
            src={basketIcon}
            alt="basketIcon"
          />
          <Dropdown className="">
            <DropdownTrigger>
              <Image alt="" src={profileImg} className=" ml-5 w-10 h-10 cursor-pointer mr-6 scale-100 hover:scale-11 text-[20px] font-medium text-white"/>
            </DropdownTrigger>
            <DropdownMenu  className="bg-white dark:bg-black" aria-label="User Actions" variant="flat">
              <DropdownItem className="h-10  dark:hover:bg-[rgb(17,24,39)] flex" key="profile" ><p className="text-nowrap dark:text-white font-normal text-base">Profile</p></DropdownItem>
              <DropdownItem className="h-10  dark:hover:bg-[rgb(17,24,39)] flex" key="your_basket"><p className="text-nowrap dark:text-white font-normal text-base">Your Basket</p></DropdownItem>
              <DropdownItem className="h-10  dark:hover:bg-[rgb(17,24,39)] flex" key="your_order"><p className="text-nowrap dark:text-white font-normal text-base">Your Orders</p></DropdownItem>
              <DropdownItem className="h-10  dark:hover:bg-[rgb(17,24,39)] flex" key="checkout"><p className="text-nowrap dark:text-white font-normal text-base">Checkout</p></DropdownItem>
              <DropdownItem className="h-10  dark:hover:bg-[rgb(17,24,39)] flex" key="logout" color="danger"><p className="text-nowrap dark:text-white font-normal text-base">Log Out</p></DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;

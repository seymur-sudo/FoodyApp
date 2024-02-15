import React, { useEffect, useState } from "react";
import profileImg from "../../../public/svgs/profile.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import basketIcon from "../../../public/svgs/basketIcon.svg";
import { LangSelect } from "../../Admin/Langs";
import { LuMenu } from "react-icons/lu";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { ThemeContextProps } from "../../../interfaces/index";
import { FiSun, FiMoon } from "react-icons/fi";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import { QUERIES } from "../../../constant/Queries";
import { useQuery } from "react-query";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ClientNavbar from "../ResNavbar";
import { getUser, getBasket } from "@/services";
import SearchFilter from "../SearchFilter";
import { ROUTER } from "../../../shared/constant/router";

const MainHeader: React.FC = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const { setNavbarOpen, isNavbarOpen, newImg } =
    useSidebarContext() as SidebarContextProps;
  const { toggleTheme } = useThemeContext() as ThemeContextProps;
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isLogin, setIslogin] = useState<boolean>(false);
  const { data: userID } = useQuery(QUERIES.User, getUser);
  const { data: basket } = useQuery(QUERIES.Basket, getBasket);
  const basketProducts = basket?.data.result.data;

  const logout = () => {
    localStorage.removeItem("access_token");
    setTimeout(() => {
      router.push(ROUTER.LOGIN);
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };
  useEffect(() => {
    const acc_token = localStorage.getItem("access_token");

    if (!acc_token) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
    if (userID?.data.user.img_url) {
      setImageURL(userID?.data.user.img_url);
    } else if (newImg) {
      setImageURL(newImg);
    } else {
      setImageURL(profileImg);
    }
  }, [userID, newImg]);

  return (
    <div className="sm:h-[120px] h-[52px] sm:mt-[30px] sm:mx-[30px] flex items-center rounded-t-5 justify-between flex-row bg-[#F3F4F6]  dark:bg-gray-900 font-body tracking-wide">
      <div className="flex items-center">
        <LuMenu
          size={"30px"}
          onClick={() => setNavbarOpen(!isNavbarOpen)}
          className="text-black sm:hidden block ml-4 mr-3 cursor-pointer dark:text-white"
        />
        <p
          onClick={() => router.push(ROUTER.HOME)}
          className=" flex py-auto sm:ml-14 cursor-pointer flex-row items-center text-center font-mukta sm:text-[36px] text-[25px] font-extrabold text-[#000000] dark:text-gray-100"
        >
          Foody<span className="text-[#EAAB00] dark:text-sky-400 ">.</span>
        </p>
      </div>
      <div className="hidden sm:flex">
        <Link
          className={`text-[18px] sm:mr-8   font-semibold ${
            router.pathname === ROUTER.HOME
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={ROUTER.HOME}
        >
          {t("Home")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8   font-semibold ${
            router.pathname === ROUTER.RESTAURANTS
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={ROUTER.RESTAURANTS}
        >
          {t("Restaurants")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8   font-semibold ${
            router.pathname === ROUTER.ABOUT_US
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={ROUTER.ABOUT_US}
        >
          {t("About us")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8  font-semibold  ${
            router.pathname === ROUTER.HOW_IT_WORKS
              ? "text-[#D63626] dark:text-cyan-400"
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={ROUTER.HOW_IT_WORKS}
        >
          {t("How it works")}
        </Link>
        <Link
          className={`text-[18px] sm:mr-8  font-semibold  ${
            router.pathname === ROUTER.FAQS
              ? "text-[#D63626] dark:text-cyan-400 "
              : "text-[#828282] dark:text-gray-100"
          }`}
          href={ROUTER.FAQS}
        >
          {t("FAQs")}
        </Link>
      </div>

      <SearchFilter />

      <div className="flex flex-row items-center">
        <div className="flex items-center ">
          <button
            className="sm:px-3 px-0 pt-1 md:pt-0 transition-all duration-700 "
            onClick={toggleTheme}
          >
            <FiSun className="text-red-500 text-6xl md:text-5xl  scale-[75%] hover:scale-[85%] sm:scale-100 sm:hover:scale-110 dark:text-gray-900 block dark:hidden transition-all duration-500" />
            <FiMoon className="text-[#F3F4F6] text-6xl md:text-5xl scale-[75%] hover:scale-[85%] sm:scale-100 sm:hover:scale-110 dark:text-sky-400  hidden dark:block transition-all duration-500" />
          </button>
        </div>
        <LangSelect />
        <div className="sm:flex hidden">
          {!userID ? (
            <>
              <button
                onClick={() => router.push(ROUTER.LOGIN)}
                className="text-[16px] py-[7px] px-5 sm:ml-7 sm:mr-20 bg-[#D63626] font-medium rounded-[30px] text-white"
              >
                {t("Sign Up")}
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center items-start relative">
                <Image
                  className="ml-3 cursor-pointer scale-100 duration-500 hover:scale-110"
                  src={basketIcon}
                  onClick={() => {
                    router.push(ROUTER.USER_BASKET);
                  }}
                  alt="basketIcon"
                />
                {basketProducts && (
                  <p className="h-5 w-5 text-[12px]  absolute top-[-10px] right-[-8px] flex justify-center items-center rounded-full text-gray-100 bg-[#eb5757] ">
                    <span className="font-bold text-">
                      {basketProducts?.total_item}
                    </span>
                  </p>
                )}
              </div>
              <Dropdown className="">
                <DropdownTrigger>
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    src={imageURL ? imageURL : profileImg}
                    className=" ml-5 w-10 object-cover rounded-full h-10 cursor-pointer mr-6 scale-100 hover:scale-11 text-[20px] font-medium text-white"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  className="bg-white dark:bg-black"
                  aria-label="User Actions"
                  variant="flat"
                >
                  <DropdownItem
                    onClick={() => router.push(ROUTER.USER_PROFILE)}
                    className="h-10  dark:hover:bg-[rgb(17,24,39)] flex"
                    key="profile"
                  >
                    <p className="text-nowrap dark:text-white font-normal text-base">
                      {t("Your Profile")}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => router.push(ROUTER.USER_BASKET)}
                    className="h-10  dark:hover:bg-[rgb(17,24,39)] flex"
                    key="your_basket"
                  >
                    <p className="text-nowrap dark:text-white font-normal text-base">
                      {t("Your Basket")}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    className="h-10  dark:hover:bg-[rgb(17,24,39)] flex"
                    onClick={() => router.push(ROUTER.USER_ORDERS)}
                    key="your_order"
                  >
                    <p className="text-nowrap dark:text-white font-normal text-base">
                      {t("Your Orders")}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    className="h-10  dark:hover:bg-[rgb(17,24,39)] flex"
                    onClick={() => router.push(ROUTER.USER_CHECKOUT)}
                    key="checkout"
                  >
                    <p className="text-nowrap dark:text-white font-normal text-base">
                      {t("Checkout")}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    className="h-10  dark:hover:bg-[rgb(17,24,39)] flex"
                    key="logout"
                    onClick={() => logout()}
                    color="danger"
                  >
                    <p className="text-nowrap dark:text-white font-normal text-base">
                      {t("Logout")}
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <ClientNavbar />
    </div>
  );
};
export default MainHeader;

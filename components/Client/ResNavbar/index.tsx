import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import { getUser } from "@/services";
import { useQuery } from "react-query";
import { useTranslation } from "next-i18next";
import profileImg from "../../../public/svgs/profile.svg";
import { ROUTER } from "../../../shared/constant/router";
import { MdClose } from "react-icons/md";
import { QUERIES } from "../../../constant/Queries";

const ClientNavbar: React.FC = () => {
  const { t } = useTranslation("common");
  const { isNavbarOpen, newImg, closeNavbar } =
    useSidebarContext() as SidebarContextProps;
  const router = useRouter();
  const { data: userD } = useQuery(QUERIES.User, getUser);
  const [imageURL, setImageURL] = useState<string>("");

  const logout = () => {
    localStorage.removeItem("access_token");
    setTimeout(() => {
      closeNavbar();
    }, 500);
    setTimeout(() => {
      router.push(ROUTER.LOGIN);
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  useEffect(() => {
    if (userD?.data.user.img_url) {
      setImageURL(userD?.data.user.img_url);
    } else if (newImg) {
      setImageURL(newImg);
    } else {
      setImageURL(profileImg);
    }
  }, [userD, newImg]);

  return (
    <div
      onClick={closeNavbar}
      className={`${
        isNavbarOpen ? "right-0 sm:hidden" : "right-full"
      } fixed duration-700 top-0 z-50 w-full h-full bg-[#00000066]`}
    >
      <div className="h-full z-50 duration-500 w-fit dark:bg-[#272727] bg-white font-poppins">
        <div className="flex pt-4 mb-8 flex-row">
          <MdClose
            size={30}
            onClick={closeNavbar}
            className=" text-black dark:text-white cursor-pointer ml-4 mt-4"
          />
        </div>
        {!userD ? (
          <div className="sm:hidden flex justify-center">
            <button
              onClick={() => router.push(ROUTER.LOGIN)}
              className="text-18px font-medium text-white bg-[#D63626] rounded-[30px] px-[21px] py-2"
            >
              {t("Sign Up")}
            </button>
          </div>
        ) : (
          <div className="sm:hidden items-center flex justify-start">
            <Image
              alt="newImg"
              width={100}
              height={100}
              src={imageURL ? imageURL : profileImg}
              className=" ml-6 rounded-full mr-2 w-10 h-10 cursor-pointer scale-100 hover:scale-11 text-[20px] font-medium text-white"
            />
            <p className="text-16px text-black mr-12 font-medium dark:text-sky-400">
              {userD?.data.user.fullname ?? t("User")}
            </p>
          </div>
        )}

        <div className="w-fit z-50 gap-4 pb-10 mt-14 pl-6 pr-4">
          <Link
            className={`flex mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.HOME
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.HOME}
          >
            {t("Home")}
          </Link>

          <Link
            className={`flex mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.RESTAURANTS
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.RESTAURANTS}
          >
            {t("Restaurants")}
          </Link>

          <Link
            className={`${
              userD ? "flex" : "hidden"
            } mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.USER_PROFILE
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.USER_PROFILE}
          >
            {t("Your Profile")}
          </Link>

          <Link
            className={`${
              userD ? "flex" : "hidden"
            } mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.USER_BASKET
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.USER_BASKET}
          >
            {t("Your Basket")}
          </Link>

          <Link
            className={`${
              userD ? "flex" : "hidden"
            } mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.USER_ORDERS
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.USER_ORDERS}
          >
            {t("Your Orders")}
          </Link>

          <Link
            className={`${
              userD ? "flex" : "hidden"
            } mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.USER_CHECKOUT
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.USER_CHECKOUT}
          >
            {t("Checkout")}
          </Link>

          <Link
            className={`flex mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.ABOUT_US
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.ABOUT_US}
          >
            {t("About us")}
          </Link>

          <Link
            className={`flex mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.HOW_IT_WORKS
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.HOW_IT_WORKS}
          >
            {t("How it works")}?
          </Link>

          <Link
            className={`flex mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.FAQS
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
            href={ROUTER.FAQS}
          >
            {t("FAQs")}
          </Link>

          <li
            onClick={() => logout()}
            className={`${
              userD ? "flex" : "hidden"
            } mb-3 font-medium text-[18px] ${
              router.pathname === ROUTER.LOGIN
                ? "text-[#D63626] dark:text-cyan-400"
                : "text-[#828282] dark:text-gray-100"
            } cursor-pointer`}
          >
            {t("Logout")}
          </li>
        </div>
      </div>
    </div>
  );
};

export default ClientNavbar;

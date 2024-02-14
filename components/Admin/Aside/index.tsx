import React from "react";
import Link from "next/link";
import DashboardIcon from "../../../public/svgs/AdminDashboardIcon.svg";
import ProductIcon from "../../../public/svgs/AdminProductIcon.svg";
import RestaurantIcon from "../../../public/svgs/AdminRestaurantIcon.svg";
import CategoryIcon from "../../../public/svgs/AdminCategoryIcon.svg";
import OrderIcon from "../../../public/svgs/AdminOrderIcon.svg";
import OfferIcon from "../../../public/svgs/AdminOfferIcon.svg";
import LogoutIcon from "../../../public/svgs/AdminLogoutIcon.svg";
import { BottomLogo } from "../BottomLogo";
import { useRouter } from "next/navigation";
import { ROUTER } from "../../../shared/constant/router";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { IoLogoWechat } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";

export const Aside: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setTimeout(() => {
      router.push(ROUTER.ADMIN_LOGIN);
    }, 1500);
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };
  return (
    <div className="h-full  flex flex-col  bg-bgc">
      <aside className="ml-1  sm:block hidden h-[64vh] w-min	font-body  pt-4 pb-12 px-4  rounded-xl bg-[#C74FEB]">
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN}
        >
          <Image className="mr-4" alt="icon" src={DashboardIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Dashboard")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_PRODUCTS}
        >
          <Image className="mr-4" alt="icon" src={ProductIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Products")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_RESTAURANTS}
        >
          <Image className="mr-4" alt="icon" src={RestaurantIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Restaurants")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_CHAT}
        >
          <IoLogoWechat className="mr-5 ml-1 scale-150 text-white" />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Chat")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_CATEGORY}
        >
          <Image className="mr-4" alt="icon" src={CategoryIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Category")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_ORDERS}
        >
          <Image className="mr-4" alt="icon" src={OrderIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Orders")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_HISTORY}
        >
          <MdWorkHistory className="mr-4 text-2xl text-white" />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("History")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href={ROUTER.ADMIN_OFFERS}
        >
          <Image className="mr-4" alt="icon" src={OfferIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Offers")}
          </p>
        </Link>
        <Link
          className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
          href=""
          onClick={() => handleLogout()}
        >
          <Image className="mr-4" alt="icon" src={LogoutIcon} />
          <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
            {t("Logout")}
          </p>
        </Link>
      </aside>

      <div className="fixed top-[87.5vh] w-[14.5%]">
        <BottomLogo />
      </div>
    </div>
  );
};

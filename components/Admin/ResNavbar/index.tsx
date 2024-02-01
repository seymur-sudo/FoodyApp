import React from "react";
import Image from "next/image";
import Link from "next/link";
import backBtn from "../../../public/svgs/backBtnRes.svg";
import DashboardIcon from "../../../public/svgs/AdminDashboardIcon.svg";
import ProductIcon from "../../../public/svgs/AdminProductIcon.svg";
import RestaurantIcon from "../../../public/svgs/AdminRestaurantIcon.svg";
import CategoryIcon from "../../../public/svgs/AdminCategoryIcon.svg";
import OrderIcon from "../../../public/svgs/AdminOrderIcon.svg";
import OfferIcon from "../../../public/svgs/AdminOfferIcon.svg";
import LogoutIcon from "../../../public/svgs/AdminLogoutIcon.svg";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import { useTranslation } from "next-i18next";
import { ROUTER } from "../../../shared/constant/router";

const ResNavbar: React.FC = () => {
  const { t } = useTranslation("common");
  const { isNavbarOpen, closeNavbar } =
    useSidebarContext() as SidebarContextProps;

  return (
    <div
      onClick={closeNavbar}
      className={`${
        isNavbarOpen ? "right-0 sm:hidden" : "right-full"
      } fixed duration-300 top-0 w-full h-full bg-[#00000066]`}
    >
      <div className="h-full z-50 duration-500 w-fit bg-[#C74FEB] ">
        <div className="flex pt-4 mb-8 flex-row">
          <Image
            onClick={closeNavbar}
            className=" cursor-pointer ml-2 mr-4"
            alt="backBtn"
            src={backBtn}
          />
          <p className="sm:ml-5 flex flex-row items-center text-center font-mukta text-[28px] font-extrabold text-[#F5F5F5]">
            Foody<span className="text-[#EAAB00]">.</span>
          </p>
        </div>
        <div className="w-fit pb-10 pl-6 pr-4">
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
            href={ROUTER.ADMIN_OFFERS}
          >
            <Image className="mr-4" alt="icon" src={OfferIcon} />
            <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
              {t("Offers")}
            </p>
          </Link>
          <Link
            className="flex h-10 cursor-pointer mb-2 pl-4 hover:bg-[#CD61ED] rounded-xl items-center flex-row"
            href={ROUTER.ADMIN_LOGIN}
          >
            <Image className="mr-4" alt="icon" src={LogoutIcon} />
            <p className="text-[#FCDDEC] text-nowrap mr-20 font-medium font-body text-[14px]">
              {t("Logout")}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResNavbar;

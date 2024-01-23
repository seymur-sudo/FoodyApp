import React from "react";
import { TbRouteAltLeft } from "react-icons/tb";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
import { useRouter } from "next/router";
import { ROUTER } from "../../../shared/constant/router";

const UserRouter = () => {
  const { pathname } = useRouter();

  const getRouteName = () => {
    if (pathname === ROUTER.USER_PROFILE) {
      return "Your Profile";
    } else if (pathname === ROUTER.USER_CHECKOUT) {
      return "Your Checkout";
    } else if (pathname === ROUTER.USER_ORDERS) {
      return "Your Orders";
    } else if (pathname === ROUTER.USER_BASKET) {
      return "Your Basket";
    } 

    return "Page";
  };
  const { openUserModal } = useSidebarContext() as SidebarContextProps;
  return (
    <>
      <div
        className=" w-10/12 bg-white dark:bg-gray-900 cursor-pointer text-white px-4 py-9 rounded shadow-shadow4 flex justify-center mb-[12%] md:hidden"
        onClick={openUserModal}
      >
        <TbRouteAltLeft className="text-2xl text-[#4F4F4F] dark:text-blue-400" />
        <p className="text-[#4F4F4F]  font-medium ml-2 text-xl dark:text-blue-300">
          {getRouteName()}
        </p>
      </div>
    </>
  );
};

export default UserRouter;

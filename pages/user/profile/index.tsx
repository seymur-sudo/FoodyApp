import React from "react";
import UserAside from "../../../components/Client/UserAside/index";
import UserAsideModal from "@/components/Client/UserAsideModal";
import MainHeader from "../../../components/Client/MainHeader/index";
import BasketResCard from "../../../components/Client/BaskerCards/BasketResCard";
import { IoBasketSharp } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { animated } from "@react-spring/web";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
import UserRouter from "@/components/Client/UserRouter";

const ProfileUser = () => {
  const { showUserModal, closeUserModal, modalSpring } =
    useSidebarContext() as SidebarContextProps;

  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />

        <UserRouter />
        {showUserModal && (
          <>
            <div className="fixed inset-0 bg-black dark:bg-gray-200 opacity-60 z-40 md:opacity-0"></div>

            <animated.div
              style={{
                ...modalSpring,
                position: "fixed",
                top: "30vh",
                left: 0,
                right: 0,
                zIndex: 50,
              }}
              className="bg-white dark:bg-gray-800 rounded-t-[20px] flex flex-col w-full max-h-[45vh] overflow-y-auto items-center justify-start md:hidden asideScroll"
            >
              <div className="my-2" onClick={closeUserModal}>
                <IoIosCloseCircleOutline
                  size={40}
                  className="text-[#BDBDBD] dark:text-sky-400  "
                />
              </div>
              <UserAsideModal />
            </animated.div>
            <animated.div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "black",
                zIndex: 40,
                opacity: 0,
              }}
              onClick={closeUserModal}
            />
          </>
        )}

        <div className="w-10/12 md:w-8/12 bg-[#F3F4F6] dark:bg-gray-900 asideScroll max-h-[75vh] overflow-y-auto">
       
        </div>
      </div>
    </>
  );
};

export default ProfileUser;

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
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const BasketUser = () => {
  const {
    showUserModal,
    closeUserModal,
    modalSpring,

  } = useSidebarContext() as SidebarContextProps;

  const { t } = useTranslation("common");


  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />
      
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
                zIndex: 20,
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

        <div className="w-10/12 md:w-8/12 bg-[#F3F4F6] dark:bg-gray-900  max-h-[75vh] overflow-y-auto my-scrollable-component ">
          <div>
            <div className="border-b-2 border-gray-300 dark:border-sky-300 capitalize p-6">
              <span className="text-[30px] text-[#0f0808] dark:text-blue-400 font-semibold">
                {t("Your Basket")}
              </span>
              <div className="flex items-center mt-2">
                <IoBasketSharp className=" text-2xl text-[#D63626] dark:text-cyan-300 hover:scale-110 transition-all duration-500 " />
                <span className="text-xl ml-2  text-[#D63626] dark:text-cyan-300 font-semibold">
                  3 items
                </span>
              </div>
            </div>
            <BasketResCard />
            <BasketResCard />
            <BasketResCard />
            <BasketResCard />
            <BasketResCard />

            <div className="w-full flex justify-center py-4">
              <div className="h-12 w-11/12 cursor-pointer hover:opacity-90 transition-all duration-500  flex items-center justify-between rounded-[100px] bg-[#D63626] dark:bg-blue-500 text-white">
                <button className="capitalize mx-[3%] font-medium flex items-center">
                {t("Checkout")}

                </button>
                <p className="text-[#D63626] flex  items-center px-8 text-lg font-medium h-full rounded-[80px] border-2 border-[#D63626] dark:border-blue-500 bg-white dark:bg-gray-900 dark:text-sky-200">
                  $37.99
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <DeleteModal/>
    </>
  );
};

export default BasketUser;


export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ResCard from "@/components/Client/RestaurantCard/ResCard";
import Image from "next/image";
import soup from "../../public/svgs/soup.svg";
import filter from "../../public/svgs/filter.svg";
import { animated } from "@react-spring/web";
import MainHeader from "@/components/Client/MainHeader";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";

const Restaurants = () => {
  const { showUserModal, openUserModal, closeUserModal, modalSpring } =
    useSidebarContext() as SidebarContextProps;

  return (
    <>
      <MainHeader />
      <div className="p-6 px-10 flex flex-col justify-between md:flex-row font-mutka bg-white dark:bg-black">
        <div
          className="sm:hidden bg-white dark:bg-gray-900 cursor-pointer text-white p-6 rounded shadow-shadow4 flex justify-center mb-[12%]"
          onClick={openUserModal}
        >
          <Image
            src={filter}
            alt="filter"
            width={100}
            height={100}
            className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px]   object-cover"
          />
          <p className="text-[#4F4F4F] dark:text-gray-300 font-medium ml-2 text-xl">
            Filters
          </p>
        </div>

        <aside className="bg-[#F3F4F6] dark:bg-gray-800 w-2/12 font-mukta asideScroll max-h-[100vh] overflow-y-auto hidden md:block">
          <ul className="px-4 py-8">
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize dark:text-[#fff] mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#333] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
            <li className="flex items-center justify-center capitalize mb-[10%]">
              <Image
                src={soup}
                alt="name"
                width={100}
                height={100}
                className="hover:scale-105 transition-all duration-500  w-[30px]  h-[30px] rounded-full object-cover"
              />
              <p className="font-semibold text-xl text-[#141414] dark:text-[#fff] ml-4">
                chines
              </p>
            </li>{" "}
          </ul>
        </aside>

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
              <div className="my-4" onClick={closeUserModal}>
                <IoIosCloseCircleOutline
                  size={40}
                  className="text-[#BDBDBD] dark:text-sky-400  "
                />
              </div>
              <ul className="w-10/12 mt-[5%]">
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>{" "}
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>{" "}
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>{" "}
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>{" "}
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>{" "}
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>{" "}
                <li className="font-medium text-black text-[18px] border-b-2 border-gray-300 dark:text-gray-100  capitalize py-2 px-6">
                  chines
                </li>
              </ul>
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

        <div className="w-full md:w-9/12">
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <ResCard />
            <ResCard />
            <ResCard />
            <ResCard />
            <ResCard />
            <ResCard />
            <ResCard />
            <ResCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurants;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

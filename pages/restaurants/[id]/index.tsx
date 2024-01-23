import React, { useState, useEffect } from "react";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import papa from "../../../public/svgs/papa.svg";
import pizza from "../../../public/svgs/pizza.svg";
import basket from "../../../public/svgs/basketRes.svg";
import { LuTrash } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSpring, animated } from "@react-spring/web";
import BasketCard from "@/components/Client/BaskerCards/BasketCard";
import BasketResCard from "@/components/Client/BaskerCards/BasketResCard";

const ResDetail = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modalSpring = useSpring({
    opacity: showModal ? 1 : 0,
    transform: `translateY(${showModal ? 0 : -100}%)`,
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showModal && target.classList.contains("bg-black")) {
        closeModal();
      }
    };

    if (showModal) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showModal]);

  return (
    <div className="bg-white dark:bg-black ">
      <MainHeader />

      <div className="px-[2%]">
        <Image
          src={papa}
          alt="papa"
          width={500}
          height={500}
          className=" w-full object-cover"
        />
        <div className="dark:bg-white pt-2 md:pt-0 flex flex-col md:flex-row md:items-center md:justify-between px-4 pb-2">
          <div>
            <h1 className="capitalize  text-[#4F4F4F] text-[22px] font-bold">
              papa johns pizza restaurant
            </h1>
            <p className="capitalize  text-[#828282] text-[14px] font-medium">
              19 nizami streeet , sabail ,baku
            </p>
          </div>

          <div className="flex flex-col md:flex-row  md:items-center md:justify-between w-full md:w-4/12 ">
            <div className="w-full py-5 md:py-0">
              <h2 className="capitalize  text-[#4F4F4F] text-[18px] font-bold">
                cuisine
              </h2>
              <p className="capitalize  text-[#828282] text-[14px] font-medium">
                pizza , drink ,hotdog,sandvic,roll
              </p>
            </div>
            <div className="flex items-center w-full">
              <button className="  bg-white text-[#D63626] hover:opacity-75 transition-all duration-500 flex flex-col items-start justify-center  h-12  px-2 text-sm font-medium rounded-[4px] border-2 border-[#D63626]">
                <span>$5</span>
                <span>Delivery</span>
              </button>
              <button className="  ml-[5%] bg-[#D63626] text-[#fff] hover:opacity-75 transition-all duration-500 flex  items-center capitalize h-12 px-2 text-sm font-medium rounded-[4px] border-2 border-[#D63626]">
                <span>go back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[3%] px-[6%] flex justify-between">
        <div className="w-full md:w-7/12 bg-[#F3F4F6] dark:bg-gray-900 flex flex-col items-center asideScroll max-h-[100vh] overflow-y-auto">
          <h1 className="capitalize py-5 text-[#4F4F4F)] dark:text-cyan-400 font-bold text-[25px]">
            products
          </h1>
          <div className="w-full border-t-2 py-3 dark:border-sky-300">
            <BasketCard />
            <BasketCard />
            <BasketCard />
            <BasketCard />
            <BasketCard />
            <BasketCard />
            <BasketCard />

            <div
              className="flex justify-center w-full mt-[4%] md:hidden "
              onClick={openModal}
            >
              <div className="h-12 w-10/12 cursor-pointer hover:opacity-90 transition-all duration-500  flex items-center justify-between rounded-[100px] bg-[#D63626] dark:bg-blue-500 text-white">
                <button className="capitalize ml-[3%] font-medium flex items-center">
                  <Image
                    src={basket}
                    alt="basket"
                    width={100}
                    height={100}
                    className=" w-[25px] h-[25px] mx-2 object-cover"
                  />
                  <p className="text-white ml-1 dark:text-cyan-100 mt-1">
                    3 items
                  </p>
                </button>
                <p className="text-[#D63626] flex  items-center px-8 text-lg font-medium h-full rounded-[80px] border-2 border-[#D63626] dark:border-blue-500 bg-white dark:bg-gray-900 dark:text-sky-200">
                  $37.99
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BASKET_MODAL */}
        {showModal && (
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
              <div className="mt-4" onClick={closeModal}>
                <IoIosCloseCircleOutline
                  size={40}
                  className="text-[#BDBDBD] dark:text-sky-400  "
                />
              </div>
              <div>
                <BasketResCard />
                <BasketResCard />
                <BasketResCard />
              </div>
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
              onClick={closeModal}
            />
          </>
        )}

        <div className="hidden  w-4/12 bg-[#F3F4F6] dark:bg-gray-900 md:flex flex-col items-center asideScroll max-h-[60vh] overflow-y-auto">
          <div className="flex justify-start items-center py-2 w-full">
            <h1 className="capitalize py-2 text-[#4F4F4F)] dark:text-cyan-400 font-bold text-[25px]"></h1>
            <Image
              src={basket}
              alt="basket"
              width={100}
              height={100}
              className=" w-[25px] h-[25px] mx-2  object-cover"
            />
            <p className="capitalize  text-[#D63626)] mt-1 dark:text-cyan-400 font-bold text-[16px]">
              3 items
            </p>
          </div>
          <div className="w-full border-t-2 py-3 dark:border-sky-300">
            <div className="flex items-center justify-around pt-1 pb-2 ">
              <Image
                src={pizza}
                alt="pizza"
                width={100}
                height={100}
                className=" w-[45px] h-[45px]  rounded-full  object-cover"
              />
              <div>
                <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                  papa johns pizza restaurant
                </h1>
                <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                  $7.99
                </span>
              </div>
              <LuTrash className="text-red-500 dark:text-sky-300 text-2xl ml-1 hover:scale-110 transition-all duration-500 cursor-pointer" />
              <div className="bg-white dark:bg-gray-800 text-black dark:text-cyan-300 font-medium flex flex-col items-center px-2 py-1 rounded-3xl">
                <span>+</span>
                <span className="font-semibold">5</span>
                <span>-</span>
              </div>
            </div>
            <div className="w-full flex justify-center mt-4">
              <div className="h-12 w-10/12 cursor-pointer hover:opacity-90 transition-all duration-500  flex items-center justify-between rounded-[100px] bg-[#D63626] dark:bg-blue-500 text-white">
                <button className="capitalize mx-[3%] font-medium flex items-center">
                  checkout
                </button>
                <p className="text-[#D63626] flex  items-center px-8 text-lg font-medium h-full rounded-[80px] border-2 border-[#D63626] dark:border-blue-500 bg-white dark:bg-gray-900 dark:text-sky-200">
                  $37.99
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResDetail;
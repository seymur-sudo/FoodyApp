import React from "react";
import UserAside from "../../../components/Client/UserAside/index";
import MainHeader from "../../../components/Client/MainHeader/index";
import Image from "next/image";
import threePoint from "../../../public/svgs/threePoint.svg";
import soup from "../../../public/svgs/soup.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { animated } from "@react-spring/web";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces";
import UserRouter from "@/components/Client/UserRouter";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const UserOrders = () => {
  const { showUserModal, closeUserModal, modalSpring, openUserModal ,showDelete, setshowDelete} =
    useSidebarContext() as SidebarContextProps;
  return (
   
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />

        <UserRouter />
        {showUserModal && (
          <>
            <div className="fixed inset-0 bg-black  dark:bg-gray-200 opacity-60 z-40 md:opacity-0"></div>

            <animated.div
              style={{
                ...modalSpring,
                position: "fixed",
                top: "30vh",
                left: "22vw",
                right: 0,
                zIndex: 50,
              }}
              className="bg-white dark:bg-gray-800 rounded-t-[20px] flex flex-col w-7/12 max-h-[45vh] overflow-y-auto items-center justify-start  asideScroll"
            >
              <div className="my-2" onClick={closeUserModal}>
                <IoIosCloseCircleOutline
                  size={40}
                  className="text-[#BDBDBD] dark:text-sky-400 cursor-pointer "
                />
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="pl-14 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Count
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-[#27283C] dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-700">
                    <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                      <Image
                        alt="soup"
                        src={soup}
                        className="w-[45px] h-[45px] rounded-full cursor-pointer  hover:scale-110   transition-all duration-500"
                      />
                    </td>

                    <td className="px-5"> coffee</td>

                    <td className="pl-4 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                      $ 3.49
                    </td>

                    <td className="px-6 font-semibold text-gray-900 dark:text-white">
                      43
                    </td>

                    <td className="p-4 pl-8 font-semibold text-gray-900 dark:text-white">
                      33
                    </td>
                  </tr>
                </tbody>
              </table>
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
          <h1 className="capitalize text-[#4F4F4F] dark:text-sky-300 text-[30px] font-semibold ml-7 mt-6">
            orders
          </h1>

          <div className=" overflow-x-auto shadow-md sm:rounded-lg p-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cus_Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delivery Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paymnet
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-[#27283C] dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-700">
                  <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                    1234
                  </td>

                  <td className="px-5">02401</td>

                  <td className="pl-4 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                    25 dec 2023
                  </td>

                  <td className="px-6 font-semibold text-gray-900 dark:text-white">
                    20 eve street 545 avenue..
                  </td>

                  <td className="p-4 pl-8 font-semibold text-gray-900 dark:text-white">
                    333.3
                  </td>
                  <td className="p-4 px-6 font-semibold text-gray-900 dark:text-white">
                    cash on delivery
                  </td>

                  <td className="py-4 font-semibold text-gray-900 dark:text-white">
                    055 350 92 92
                  </td>

                  <td className="pl-6 py-4">
                    <Dropdown className="shadow-shadow5 dark:shadow-shadow5Dark rounded-md">
                      <DropdownTrigger>
                        <Image
                          alt="show"
                          src={threePoint}
                          className="w-10 h-6 cursor-pointer  hover:scale-110  font-medium  transition-all duration-700"
                        />
                      </DropdownTrigger>
                      <DropdownMenu
                        className="bg-white dark:bg-slate-800"
                        aria-label="User Actions"
                        variant="flat"
                      >
                        <DropdownItem className="h-12 flex " key="show">
                          <p
                            className="  capitalize font-semibold text-[#6FCF97] "
                            onClick={openUserModal}
                          >
                            show
                          </p>
                        </DropdownItem>
                        <DropdownItem
                          className="h-12 flex capitalize"
                          key="delete"
                        >
                          <p
                            className=" font-semibold text-[#EB5757] "
                            onClick={() => setshowDelete(!showDelete)}
                          >
                            delete
                          </p>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
            <DeleteModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;

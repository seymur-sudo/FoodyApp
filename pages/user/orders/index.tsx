import React, { useState } from "react";
import UserAside from "../../../components/Client/UserAside/index";
import MainHeader from "../../../components/Client/MainHeader/index";
import Image from "next/image";
import threePoint from "../../../public/svgs/threePoint.svg";
import moment from "moment";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { animated } from "@react-spring/web";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, orderItem } from "@/interfaces";
import { QUERIES } from "../../../constant/Queries";
import { useQuery } from "react-query";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getUserOrder } from "@/services";
import { OrderPostDataType } from "@/interfaces";

type SortingValue = "A-Z" | "Z-A" | "Low-to-High" | "High-to-Low";

const UserOrders = () => {
  const {
    showUserModal,
    closeUserModal,
    modalSpring,
    openUserModal,
    setshowDelete,
    setDeletedOrder,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  const {
    data: userOrder,
    isLoading,
    isError,
  } = useQuery(QUERIES.UserOrder, getUserOrder);

  const timeS = userOrder?.data.result.data.map((order: any) => order?.created);
  const editedTime = timeS?.map((time: string) => {
    return moment(time).format("ll");
  });
  const [orderItems, setOrderItems] = useState<orderItem[]>();
  const handleOrderShow = (item: orderItem[]) => {
    openUserModal();
    setOrderItems(item);
  };

  const openDeleteModal = (orderData: OrderPostDataType | null) => {
    setshowDelete(true);
    setDeletedOrder(orderData);
  };

  const [sortingValue, setSortingValue] = useState<SortingValue>("A-Z");
  const resetSorting = () => {
    setSortingValue("A-Z");
  };

  const handleSortProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingValue(event.target.value as SortingValue);
  };

  const sortedProducts: OrderPostDataType[] = [
    ...(userOrder?.data.result.data || []),
  ];
  if (sortingValue === "A-Z") {
    sortedProducts.sort((a, b) =>
      (a.delivery_address ?? "").localeCompare(b.delivery_address ?? "")
    );
  } else if (sortingValue === "Z-A") {
    sortedProducts.sort((a, b) =>
      (b.delivery_address ?? "").localeCompare(a.delivery_address ?? "")
    );
  } else if (sortingValue === "Low-to-High") {
    sortedProducts.sort((a, b) => (a.amount || 0) - (b.amount || 0));
  } else {
    sortedProducts.sort((a, b) => (b.amount || 0) - (a.amount || 0));
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }
  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />

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
                      {t("Image")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("Name")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("Price")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("Count")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("Amount")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems &&
                    orderItems?.map((product: any, index: number) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-[#27283C] dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-700"
                      >
                        <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                          <Image
                            alt="soup"
                            width={100}
                            height={100}
                            src={product?.img_url ?? ""}
                            className="w-[45px] h-[45px] rounded-full cursor-pointer  hover:scale-110   transition-all duration-500"
                          />
                        </td>

                        <td className="px-5"> {product?.name}</td>

                        <td className="pl-4 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                          $ {product?.price}
                        </td>

                        <td className="px-6 font-semibold text-gray-900 dark:text-white">
                          {product?.count}
                        </td>

                        <td className="p-4 pl-8 font-semibold text-gray-900 dark:text-white">
                          {product.amount}
                        </td>
                      </tr>
                    ))}
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
          <div className="w-full flex items-center mb-6">
            <select
              className="pl-4 py-3  rounded-md w-8/12  md:w-2/12 cursor-pointer bg-[#e5ecf9] dark:bg-[#27283C] dark:text-gray-200 "
              value={sortingValue}
              onChange={handleSortProducts}
            >
              <option value="A-Z">A-Z Delivery</option>
              <option value="Z-A">Z-A Delivery</option>
              <option value="Low-to-High">Low To High Amount</option>
              <option value="High-to-Low">High To Low Amount</option>
            </select>
            <button
              className="ml-4 px-4 py-[10px] w-3/12  md:w-1/12 rounded-md cursor-pointer bg-blue-900 dark:bg-blue-600 text-gray-200 hover:opacity-75 transition-all duration-500"
              onClick={resetSorting}
            >
              Reset
            </button>
          </div>
          <h1 className="capitalize text-[#4F4F4F] dark:text-sky-300 text-[30px] font-semibold ml-7 mt-6">
            {t("Your Orders")}
          </h1>

          <div className=" overflow-x-auto shadow-md sm:rounded-lg p-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Customer Id")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Time")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Delivery Address")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Amount")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Paymnet Method")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Contact")}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {t("Actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts &&
                  sortedProducts?.map((order: any, index: number) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-[#27283C] dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-700"
                    >
                      <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                        {order.id.slice(0, 5)}
                      </td>

                      <td className="px-5">{order.customer_id.slice(0, 5)}</td>

                      <td className="pl-4 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                        {editedTime[index]}
                      </td>

                      <td className="px-6 font-semibold text-gray-900 dark:text-white">
                        {order.delivery_address}
                      </td>

                      <td className="p-4 pl-8 font-semibold text-gray-900 dark:text-white">
                        {order.amount}
                      </td>
                      <td className="p-4 px-6 font-semibold text-gray-900 dark:text-white">
                        {order.payment_method}
                      </td>

                      <td className="py-4 font-semibold text-gray-900 dark:text-white">
                        {order.contact}
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
                                onClick={() => handleOrderShow(order.products)}
                              >
                                {t("Show")}
                              </p>
                            </DropdownItem>
                            <DropdownItem
                              className="h-12 flex capitalize"
                              key="delete"
                            >
                              <p
                                className=" font-semibold text-[#EB5757] "
                                onClick={() => openDeleteModal(order)}
                              >
                                {t("Delete")}
                              </p>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

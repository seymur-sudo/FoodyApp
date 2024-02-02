import React, { useState } from "react";
import Layout from "@/components/Admin/Layout";
import SearchBar from "@/components/Admin/SearchBar";
import { LuTrash } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QUERIES } from "../../../constant/Queries";
import { OrderPostDataType } from "../../../interfaces/index";
import { getOrders } from "@/services";
import Moment from "moment";
import usePagination from "@/components/Admin/Pagination";
import PaginationControls from "@/components/Admin/Pagination/PaginationControls";

type SortingValue = "A-Z" | "Z-A" | "Low-to-High" | "High-to-Low";

const Orders: React.FC = () => {
  const { setshowDelete, setDeletedOrder } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery(QUERIES.Order, getOrders);
  const [sortingValue, setSortingValue] = useState<SortingValue>("A-Z");
  const resetSorting = () => {
    setSortingValue("A-Z");
  };
  const orderList = orders?.data.result.data;
  const { currentPage, currentData, totalPages, nextPage, prevPage, goToPage } =
    usePagination(orderList, 5);

  const openDeleteModal = (orderData: OrderPostDataType | null) => {
    setshowDelete(true);
    setDeletedOrder(orderData);
  };

  const handleSortProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingValue(event.target.value as SortingValue);
  };

  const sortedProducts: OrderPostDataType[] = [...(currentData || [])];
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
    <Layout>
      <div className="bg-bgc h-screen px-12 md:px-6 ">
        <SearchBar />

        <div className="w-full flex items-center mb-6">
          <select
            className="pl-4 py-3  rounded-md w-8/12  md:w-2/12 cursor-pointer bg-[#27283C] text-gray-200 "
            value={sortingValue}
            onChange={handleSortProducts}
          >
            <option value="A-Z">A-Z Delivery</option>
            <option value="Z-A">Z-A Delivery</option>
            <option value="Low-to-High">Low To High Amount</option>
            <option value="High-to-Low">High To Low Amount</option>
          </select>
          <button
            className="ml-4 px-4 py-[10px] w-3/12  md:w-1/12 rounded-md cursor-pointer bg-[#C74FEB] text-white hover:opacity-75 transition-all duration-500"
            onClick={resetSorting}
          >
            Reset
          </button>
        </div>
        <div className=" overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
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
                sortedProducts.map((order: OrderPostDataType, index) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700"
                  >
                    <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                      <p className="flex justify-start items-center">
                        <span>{(currentPage - 1) * 5 + index + 1}</span>
                        <span className="ml-1">- {order.id?.slice(0, 5)}</span>
                      </p>
                    </td>

                    <td className="p-4 pl-6">
                      <p className="flex justify-start items-center">
                        <span>{(currentPage - 1) * 5 + index + 1}</span>
                        <span className="ml-1">
                          - {order.customer_id.slice(0, 5)}
                        </span>
                      </p>
                    </td>

                    <td className="pr-8 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                      {Moment(order.created).format("DD-MM-YY - HH:mm:ss")}
                    </td>

                    <td className="pl-8 font-semibold text-gray-900 dark:text-white">
                      {order.delivery_address}
                    </td>

                    <td className="p-4 pl-8 font-semibold text-gray-900 dark:text-white">
                      {order.amount}
                    </td>
                    <td className="p-4 px-6 font-semibold text-gray-900 dark:text-white">
                      {order.payment_method}
                    </td>

                    <td className="p-4 font-semibold text-gray-900 dark:text-white">
                      {order.contact}
                    </td>

                    <td className="pl-5 py-4">
                      <div className="flex items-center">
                        <FaEye className="hover:scale-110 transition-all duration-500 mr-2 text-cyan-400  text-2xl cursor-pointer" />
                        <LuTrash
                          onClick={() => openDeleteModal(order)}
                          className="hover:scale-110 transition-all duration-500  text-red-400 text-2xl cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        />
      </div>
      <ReactQueryDevtools />
      <DeleteModal />
    </Layout>
  );
};

export default Orders;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

import React from "react";
import Layout from "@/components/Admin/Layout";
import SearchBar from "@/components/Admin/SearchBar";
import { LuTrash } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import DeleteOffer from "@/components/Admin/Deletes/DeleteOffer";
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

const Orders: React.FC = () => {
  const {
    setshowDelete,
    deletedOrder,
    setDeletedOrder,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery(QUERIES.Order, getOrders);
  const orderList = orders?.data.result.data;

  const openDeleteModal = (orderData: OrderPostDataType | null) => {
    setshowDelete(true);
    setDeletedOrder(orderData);
  };

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
              {orderList &&
                orderList.map((order: OrderPostDataType) => (
                  <tr className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700">
                    <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.id.slice(0, 5)}
                    </td>

                    <td className="p-4 pl-8">
                      {order.customer_id.slice(0, 5)}
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
      </div>
      <ReactQueryDevtools />
      {/* <DeleteOffer /> */}
      <DeleteModal/>
    </Layout>
  );
};

export default Orders;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

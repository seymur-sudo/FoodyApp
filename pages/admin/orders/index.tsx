import React from "react";
import Layout from "@/components/Admin/Layout";
import Image from "next/image";
import eye from "../../../public/svgs/eye.svg";
import deleteIcon from "../../../public/svgs/delete2.svg";
import SearchBar from "@/components/Admin/SearchBar";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Orders: React.FC = () => {
  const { showDelete, setshowDelete } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

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
              <tr className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700">
                <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                  1234
                </td>

                <td className="p-4 pl-8">02401</td>

                <td className="pr-8 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                  25 dec 2023
                </td>

                <td className="px-1 font-semibold text-gray-900 dark:text-white">
                  20 eve street 545..
                </td>

                <td className="p-4 pl-8 font-semibold text-gray-900 dark:text-white">
                  333.3
                </td>
                <td className="p-4 px-6 font-semibold text-gray-900 dark:text-white">
                  cash on delivery
                </td>

                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  055 350 92 92
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Image
                      src={eye}
                      alt="title"
                      className="hover:scale-110 transition-all duration-500  mr-2  cursor-pointer"
                    />
                    <Image
                      src={deleteIcon}
                      alt="title"
                      onClick={() => setshowDelete(!showDelete)}
                      className="hover:scale-110 transition-all duration-500   cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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

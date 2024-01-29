import React from "react";
import Layout from "@/components/Admin/Layout";
import Image from "next/image";
import hamburger from "../../../public/svgs/hamburger.svg";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete2.svg";
import SearchBar from "@/components/Admin/SearchBar";
import {
  SidebarContextProps,
  CategoryPostDataType,
} from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getCategory } from "../../../services/index";
import { useQuery } from "react-query";
import { QUERIES } from "../../../constant/Queries";
import usePagination from "@/components/Admin/Pagination/Pagination";
import PaginationControls from "@/components/Admin/Pagination/PaginationControls";

const Category: React.FC = () => {
  const { setShow, setshowDelete, setEditedCategory, setDeletedCategory } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  const { data, isLoading, isError } = useQuery(
    QUERIES.Categories,
    getCategory
  );

  const { currentPage, currentData, totalPages, nextPage, prevPage, goToPage } =
    usePagination(data?.data.result.data, 3);

  const openModal = (category: CategoryPostDataType | null) => {
    setShow(true);
    setEditedCategory(category);
  };
  const openDeleteModal = (category: CategoryPostDataType | null) => {
    setshowDelete(true);
    setDeletedCategory(category);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <Layout>
      <div className="bg-bgc h-screen px-12 md:px-6">
        <SearchBar />
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-16 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Image")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Name")}
                </th>

                <th scope="col" className="px-6 py-3">
                  {t("Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData &&
                currentData.map((category: CategoryPostDataType) => {
                  return (
                    <tr
                      key={category.id}
                      className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700"
                    >
                      <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                        {category.id}
                      </td>

                      <td className="p-4 ">
                        <Image
                          src={category.img_url ? category.img_url : hamburger}
                          alt={category.name}
                          width={100}
                          height={100}
                          className="hover:scale-105 object-cover transition-all duration-500 w-[100px] h-[50px] rounded-md"
                        />
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                        {category.name}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Image
                            src={editIcon}
                            alt="title"
                            onClick={() => openModal(category)}
                            className="hover:scale-110 transition-all duration-500  mr-2  cursor-pointer"
                          />
                          <Image
                            src={deleteIcon}
                            alt="title"
                            onClick={() => openDeleteModal(category)}
                            className="hover:scale-110 transition-all duration-500   cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            goToPage={goToPage}
          />
          <EditModal />
          <DeleteModal />
        </div>
      </div>
    </Layout>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

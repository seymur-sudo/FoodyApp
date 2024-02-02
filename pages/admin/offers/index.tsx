import React, { useState } from "react";
import Layout from "@/components/Admin/Layout";
import { useQuery } from "react-query";
import Image from "next/image";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete2.svg";
import SearchBar from "@/components/Admin/SearchBar";
import {
  OfferPostDataType,
  SidebarContextProps,
} from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { GetServerSideProps } from "next";
import { getOffer } from "@/services/index";
import usePagination from "@/components/Admin/Pagination";
import PaginationControls from "@/components/Admin/Pagination/PaginationControls";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type SortingValue = "A-Z" | "Z-A" | "Low-to-High" | "High-to-Low";

const Offers: React.FC = () => {
  const { data, isLoading, isError } = useQuery("offers", getOffer, {
    refetchOnWindowFocus: false,
  });
  const { setShow, setLastOffer, setshowDelete } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  const { currentPage, currentData, totalPages, nextPage, prevPage, goToPage } =
    usePagination(data?.data.result.data, 2);
  const [sortingValue, setSortingValue] = useState<SortingValue>("A-Z");
  const resetSorting = () => {
    setSortingValue("A-Z");
  };
  const handleSortProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingValue(event.target.value as SortingValue);
  };

  const sortedProducts: OfferPostDataType[] = [...(currentData || [])];
  if (sortingValue === "A-Z") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortingValue === "Z-A") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleDelete = (offer: OfferPostDataType | null) => {
    setshowDelete(true);
    setLastOffer(offer);
  };
  const handleEdit = (offer: OfferPostDataType | null) => {
    setShow(true);
    setLastOffer(offer);
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
        <div className="w-full flex items-center mb-6">
          <select
            className="pl-4 py-3  rounded-md w-8/12  md:w-2/12 cursor-pointer bg-[#27283C] text-gray-200 "
            value={sortingValue}
            onChange={handleSortProducts}
          >
            <option value="A-Z">A-Z Name</option>
            <option value="Z-A">Z-A Name</option>
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
                  {t("Image")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Title")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Description")}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t("Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts &&
                sortedProducts.map((offer: OfferPostDataType,index) => (
                  <tr
                    key={offer.id}
                    className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700"
                  >
                    <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                      <p className="flex justify-start items-center">
                        <span>{(currentPage - 1) * 3 + index + 1}</span>
                        <span className="ml-1">
                          - {offer.id?.slice(0, 5)}
                        </span>
                      </p>
                    </td>

                    <td className="p-4 ">
                      <Image
                        src={offer.img_url ?? ""}
                        width={100}
                        height={100}
                        alt="title"
                        className="hover:scale-105 transition-all duration-500 w-[50px] h-[50px] rounded-md"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                      {offer.name}
                    </td>

                    <td className="p-4 px-7 font-semibold text-gray-900 dark:text-white">
                      {offer.description}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Image
                          src={editIcon}
                          alt="title"
                          onClick={() => handleEdit(offer)}
                          className="hover:scale-110 transition-all duration-500  mr-2  cursor-pointer"
                        />
                        <Image
                          src={deleteIcon}
                          alt="title"
                          onClick={() => handleDelete(offer)}
                          className="hover:scale-110 transition-all duration-500   cursor-pointer"
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

      <EditModal />
      <DeleteModal />
    </Layout>
  );
};

export default Offers;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

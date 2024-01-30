import React from "react";
import Layout from "@/components/Admin/Layout";
import { useQuery } from "react-query";
import Image from "next/image";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete2.svg";
import SearchBar from "@/components/Admin/SearchBar";
import { OfferPostDataType, SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { GetServerSideProps } from "next";
import { getOffer } from "@/services/index";
import usePagination from "@/components/Admin/Pagination";
import PaginationControls from "@/components/Admin/Pagination/PaginationControls";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Offers: React.FC = () => {
  const { data, isLoading, isError } = useQuery("offers", getOffer, {
    refetchOnWindowFocus: false,
  });
  const { setShow,lastOffer,setLastOffer, setNewImg, show, showDelete, setshowDelete } =
    useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");

  
  const { currentPage, currentData, totalPages, nextPage, prevPage, goToPage } =
    usePagination(data?.data.result.data, 3);

  const handleDelete = (item:OfferPostDataType) => {
    setLastOffer(item);
    setshowDelete(!showDelete);
  };
  const handleEdit = (itemI: OfferPostDataType) => {
    setLastOffer(itemI);
    setNewImg(itemI.img_url ?? null);
    setTimeout(() => {
      setShow(!show);
    }, 100);
  };
  return (
    <Layout>
      <div className="bg-bgc h-screen px-12 md:px-6">
        <SearchBar />

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
            {currentData && currentData.map((offer: OfferPostDataType) => (
              <tr key={offer.id} className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700">
                <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                  {offer.id}
                </td>

                <td className="p-4 ">
                  <Image
                    src={offer.img_url??""}
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
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            goToPage={goToPage}
          />
        </div>
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

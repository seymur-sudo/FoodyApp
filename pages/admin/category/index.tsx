import React from "react";
import Layout from "@/components/Admin/Layout";
import Image from "next/image";
import hamburger from "../../../public/svgs/hamburger.svg";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete2.svg";
import SearchBar from "@/components/Admin/SearchBar";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";


const Category: React.FC = () => {
  const { setShow, show , showDelete, setshowDelete } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation('common')
  return (
    <Layout>
      <div className="bg-bgc h-screen px-12 md:px-6">
        <SearchBar />
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('Image')}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('Name')}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('Slug')}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-[#27283C] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-700">
                <td className="pl-14 py-4 font-semibold text-gray-900 dark:text-white">
                  1234
                </td>

                <td className="p-4 ">
                  <Image
                    src={hamburger}
                    alt="title"
                    className="hover:scale-105 transition-all duration-500 w-6/7 h-[42px] rounded-md"
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white capitalize">
                  pizza
                </td>

                <td className="p-4 font-semibold text-gray-900 dark:text-white">
                  yummy pizza
                </td>

                <td className="px-6 py-4">
                  <div
                    className="flex items-center"
                   
                  >
                    <Image
                      src={editIcon}
                      alt="title"
                      onClick={() => setShow(!show)}
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
          <EditModal />
          <DeleteModal/>
        </div>
      </div>
    </Layout>
  );
};

export default Category;


export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});
import React from "react";
import UserAside from "../../../components/Client/UserAside/index";
import MainHeader from "../../../components/Client/MainHeader/index";
import UserBasket from "../../../components/Client/BaskerCards/UserBasket";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const BasketUser = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly py-8">
        <UserAside />
   
        <div className="w-10/12 md:w-8/12 bg-[#F3F4F6] dark:bg-gray-900  ">
          <div>
            <div className="capitalize py-2 px-4">
              <span className="text-[30px] text-[#4F4F4F] dark:text-blue-400 font-bold">
                {t("Your Basket")}
              </span>
            </div>
            <UserBasket />
            
          </div>
        </div>
      </div>

      <DeleteModal />
    </>
  );
};

export default BasketUser;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

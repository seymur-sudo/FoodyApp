import { useTranslation } from "next-i18next";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const MainFooter: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className=" bg-black dark:bg-gray-900 sm:pl-[150px]  sm:pr-[88px] pt-[120px] font-body">
      <div className="flex sm:flex-row sm:justify-between">
        <div className=" sm:items-start flex flex-col items-center">
          <p className=" flex flex-row items-center text-center font-mukta text-[28px] font-extrabold text-[white] dark:text-gray-100">
            Foody<span className="text-[#EAAB00] dark:text-sky-400 ">.</span>
          </p>
          <p className="text-[#828282] text-center sm:mx-0 mx-7 sm:text-start text-[22px] font-normal">
            Lorem ipsum is placeholder text <br className="hidden sm:block" />{" "}
            commonly used in the graphic,
          </p>
          <div className="mt-4 flex flex-row">
            <FaFacebook
              className="mr-4 hover:scale-125 dark:hover:text-[#4064AC] hover:text-[#4064AC] duration-500 dark:text-white text-[#FB9300]"
              size={"50px"}
            />
            <FaInstagram
              className="mr-4 hover:scale-125 dark:hover:text-[#EA4669] hover:text-[#EA4669] duration-500 dark:text-white text-[#FB9300]"
              size={"50px"}
            />
            <FaTwitter
              className="mr-4 hover:scale-125 dark:hover:text-[#1C9CEA] hover:text-[#1C9CEA] duration-500 dark:text-white text-[#FB9300]"
              size={"50px"}
            />
          </div>
        </div>
        <div className="sm:block hidden">
          <p className="text-[20px] mb-1 font-black text-white">{t("Popular")}</p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Programming")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Books for children")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Psychology")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Business")}
          </p>
        </div>
        <div className="sm:block hidden">
          <p className="text-[20px] mb-1 font-black text-white">{t("Cash")}</p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Delivery")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">{t("Payment")}</p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("About the store")}
          </p>
        </div>
        <div className="sm:block hidden">
          <p className="text-[20px] mb-1 font-black text-white">{t("Help")}</p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Contact")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Purchase returns")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Targets")}
          </p>
          <p className="text-[13px] mb-1 font-normal text-[#BDBDBD]">
            {t("Buyer Help")}
          </p>
        </div>
      </div>
      <p className="text-[14px] mt-10 font-normal text-center pb-2 text-white">
        {t(
          "All rights reserved © 2003-2024 Foody TERMS OF USE | Privacy Policy"
        )}
      </p>
    </div>
  );
};
export default MainFooter;

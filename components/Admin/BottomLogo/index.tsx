import React from "react";
import Image from "next/image";
import EACampLogo from "../../../public/svgs/EACampLogo.svg";
import { useTranslation } from "next-i18next";

export const BottomLogo: React.FC = () => {
  const { t } = useTranslation("common");

  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");


  return (
    <div className="bg-[#27283C] sm:flex ml-1  pb-1 items-center rounded-xl hidden flex-col">
      <div className="flex flex-row mb-1 mt-4">
        <Image alt="ealogo" className="mr-2" src={EACampLogo} />
        <p className="text-[14px] font-extrabold text-[#C7C7C7]">EACAMP</p>
      </div>
      <p className="text-[10px] mb-1 font-normal text-[#8E8E93]">
        {t("Version")} :1.0.
      </p>
      <p className="text-[10px] font-normal text-[#8E8E93]">{currentDate}</p>
    </div>
  );
};

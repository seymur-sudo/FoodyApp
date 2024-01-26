import React from "react";
import { LangSelect } from "@/components/Admin/Langs";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { ThemeContextProps } from "../../../interfaces/index";
import { FiSun, FiMoon } from "react-icons/fi";
const ClientHeader=()=>{
  const { toggleTheme } = useThemeContext() as ThemeContextProps;
    return(
      <>
        <nav className="items-center flex-row dark:bg-green-900 rounded-4 mb-20px sm:mt-30 pr-6 flex bg-clientRed justify-between">
          <div className=" text-white ml-3 font-mukta text-25 sm:text-35 font-extrabold my-13px sm:ml-9 sm:my-9">
            Foody.
          </div>
          <div className="flex flex-row items-center">
          <div className="flex items-center ">
          <button
            className="px-3  transition-all duration-700 "
            onClick={toggleTheme}
          >
            <FiSun
              size={50}
              className="text-[#EAAB00] dark:text-gray-900 block dark:hidden"
            />
            <FiMoon
              size={50}
              className="text-[#F3F4F6] dark:text-sky-400  hidden dark:block"
            />
          </button>
        </div>
            <LangSelect/>
          </div>
        </nav>
      </>
     
    )
}
export default ClientHeader;
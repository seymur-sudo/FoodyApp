import React from "react";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import AddProduct from "../AddProduct/index";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebarContext() as SidebarContextProps;

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`absolute left-[28vw] top-8 flex justify-center z-50 items-center bg-[#EC5CF8] w-7 h-7 rounded-full transition-all duration-500 ${
          isSidebarOpen ? "" : "opacity-0 pointer-events-none "
        }`}
        onClick={closeSidebar}
      >
        <span className="text-[#F2F2F2] text-xl cursor-pointer z-50 mb-[6px]">
          x
        </span>
      </div>

      <div
        className={`${
          isSidebarOpen ? "right-0" : "-right-full"
        } w-full bg-inputMain fixed top-0 h-full shadow-2xl md:w-[67vw] 
         xl:max-w-[67vw] z-50  transition-all duration-700 px-4 lg:px-[62px]  overflow-auto showModal`}
      >
        
  
        <div className="h-full">
          <AddProduct />
        </div>
      </div>
    </>
  );
};

export default Sidebar;

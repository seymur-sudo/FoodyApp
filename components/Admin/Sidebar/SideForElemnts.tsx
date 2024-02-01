import React from "react";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useRouter } from "next/router";
import AddCategory from "../AddCategory/index";
import AddRestuarant from "../AddRestuarant";
import AddOffer from "../AddOffer";
import { ROUTER } from "../../../shared/constant/router";

const SideForElements: React.FC = () => {
  const { showAdds, closeAddsModal } =
    useSidebarContext() as SidebarContextProps;
  const router = useRouter();
  const getSidebarComponent = () => {
    if (router.pathname === ROUTER.ADMIN_RESTAURANTS) {
      return <AddRestuarant />;
    } else if (router.pathname === ROUTER.ADMIN_CATEGORY) {
      return <AddCategory />;
    } else if (router.pathname === ROUTER.ADMIN_OFFERS) {
      return <AddOffer />;
    }
    return null;
  };

  return (
    <>
      {showAdds && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={closeAddsModal}
        ></div>
      )}

      <div
        className={`absolute left-[28vw] top-8 flex justify-center z-50 items-center bg-[#EC5CF8] w-7 h-7 rounded-full transition-all duration-500 ${
          showAdds ? "" : "opacity-0 pointer-events-none "
        }`}
        onClick={closeAddsModal}
      >
        <span className="text-[#F2F2F2] text-xl cursor-pointer z-50 mb-[6px]">
          x
        </span>
      </div>

      <div
        className={`${
          showAdds ? "right-0" : "-right-full"
        } w-full bg-inputMain fixed top-0 h-full shadow-2xl md:w-[67vw] 
         xl:max-w-[67vw] z-50  transition-all duration-700 px-4 lg:px-[62px]  overflow-auto showModal`}
      >
        <div className="h-full">{getSidebarComponent()}</div>
      </div>
    </>
  );
};

export default SideForElements;

import React from "react";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useRouter } from "next/router";
import EditProduct from "../Updates/EditProduct";
import EditCategory from "../Updates/EditCategory";
import EditOffer from "../Updates/EditOffers";
import EditRestuarant from "../Updates/EditRestuarant";
import { ROUTER } from "../../../shared/constant/router";

const EditModal: React.FC = () => {
  const { show, closeModal } = useSidebarContext() as SidebarContextProps;
  const router = useRouter();

  const getEditModal = () => {
    if (router.pathname === ROUTER.ADMIN_RESTAURANTS) {
      return <EditRestuarant />;
    } else if (router.pathname === ROUTER.ADMIN_CATEGORY) {
      return <EditCategory />;
    } else if (router.pathname === ROUTER.ADMIN_OFFERS) {
      return <EditOffer />;
    } else if (router.pathname === ROUTER.ADMIN_PRODUCTS) {
      return <EditProduct />;
    }
    return null;
  };

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-40"
          onClick={closeModal}
        ></div>
      )}

      <div
        className={`absolute left-[28vw] top-8 flex justify-center z-50 items-center bg-[#EC5CF8] w-7 h-7 rounded-full transition-all duration-500 ${
          show ? "" : "opacity-0 pointer-events-none "
        }`}
        onClick={closeModal}
      >
        <span className="text-[#F2F2F2] text-xl cursor-pointer z-50 mb-[6px]">
          x
        </span>
      </div>

      <div
        className={`${
          show ? "right-0" : "-right-full"
        } w-full bg-inputMain fixed top-0 h-full shadow-2xl md:w-[67vw] 
         xl:max-w-[67vw] z-50  transition-all duration-700 px-4 lg:px-[62px]  overflow-auto showModal`}
      >
        <div className="h-full">{getEditModal()}</div>
      </div>
    </>
  );
};

export default EditModal;

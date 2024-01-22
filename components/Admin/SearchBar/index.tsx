import React from "react";
import SideForElements from "../Sidebar/SideForElemnts";
import { useRouter } from "next/router";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";

const SearchBar: React.FC = () => {
  const { showAdds, setShowAdds } = useSidebarContext() as SidebarContextProps;
  const router = useRouter();

  const hideButton =
    router.pathname === "/admin/products" ||
    router.pathname === "/admin/orders" ||
    router.pathname === "/admin/order-history";

  const getButtonText = () => {
    if (router.pathname === "/admin/category") {
      return "ADD CATEGORY";
    } else if (router.pathname === "/admin/offers") {
      return "ADD OFFER";
    } else if (router.pathname === "/admin/restaurants") {
      return "ADD RESTUARANT";
    }
    return "ADD";
  };

  const getPageName = () => {
    const path = router.pathname;
    if (path === "/admin/category") {
      return "Categories";
    } else if (path === "/admin/offers") {
      return "Offers";
    } else if (path === "/admin/restaurants") {
      return "Restaurants";
    } else if (path === "/admin/products") {
      return "Products";
    } else if (path === "/admin/orders") {
      return "Orders";
    } else if (path === "/admin/order-history") {
      return "Order History";
    }

    return "Page";
  };

  return (
    <>
      <div className=" px-[2%] py-[0.5%] my-[5%] md:mb-[3%] md:mt-[0%] bg-[#27283C]  rounded-[14px] flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-[#C7C7C7] font-medium text-xl mb-2 md:mb-0">
          {getPageName()}
        </h1>
        <div className="flex flex-col items-center md:flex-row  ">
          <div className="flex mr-0 md:mr-10">
            <select
              id="category"
              className=" w-[225px] sm:[325px] md:w-[150px] my-3 px-3 py-2 rounded-[14px] bg-inputBg text-[#dddcdc]  font-medium font-roboto"
            >
              <option value="">Category Type</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          {!hideButton && (
            <button
              className="bg-loginBtn text-[#FFF] font-roboto font-bold  w-[225px] sm:[325px] md:w-[150px] py-3 mb-4 md:my-0 shadow-shadow3 rounded-[14px] text-[12px] hover:opacity-75 transition-all duration-500"
              onClick={() => setShowAdds(!showAdds)}
            >
              {getButtonText()}
            </button>
          )}
        </div>
        <SideForElements />
      </div>
    </>
  );
};

export default SearchBar;

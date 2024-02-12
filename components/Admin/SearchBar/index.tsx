import React from "react";
import SideForElements from "../Sidebar/SideForElemnts";
import { useRouter } from "next/router";
import {
  RestaurantPostDataType,
  SidebarContextProps,
} from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { CategoryPostDataType } from "../../../interfaces/index";
import { getCategory, getRestaurant } from "../../../services/index";
import { useQuery } from "react-query";
import { QUERIES } from "../../../constant/Queries";
import { ROUTER } from "../../../shared/constant/router";
import { useTranslation } from "next-i18next";

const SearchBar: React.FC = () => {
  const {
    showAdds,
    setShowAdds,
    selectedRestaurant,
    setSelectedRestaurant,
    selectedCategory,
    setSelectedCategory,
    setNewImg,
  } = useSidebarContext() as SidebarContextProps;
  const { pathname, push } = useRouter();
  const { t } = useTranslation("common");
  const handleOpenModal = () => {
    setNewImg(null);
  };
  const { data: categoriesData } = useQuery(QUERIES.Categories, getCategory);
  const { data: restaurantData } = useQuery(QUERIES.Restaurants, getRestaurant);
  const hideButton =
    pathname === ROUTER.ADMIN_PRODUCTS ||
    pathname === ROUTER.ADMIN_ORDERS ||
    pathname === ROUTER.ADMIN_HISTORY;

  const categorySelect = pathname === ROUTER.ADMIN_RESTAURANTS;
  const restaurantSelect = pathname === ROUTER.ADMIN_PRODUCTS;
  const orderBtn = pathname === ROUTER.ADMIN_ORDERS;
  const historyBtn = pathname === ROUTER.ADMIN_ORDER_HISTORY;

  const getButtonText = () => {
    if (pathname === ROUTER.ADMIN_CATEGORY) {
      return t("ADD CATEGORY");
    } else if (pathname === ROUTER.ADMIN_OFFERS) {
      return t("ADD OFFER");
    } else if (pathname === ROUTER.ADMIN_RESTAURANTS) {
      return t("ADD RESTUARANT");
    }
    return "ADD";
  };

  const getPageName = () => {
    if (pathname === ROUTER.ADMIN_CATEGORY) {
      return t("Categories");
    } else if (pathname === ROUTER.ADMIN_OFFERS) {
      return t("Offers");
    } else if (pathname === ROUTER.ADMIN_RESTAURANTS) {
      return t("Restaurants");
    } else if (pathname === ROUTER.ADMIN_PRODUCTS) {
      return t("Products");
    } else if (pathname === ROUTER.ADMIN_ORDERS) {
      return t("Orders");
    } else if (pathname === ROUTER.ADMIN_HISTORY) {
      return t("History");
    }
    return "Page";
  };

  return (
    <>
      <div className=" px-[2%] py-3 my-[5%] md:mb-[3%] md:mt-[0%] bg-[#27283C]  rounded-[14px] flex flex-col items-center justify-between md:flex-row font-body tracking-wide">
        <h1 className="text-[#C7C7C7] font-medium text-xl mb-2 md:mb-0">
          {getPageName()}
        </h1>
        <div className="flex flex-col items-center md:flex-row  ">
          {categorySelect && (
            <div className="flex mr-0 md:mr-10">
              <select
                id="category"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className=" w-[225px] sm:[325px] md:w-[150px] my-3  p-2  rounded-[14px] bg-inputBg text-[#dddcdc] text-sm  font-medium font-body"
              >
                <option>{t("Category Type")}</option>
                {categoriesData &&
                  categoriesData.data.result.data.map(
                    (category: CategoryPostDataType) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    )
                  )}
              </select>
            </div>
          )}

          {restaurantSelect && (
            <div className="flex mr-0 md:mr-10 ">
              <select
                id="category"
                value={selectedRestaurant || ""}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className=" w-[225px] sm:[325px] md:w-[150px] my-3 p-2 rounded-[14px] bg-inputBg text-[#dddcdc] text-sm  font-medium font-body"
              >
                <option>{t("Restaurant")}</option>
                {restaurantData &&
                  restaurantData.data.result.data.map(
                    (restaurant: RestaurantPostDataType) => (
                      <option key={restaurant.id} value={restaurant.name}>
                        {restaurant.name}
                      </option>
                    )
                  )}
              </select>
            </div>
          )}

          {orderBtn && (
            <button
              onClick={() => push(ROUTER.ADMIN_HISTORY)}
              className="bg-pink font-semibold text-white py-1 px-3 rounded-lg font-mukta hover:opacity-60 transition-all duration-500 cursor-pointer"
            >
              {t("History")}
            </button>
          )}

          {historyBtn && (
            <button
              onClick={() => push(ROUTER.ADMIN_ORDERS)}
              className="bg-pink font-semibold text-white py-1 px-3 rounded-lg font-mukta hover:opacity-60 transition-all duration-500 cursor-pointer"
            >
              {t("Orders")}
            </button>
          )}

          {!hideButton && (
            <>
              <button
                className="bg-loginBtn text-[#FFF]  font-bold  w-[225px] sm:[325px] md:w-[150px] py-3 mb-4 md:my-0 shadow-shadow3 rounded-[18px] text-[14px] hover:opacity-75 transition-all duration-500"
                onClick={() => {
                  setShowAdds(!showAdds);
                  handleOpenModal();
                }}
              >
                + {getButtonText()}
              </button>
              <SideForElements />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;

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
  const { pathname } = useRouter();
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

  const getButtonText = () => {
    if (pathname === ROUTER.ADMIN_CATEGORY) {
      return t("btnCategory");
    } else if (pathname === ROUTER.ADMIN_OFFERS) {
      return t("btnOffer");
    } else if (pathname === ROUTER.ADMIN_RESTAURANTS) {
      return t("btnRes");
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
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedCategory(selectedValue);
                  if (selectedValue === "") {
                    getCategory();
                  }
                }}
                className=" w-[225px] sm:[325px] md:w-[150px] my-3 tracking-wider py-2 px-1  rounded-[14px] bg-inputBg text-[#dddcdc] text-sm  font-medium font-poppins"
              >
                <option value="">{t("Categories")}</option>
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
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedRestaurant(selectedValue);
                  if (selectedValue === "") {
                    getRestaurant();
                  }
                }}
                className=" w-[225px] sm:[325px] md:w-[150px] my-3 px-1 py-2 font-poppins tracking-wider rounded-[14px] bg-inputBg text-[#dddcdc] text-sm  font-medium "
              >
                <option value="">{t("Restaurants")}</option>
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

          {!hideButton && (
            <>
              <button
                className="bg-loginBtn text-[#FFF]  flex justify-center items-center  font-bold  w-[270px] sm:[325px] md:w-[183px] py-[6px] mb-4 md:my-0 shadow-shadow3 rounded-[4px] md:rounded-[18px] text-[14px] hover:opacity-75 transition-all duration-500"
                onClick={() => {
                  setShowAdds(!showAdds);
                  handleOpenModal();
                }}
              >
                <span className="text-xl mt-[1px] mr-2 md:mr-1">+</span>{" "}
                <span className="tracking-wide">{getButtonText()}</span>
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

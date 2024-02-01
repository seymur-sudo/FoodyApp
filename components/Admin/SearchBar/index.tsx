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

const SearchBar: React.FC = () => {
  const {
    showAdds,
    setShowAdds,
    selectedRestaurant,
    setSelectedRestaurant,
    selectedCategory,
    setSelectedCategory,
  } = useSidebarContext() as SidebarContextProps;
  const { pathname } = useRouter();

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
      return "ADD CATEGORY";
    } else if (pathname === ROUTER.ADMIN_OFFERS) {
      return "ADD OFFER";
    } else if (pathname === ROUTER.ADMIN_RESTAURANTS) {
      return "ADD RESTUARANT";
    }
    return "ADD";
  };

  const getPageName = () => {
    if (pathname === ROUTER.ADMIN_CATEGORY) {
      return "Categories";
    } else if (pathname === ROUTER.ADMIN_OFFERS) {
      return "Offers";
    } else if (pathname === ROUTER.ADMIN_RESTAURANTS) {
      return "Restaurants";
    } else if (pathname === ROUTER.ADMIN_PRODUCTS) {
      return "Products";
    } else if (pathname === ROUTER.ADMIN_ORDERS) {
      return "Orders";
    } else if (pathname === ROUTER.ADMIN_HISTORY) {
      return "Order History";
    }
    return "Page";
  };

  return (
    <>
      <div className=" px-[2%] py-3 my-[5%] md:mb-[3%] md:mt-[0%] bg-[#27283C]  rounded-[14px] flex flex-col items-center justify-between md:flex-row">
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
                className=" w-[225px] sm:[325px] md:w-[150px] my-3 px-3 py-2 rounded-[14px] bg-inputBg text-[#dddcdc]  font-medium font-roboto"
              >
                <option value="">Category Type</option>
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
            <div className="flex mr-0 md:mr-10">
              <select
                id="category"
                value={selectedRestaurant || ""}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className=" w-[225px] sm:[325px] md:w-[150px] my-3 px-3 py-2 rounded-[14px] bg-inputBg text-[#dddcdc]  font-medium font-roboto"
              >
                <option value="">Restaurant</option>
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
                className="bg-loginBtn text-[#FFF] font-roboto font-bold  w-[225px] sm:[325px] md:w-[150px] py-3 mb-4 md:my-0 shadow-shadow3 rounded-[14px] text-[12px] hover:opacity-75 transition-all duration-500"
                onClick={() => setShowAdds(!showAdds)}
              >
                {getButtonText()}
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

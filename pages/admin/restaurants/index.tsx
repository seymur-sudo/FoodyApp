import React from "react";
import Layout from "@/components/Admin/Layout";
import RestaurantCard from "@/components/Admin/RestaurantCard";
import SearchBar from "@/components/Admin/SearchBar";
import { RestaurantPostDataType } from "../../../interfaces/index";
import { useQuery } from "react-query";
import { getRestaurant } from "@/services/index";
import { QUERIES } from "../../../constant/Queries";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import usePagination from "@/components/Admin/Pagination/Pagination";
import PaginationControls from "@/components/Admin/Pagination/PaginationControls";

const Restaurant: React.FC = () => {
  const { selectedCategory } = useSidebarContext() as SidebarContextProps;
  const { data, isLoading, isError } = useQuery(
    QUERIES.Restaurants,
    getRestaurant
  );

  const { currentPage, currentData, totalPages, nextPage, prevPage, goToPage } =
    usePagination(data?.data.result.data, 5);

  if (isLoading || isError) {
    return (
      <Layout>
        <div className="px-12 md:px-6 h-screen">
          <SearchBar />
        </div>
      </Layout>
    );
  }
  const filteredData =
    selectedCategory !== "" && selectedCategory !== null
      ? currentData.filter((restaurant: RestaurantPostDataType) => {
          return restaurant.category_id === selectedCategory;
        })
      : currentData;

  return (
    <Layout>
      <div className="px-12 md:px-6 h-screen">
        <SearchBar />
        <div className="flex gap-4 sm:gap-6 justify-around sm:justify-start mx-auto flex-wrap ">
          {filteredData &&
            filteredData.map((restaurant: RestaurantPostDataType) => (
              <RestaurantCard
                key={(restaurant.id ?? "").toString()}
                id={(restaurant.id ?? "").toString()}
                restaurant={restaurant}
              />
            ))}
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        />
      </div>
    </Layout>
  );
};

export default Restaurant;

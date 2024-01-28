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

const Restaurant: React.FC = () => {
  const { selectedCategory } = useSidebarContext() as SidebarContextProps;
  const { data, isLoading, isError } = useQuery(
    QUERIES.Restaurants,
    getRestaurant
  );

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
  selectedCategory !== null
    ? data?.data.result.data.filter((restaurant: RestaurantPostDataType) => {
        console.log("Checking restaurant", restaurant);
        return restaurant.category_id === selectedCategory;
      })
    : data?.data.result.data;


  console.log("selectedCategory", selectedCategory);

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
      </div>
    </Layout>
  );
};

export default Restaurant;

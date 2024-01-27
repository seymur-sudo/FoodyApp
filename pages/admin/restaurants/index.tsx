import React from "react";
import Layout from "@/components/Admin/Layout";
import RestaurantCard from "@/components/Admin/RestaurantCard";
import SearchBar from "@/components/Admin/SearchBar";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "@/interfaces/index";
import { RestaurantPostDataType } from "../../../interfaces/index";
import { useQuery } from "react-query";
import { getRestaurant } from "@/services/index";
const Restaurant: React.FC = () => {

  const { data, isLoading, isError } = useQuery("restuarants", getRestaurant, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
    <Layout>
      <div className="px-12 md:px-6 h-screen">
        <SearchBar />
        
      </div>
    </Layout>)
  }

  if (isError) {
    return(
      <Layout>
        <div className="px-12 md:px-6 h-screen">
          <SearchBar />
          
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className="px-12 md:px-6 h-screen">
        <SearchBar />
        <div className="flex  gap-4 sm:gap-10 justify-around sm:justify-start mx-auto flex-wrap ">
          {data &&
            data.data.result.data.map((restaurant: RestaurantPostDataType) => (
              <RestaurantCard
                key={(restaurant.id?? '').toString()}
                id={(restaurant.id?? '').toString()}
                restaurant={restaurant}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;

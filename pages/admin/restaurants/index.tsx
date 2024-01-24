import React from "react";
import Layout from "@/components/Admin/Layout";
import RestaurantCard from "@/components/Admin/RestaurantCard";
import SearchBar from "@/components/Admin/SearchBar";
import EditModal from "@/components/Admin/Modals/EditModal";
import { RestaurantPostDataType } from "../../../interfaces/index";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { useQuery } from "react-query";
import { getRestaurant } from "../../../services/index";
const Restaurant: React.FC = () => {
  const { data, isLoading, isError } = useQuery("restaurants", getRestaurant, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }
  return (
    <Layout>
      <div className="px-12 md:px-6 h-screen">
        <SearchBar />
        <div className="flex  gap-4 sm:gap-10 justify-around sm:justify-start mx-auto flex-wrap ">
          {data &&
            data.data.result.data.map((restaurant: RestaurantPostDataType) => (
              <RestaurantCard
                key={restaurant.id.toString()}
                restaurant={restaurant}
              />
            ))}
        </div>
        <EditModal />
        <DeleteModal />
      </div>
    </Layout>
  );
};

export default Restaurant;

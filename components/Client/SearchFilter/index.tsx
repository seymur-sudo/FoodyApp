import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { getRestaurant } from "@/services/index";
import { useQuery } from "react-query";
import { ROUTER } from "../../../shared/constant/router";
import { RestaurantPostDataType } from "@/interfaces";
import { QUERIES } from "../../../constant/Queries";
import { useRouter } from "next/router";
import Image from "next/image";
import papa from "../../../public/svgs/papa.svg";

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<RestaurantPostDataType[]>(
    []
  );
  const { data } = useQuery(QUERIES.Restaurants, getRestaurant);
  const restaurants = data?.data.result.data;
  const { push } = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredRestaurants = (restaurants || []).filter(
      (restaurant: RestaurantPostDataType) =>
        restaurant.name?.toLowerCase().includes(term.toLowerCase()) ||
        restaurant.cuisine?.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredRestaurants);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target as Node)
    ) {
      setSearchResults([]);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative ">
        <input
          className="h-6 w-28  md:h-11 px-3 md:px-6 md:w-max rounded-[10px]"
          placeholder="Search Restaurant..."
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
        />

        {searchResults.length > 0 && (
          <div
            ref={resultsRef}
            className="absolute left-[-100px] top-[40px] md:top-[55px] w-[70vw] md:w-[30vw] px-2 py-5 rounded-md  bg-white dark:bg-gray-900 z-50  my-scrollable-component max-h-[40vh] md:max-h-[50vh] overflow-y-auto"
          >
            {searchResults.map((restaurant: RestaurantPostDataType) => (
              <div
                key={restaurant.id}
                onClick={() => push(`${ROUTER.RESTAURANTS}/${restaurant.id}`)}
                className="flex justify-start items-center mb-3 border-b-2 p-3 border-gray-100 dark:border-cyan-200"
              >
                <Image
                  src={restaurant.img_url ? restaurant.img_url : papa}
                  alt={`restaurant ${restaurant.name}`}
                  width={100}
                  height={100}
                  className="hover:scale-105 transition-all duration-500 w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-lg  cursor-pointer object-cover mr-3 md:mr-4"
                />

                <div className="w-5/12 cursor-pointer">
                  <p className="text-black dark:text-sky-400 font-semibold text-xl">
                    {restaurant?.name?.slice(0,20)}...
                  </p>
                  <p className="text-gray-600 dark:text-cyan-400 font-medium text-lg">
                    {restaurant?.cuisine}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchFilter;

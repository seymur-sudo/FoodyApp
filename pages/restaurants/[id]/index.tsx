import React from "react";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import papa from "../../../public/svgs/papa.svg";
import pizza from "../../../public/svgs/pizza.svg";
import { LuTrash } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { animated } from "@react-spring/web";
import ProductCard from "@/components/Client/BaskerCards/BasketCard";
import BasketResCard from "@/components/Client/BaskerCards/BasketResCard";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, BasketPostDataType } from "@/interfaces";
import { IoBasketSharp } from "react-icons/io5";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import {
  getRestaurantById,
  getProduct,
  getBasket,
  addBasket,
  getUser,
} from "@/services";
import { useQuery } from "react-query";
import { QUERIES } from "../../../constant/Queries";
import { ReactQueryDevtools } from "react-query/devtools";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const ResDetail = () => {
  const {
    showUserModal,
    openUserModal,
    closeUserModal,
    modalSpring,
    showDelete,
    setshowDelete,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = router.query;

  console.log("id ", id);

  const {
    data: restaurantData,
    isLoading,
    isError,
  } = useQuery([QUERIES.SingleRestaurant, id], () =>
    getRestaurantById(id as string)
  );
  const { data: products } = useQuery(QUERIES.Products, getProduct);
  const { data: basket } = useQuery(QUERIES.Basket, getBasket);
  const { data: userID } = useQuery(QUERIES.User, getUser);

  const singleRestaurant = restaurantData?.data.result.data;
  const restaurantProducts = products?.data.result.data;
  const basketProducts = basket?.data.result.data;
  const basketProductsItems = basket?.data.result.data.items;
  console.log("basket", basketProductsItems);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (basketProduct: BasketPostDataType) => addBasket(basketProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES.Basket);
        toast.success("Product added to the basket successfully!", {
          autoClose: 1000,
        });
      },
      onError: (error) => {
        console.error("Error adding product to the basket:", error);
        toast.error("Error adding product to the basket", {
          autoClose: 1000,
        });
      },
    }
  );

  const handleAddToBasket = (productId: number | string) => {
    const basketProduct: BasketPostDataType = {
      user_id: userID?.data.user.id,
      product_id: productId,
    };
    mutation.mutate(basketProduct);
  };

  const filteredProducts = restaurantProducts?.filter(
    (product) =>
      singleRestaurant?.name &&
      product.rest_id
        .toLowerCase()
        .includes(singleRestaurant.name.toLowerCase())
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading restaurant data</p>}
      <div className="bg-white dark:bg-black ">
        <MainHeader />
        {restaurantData && singleRestaurant && (
          <div className="px-[2%]">
            <Image
              src={singleRestaurant.img_url ? singleRestaurant.img_url : papa}
              alt="papa"
              width={500}
              height={500}
              className=" w-full object-cover h-[60vh]"
            />
            <div className="bg-white dark:bg-black pt-2 md:pt-0 flex flex-col md:flex-row md:items-center md:justify-between px-4 pb-2">
              <div>
                <h1 className="capitalize  text-[#4F4F4F] dark:text-sky-400 py-2 text-[22px] font-bold">
                  {singleRestaurant?.name}
                </h1>
                <p className="capitalize  text-[#828282] dark:text-sky-300 text-[14px] font-medium">
                  {singleRestaurant?.address}
                </p>
              </div>

              <div className="flex flex-col md:flex-row  md:items-center md:justify-between w-full md:w-4/12 ">
                <div className="w-full py-5 md:py-0">
                  <h2 className="capitalize  text-[#4F4F4F] py-2 dark:text-sky-400 text-[18px] font-bold">
                    {singleRestaurant?.cuisine}
                  </h2>
                  <p className="capitalize  text-[#828282] text-[14px] dark:text-sky-300 font-medium">
                    {singleRestaurant?.category_id}
                  </p>
                </div>
                <div className="flex items-center w-full py-2">
                  <button className="  bg-white text-[#D63626] hover:opacity-75 transition-all duration-500 flex flex-col items-start justify-center  h-12  px-2 text-sm font-medium rounded-[4px] border-2 border-[#D63626]">
                    <span>$ {singleRestaurant?.delivery_price}</span>
                    <span>{t("Delivery")}</span>
                  </button>
                  <button className="  ml-[5%] bg-[#D63626] text-[#fff] hover:opacity-75 transition-all duration-500 flex  items-center capitalize h-12 px-2 text-sm font-medium rounded-[4px] border-2 border-[#D63626]">
                    <span>{t("Go Back")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="py-[3%] px-[6%] flex justify-between">
          <div className="w-full md:w-7/12 bg-[#F3F4F6] dark:bg-gray-900 flex flex-col items-center my-scrollable-component max-h-[100vh] overflow-y-auto">
            <h1 className="capitalize py-5 text-[#4F4F4F)] dark:text-cyan-400 font-bold text-[25px]">
              {t("Products")}
            </h1>
            <div className="w-full border-t-2 py-3 dark:border-sky-300">
              {products &&
                filteredProducts &&
                filteredProducts.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}

              <div
                className="flex justify-center w-full mt-[4%] md:hidden "
                onClick={openUserModal}
              >
                <div className="h-12 w-10/12 cursor-pointer hover:opacity-90 transition-all duration-500  flex items-center justify-between rounded-[100px] bg-[#D63626] dark:bg-blue-500 text-white">
                  <button className="capitalize ml-[3%] font-medium flex items-center">
                    <IoBasketSharp className=" text-3xl text-[#D63626] dark:text-cyan-50 hover:scale-110 transition-all duration-500 " />

                    <p className="text-white ml-1 dark:text-cyan-100 ">
                      3{t("items")}
                    </p>
                  </button>
                  <p className="text-[#D63626] flex  items-center px-8 text-lg font-medium h-full rounded-[80px] border-2 border-[#D63626] dark:border-blue-500 bg-white dark:bg-gray-900 dark:text-sky-200">
                    $37.19
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BASKET_MODAL */}
          {showUserModal && (
            <>
              <div className="fixed inset-0 bg-black dark:bg-gray-200 opacity-60 z-40 md:opacity-0"></div>

              <animated.div
                style={{
                  ...modalSpring,
                  position: "fixed",
                  top: "30vh",
                  left: 0,
                  right: 0,
                  zIndex: 50,
                }}
                className="bg-white dark:bg-gray-800 rounded-t-[20px] flex flex-col w-full max-h-[45vh] overflow-y-auto items-center justify-start md:hidden asideScroll"
              >
                <div className="mt-4" onClick={closeUserModal}>
                  <IoIosCloseCircleOutline
                    size={40}
                    className="text-[#BDBDBD] dark:text-sky-400  "
                  />
                </div>
                <div>
                  <BasketResCard />
                  <BasketResCard />
                  <BasketResCard />
                </div>
              </animated.div>
              <animated.div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "black",
                  zIndex: 40,
                  opacity: 0,
                }}
                onClick={closeUserModal}
              />
            </>
          )}

          <div className="hidden w-4/12 bg-[#F3F4F6] dark:bg-gray-900 md:flex flex-col items-center my-scrollable-component max-h-[60vh] overflow-y-auto">
            {basketProducts && (
              <div className="flex justify-between items-center px-2 py-3 w-full">
                <div className="flex justify-center items-center">
                  <h1 className="capitalize py-2 text-[#4F4F4F)] dark:text-cyan-400 font-bold text-[25px]"></h1>
                  <IoBasketSharp className="cursor-pointer text-3xl text-[#D63626] dark:text-cyan-300 hover:scale-110 transition-all duration-700 mx-2" />

                  <p className="capitalize  text-[#D63626]  dark:text-cyan-400 font-bold text-[16px]">
                    <span className="mr-1">
                      {basketProducts?.total_item} {t("items")}
                    </span>
                    <span className="mr-1">
                      {" "}
                      - {basketProducts?.total_count} {t("count")}
                    </span>
                  </p>
                </div>

                <div
                  className="bg-[#D63626] dark:bg-cyan-300 hover:opacity-75 hover:scale-105 transition-all duration-700 cursor-pointer mr-1 py-1 px-6 rounded-md flex items-center"
                  onClick={() => setshowDelete(!showDelete)}
                >
                  <LuTrash className="text-gray-200 dark:text-gray-900 text-xl  " />
                  <p className="capitalize font-semibold ml-2 text-gray-200 dark:text-gray-900 ">
                    clear all
                  </p>
                </div>
              </div>
            )}

            {basketProductsItems ? (
              basketProductsItems.map((product: BasketPostDataType) => (
                <div className="w-full">
                  <div className="w-full border-t-2 py-2 dark:border-sky-300">
                    <div className="flex items-center justify-around pt-1 pb-2 ">
                      <Image
                        src={product.img_url ?? pizza}
                        alt="product.name"
                        width={100}
                        height={100}
                        className=" w-[60px] h-[60px]  rounded-full  object-cover"
                      />
                      <div>
                        <h1 className="capitalize pt-2 ml-4 text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                          {product.name}
                        </h1>
                        <div className="flex  justify-center items-center ">
                          <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                            $ {product.price}
                          </span>
                          <span className="capitalize ml-2 text-[#4F4F4F] dark:text-cyan-400 text-[18px] font-medium">
                            $ {product.amount}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 text-black dark:text-cyan-300 font-medium flex flex-col items-center px-2 py-1 rounded-3xl">
                        <span
                          className="cursor-pointer"
                          onClick={() => handleAddToBasket(product.id || "")}
                        >
                          +
                        </span>
                        <span className="font-semibold"> {product.count}</span>
                        <span className="cursor-pointer">-</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-center mt-4"></div>
                  </div>
                </div>
              ))
            ) : (
              <p> no data</p>
            )}
            <div className="h-12 w-10/12 cursor-pointer hover:opacity-90 transition-all duration-500  flex items-center justify-between rounded-[100px] bg-[#D63626] dark:bg-blue-500 text-white">
              <button className="capitalize mx-[3%] font-medium flex items-center">
                {t("Checkout")}
              </button>
              {basketProducts && (
                <p className="text-[#D63626] flex  items-center px-8 text-lg font-medium h-full rounded-[80px] border-2 border-[#D63626] dark:border-blue-500 bg-white dark:bg-gray-900 dark:text-sky-200">
                  $ <span className="ml-2">{basketProducts?.total_amount}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteModal />
      <ReactQueryDevtools />
    </>
  );
};

export default ResDetail;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

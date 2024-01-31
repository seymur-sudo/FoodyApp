import React from "react";
import pizza from "../../../public/svgs/pizza.svg";
import Image from "next/image";
import { LuTrash } from "react-icons/lu";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, BasketPostDataType } from "@/interfaces";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import DeleteUserProduct from "../Deletes/DeleteUserProduct";
import { useQuery } from "react-query";
import { QUERIES } from "../../../constant/Queries";
import { ReactQueryDevtools } from "react-query/devtools";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getUser, getBasket, deleteBasket, addBasket } from "@/services";

const BasketResCard = () => {
  const { showDelete, setshowDelete, setDeletedBasket } =
    useSidebarContext() as SidebarContextProps;

  const openDeleteModal = (basketId: BasketPostDataType | null) => {
    setshowDelete(true);
    setDeletedBasket(basketId);
  };

  const { data: basket } = useQuery(QUERIES.Basket, getBasket);
  const { data: userID } = useQuery(QUERIES.User, getUser);
  const basketProducts = basket?.data.result.data;
  const basketProductsItems = basket?.data.result.data.items;

  const queryClient = useQueryClient();
  const mutationAdd = useMutation(
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

  const mutationDelete = useMutation(
    (basketProduct: BasketPostDataType) => deleteBasket(basketProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES.Basket);
        toast.success("Product count decremented successfully!", {
          autoClose: 1000,
        });
      },
      onError: (error) => {
        console.error("Error decrementing product count:", error);
        toast.error("Error decrementing product count", {
          autoClose: 1000,
        });
      },
    }
  );

  const handleBasket = (
    productId: number | string,
    action: "increment" | "decrement"
  ) => {
    const basketProduct: BasketPostDataType = {
      user_id: userID?.data.user.id,
      product_id: productId,
    };

    if (action === "increment") {
      mutationAdd.mutate(basketProduct);
    } else if (action === "decrement") {
      mutationDelete.mutate(basketProduct);
    }
  };

  return (
    <>
      <div
        className="bg-[#D63626] w-[80vw] dark:bg-cyan-300 my-3 z-10 hover:opacity-75 hover:scale-105 transition-all duration-700 cursor-pointer mr-1 py-1 px-6 rounded-md flex justify-center items-center"
        onClick={() => openDeleteModal(basketProducts.id)}
      >
        <LuTrash className="text-gray-200 dark:text-gray-900 text-xl  " />
        <p className="capitalize font-semibold ml-2 text-gray-200 dark:text-gray-900 ">
          clear all
        </p>
      </div>

      {basketProductsItems ? (
        basketProductsItems.map((product: BasketPostDataType) => (
          <div
            key={product.id}
            className="flex z-10 items-center w-[80vw] justify-around py-3 border-b-2 border-gray-300 dark:border-sky-300"
          >
            <Image
              src={product.img_url ?? pizza}
              alt="pizza"
              width={100}
              height={100}
              className=" w-[45px] h-[45px] md:w-[95px] md:h-[95px] mx-5 rounded-full  object-cover"
            />
            <div className="w-7/12 ml-4">
              <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[12px] md:text-[22px] font-medium">
                {product.name}
              </h1>
              <span className="capitalize  text-[#4F4F4F] dark:text-cyan-400 text-[12px] md:text-[18px] font-medium">
                $ {product.price}
              </span>
            </div>

            <div className="md:text-xl  bg-gray-100 dark:bg-gray-700 text-black dark:text-cyan-300 font-medium flex flex-col items-center px-2 py-1 rounded-3xl">
              <span
                className="cursor-pointer"
                onClick={() => handleBasket(product.id || "", "increment")}
              >
                +
              </span>
              <span className="font-semibold"> {product.count}</span>

              <span
                className="cursor-pointer"
                onClick={() => handleBasket(product.id || "", "decrement")}
              >
                -
              </span>
            </div>
          </div>
        ))
      ) : (
        <p> no data</p>
      )}

      <DeleteUserProduct />
    </>
  );
};

export default BasketResCard;

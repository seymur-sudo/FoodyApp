import React, { useState } from "react";
import pizza from "../../../public/svgs/pizza.svg";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { PostDataType, BasketPostDataType } from "@/interfaces";
import { QUERIES } from "../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addBasket, getUser } from "@/services";
import { useQuery } from "react-query";

type ProductCardType = {
  product: PostDataType;
};

const ProductCard: React.FC<ProductCardType> = ({ product }) => {
  const { data: userID } = useQuery(QUERIES.User, getUser);
  const [buttonClicked, setButtonClicked] = useState(false);
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

  const handleAddToBasket = () => {
    const basketProduct: BasketPostDataType = {
      user_id: userID?.data.user.id,
      product_id: product.id,
    };
    setButtonClicked(true);
    mutation.mutate(basketProduct);
  };

  return (
    <>
      <div className="flex items-center justify-evenly py-1 font-body tracking-wider border-b-2 dark:border-sky-300 px-2">
        <div className="w-6/12 flex items-center py-2">
          <Image
            src={product.img_url ? product.img_url : pizza}
            alt="pizza"
            width={100}
            height={100}
            className=" w-[57px] h-[53px] hidden md:block rounded-md mr-3 object-cover"
          />

          <div className="ml-3">
            <h1 className="capitalize text-[#4F4F4F] dark:text-cyan-400 text-[18px] md:text-[18px] font-bold">
              {product.name}
            </h1>
            <p className="capitalize  text-[#828282] dark:text-cyan-300 text-[14px] font-semibold">
              {product.description}
            </p>
          </div>
        </div>

        <div className="w-4/12 flex items-center justify-end">
          <p className=" flex items-center mr-10">
            <span className="capitalize mr-2 hidden md:block text-[#828282] dark:text-cyan-300 text-[14px] font-semibold">
              from
            </span>
            <span className="capitalize mr-5 md:mr-0  text-[#4F4F4F] dark:text-cyan-400 md:text-[18px] font-semibold">
              $ {product.price}
            </span>
          </p>

          <div
            className={`${
              buttonClicked
                ? "bg-green-400 dark:bg-cyan-400"
                : "bg-gray-300 dark:bg-gray-400"
            } dark:bg-cyan-300 h-10 w-10  rounded-full flex items-center justify-center hover:opacity-75 transition-all duration-500 cursor-pointer`}
            onClick={handleAddToBasket}
          >
            <FaPlus
              className={`text-xl ${
                buttonClicked
                  ? "text-gray-100 dark:text-gray-900"
                  : "text-gray-100 dark:text-gray-900"
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

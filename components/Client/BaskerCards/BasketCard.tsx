import React from "react";
import pizza from "../../../public/svgs/pizza.svg";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { PostDataType, BasketStateType } from "@/interfaces";
import { QUERIES } from "../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { addBasket } from "@/services";

type ProductCardType = {
  product: PostDataType;
};

const ProductCard: React.FC<ProductCardType> = ({ product }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (basketProduct: BasketStateType) => addBasket(basketProduct),
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
    const basketProduct: BasketStateType = {
      total_item: 1,
      created: Date.now(),
      total_amount: product.price,
      total_count: 1,
      items: [product],
    };
    mutation.mutate(basketProduct);
  };

  return (
    <>
      <div className="flex items-center justify-evenly py-6 px-2  border-b-2 dark:border-sky-300">
        <Image
          src={product.img_url ? product.img_url : pizza}
          alt="pizza"
          width={100}
          height={100}
          className=" w-[57px] h-[57px] hidden md:block rounded-full mr-3 object-cover"
        />
        <div className="w-3/12">
          <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[15px] md:text-[18px] font-medium">
            {product.name}
          </h1>
          <p className="capitalize py-2 text-[#828282] dark:text-cyan-300 text-[14px] font-medium">
            {product.description}
          </p>
        </div>

        <p className="w-4/12">
          <span className="capitalize  hidden md:block text-[#828282] dark:text-cyan-300 text-[14px] font-medium">
            {product.rest_id}
          </span>
          <span className="capitalize mr-5 md:mr-0  text-[#4F4F4F] dark:text-cyan-400 md:text-[18px] font-medium">
            $ {product.price}
          </span>
        </p>

        <div
          className="bg-green-400 dark:bg-cyan-300 h-14 w-14 rounded-full flex items-center justify-center hover:opacity-75 transition-all duration-500 cursor-pointer"
          onClick={handleAddToBasket}
        >
          <FaPlus className="text-4xl text-gray-200 dark:text-gray-900" />
        </div>
      </div>
    </>
  );
};

export default ProductCard;

import React, { useEffect } from "react";
import pizza from "../../../public/svgs/pizza.svg";
import plus from "../../../public/svgs/plus.svg";
import Image from "next/image";
import { PostDataType } from "@/interfaces";
import AOS from "aos";
import "aos/dist/aos.css";

type ProductCardType = {
  product: PostDataType;
};

const ProductCard: React.FC<ProductCardType> = ({ product }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <div
        className="flex items-center justify-evenly py-6 px-2  border-b-2 dark:border-sky-300"
        data-aos="fade-up"
        data-aos-delay={150}
      >
        <Image
          src={product.img_url ? product.img_url : pizza}
          alt="pizza"
          width={100}
          height={100}
          className=" w-[57px] h-[57px] hidden md:block rounded-full  object-cover"
        />
        <div>
          <h1 className="capitalize pt-2 text-[#4F4F4F] dark:text-cyan-400 text-[15px] md:text-[18px] font-medium">
            {product.name}
          </h1>
          <p className="capitalize py-2 text-[#828282] dark:text-cyan-300 text-[14px] font-medium">
            {product.description}
          </p>
        </div>

        <p>
          <span className="capitalize  hidden md:block text-[#828282] dark:text-cyan-300 text-[14px] font-medium">
            {product.rest_id}
          </span>
          <span className="capitalize mr-5 md:mr-0  text-[#4F4F4F] dark:text-cyan-400 md:text-[18px] font-medium">
            $ {product.price}
          </span>
        </p>

        <Image
          src={plus}
          alt="plus"
          width={100}
          height={100}
          className="w-[32px] h-[32px] md:w-[52px] md:h-[52px] rounded-full bg-green-500  object-cover"
        />
      </div>
    </>
  );
};

export default ProductCard;

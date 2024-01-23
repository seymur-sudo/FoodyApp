import React from "react";
import Layout from "@/components/Admin/Layout";
import pizzaImg from "../../../public/svgs/pizza.svg";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete.svg";
import Image from "next/image";
import SearchBar from "@/components/Admin/SearchBar";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { getProduct } from "../../../services/index";
import { PostDataType } from "../../../interfaces/index";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const Products: React.FC = () => {
  const { showDelete, setshowDelete, openModal,openDeleteModal } =
    useSidebarContext() as SidebarContextProps;

  const { data, isLoading, isError } = useQuery("products", getProduct, {
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
      <>
        <div className="px-12 md:px-6 pb-8 bg-bgc ">
          <SearchBar />

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {data &&
              data.data.result.data.map((product: PostDataType) => (
                <div
                  key={product.id}
                  className="bg-indigo-100 shadow-shadow2   font-roboto font-medium rounded-md hover:scale-110 transition-all duration-700"
                >
                  <div className="capitalize flex flex-col items-center md:items-start w-full ">
                    <Image
                      src={product.img_url ? product.img_url : pizzaImg}
                      alt={product.name}
                      width={500}
                      height={200}
                      className="hover:scale-105 transition-all duration-500 w-full  h-[200px] object-cover"
                    />
                    <h1 className="text-[#1E1E30] text-[24px] md:text-[18px] mt-3 mb-2 px-1">
                      {product.name}
                    </h1>
                    <p className="text-[#6e6e7e] text-xl md:text-sm px-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center px-1 py-5">
                    <p className="text-[#00B2A9] text-lg">${product.price}</p>
                    <div className="flex items-center ">
                      <Image
                        src={editIcon}
                        alt="edit"
                        onClick={() => openModal(product)}
                        className="mr-1 cursor-pointer hover:scale-125 transition-all duration-500 "
                      />
                      <Image
                        src={deleteIcon}
                        alt="delete"
                        onClick={() => openDeleteModal(product)}
                        className="cursor-pointer hover:scale-125 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <EditModal />
        <DeleteModal />
        <ReactQueryDevtools />
      </>
    </Layout>
  );
};

export default Products;
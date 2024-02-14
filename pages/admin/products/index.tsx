import React, { useEffect, useState } from "react";
import Layout from "@/components/Admin/Layout";
import pizzaImg from "../../../public/svgs/pizza.svg";
import editIcon from "../../../public/svgs/edit.svg";
import deleteIcon from "../../../public/svgs/delete.svg";
import Image from "next/image";
import Head from "next/head";
import LoadingImg from "../../../public/loadingImg.gif";
import SearchBar from "@/components/Admin/SearchBar";
import EditModal from "@/components/Admin/Modals/EditModal";
import DeleteModal from "@/components/Admin/Modals/DeleteModal";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { getProduct } from "../../../services/index";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QUERIES } from "../../../constant/Queries";
import { PostDataType } from "../../../interfaces/index";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const Products: React.FC = () => {
  const {
    setShow,
    setshowDelete,
    selectedRestaurant,
    setEditedItem,
    setDeletedItem,
    isAdmin,
  } = useSidebarContext() as SidebarContextProps;
  const { t } = useTranslation("common");
  const [showCount, setShowCount] = useState<number>(4);

  const openModal = (product: PostDataType | null) => {
    setShow(true);
    setEditedItem(product);
  };

  const openDeleteModal = (product: PostDataType | null) => {
    setshowDelete(true);
    setDeletedItem(product);
  };

  const { data, isLoading, isError } = useQuery(QUERIES.Products, getProduct);
  const productsData = data?.data.result.data;

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }
  const handleShowMore = () => {
    setShowCount((prevCount) => prevCount + 4);
  };
  const filteredData =
    selectedRestaurant !== "" && selectedRestaurant !== null
      ? productsData?.filter((product: PostDataType) => {
          return product.rest_id === selectedRestaurant;
        })
      : productsData;
  return (
    <>
      {isAdmin ? (
        <>
          <Head>
            <title>Admin |{t("Products")} </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Layout>
            <>
              <div className="px-12 pb-8 md:pr-1  bg-bgc min-h-screen  ">
                <SearchBar />

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-1 font-body tracking-wide">
                  {filteredData &&
                    filteredData
                      .slice(0, showCount)
                      .map((product: PostDataType, index: number) => (
                        <div
                          key={product.id}
                          className="bg-indigo-50 shadow-shadow2  font-mutka font-medium rounded-md hover:scale-110 transition-all duration-700"
                          data-aos="fade-right"
                          data-aos-delay={(index + 1) * 150}
                        >
                          <div className="capitalize flex flex-col items-center md:items-start w-full ">
                            <Image
                              src={product.img_url ? product.img_url : pizzaImg}
                              alt={product.name}
                              width={500}
                              height={200}
                              className="hover:scale-105 transition-all duration-500 w-full  h-[200px] object-cover"
                            />
                            <h1 className="text-[#1E1E30] font-semibold text-[24px] md:text-[18px] mt-3 mb-2 px-3">
                              {product.name}
                            </h1>

                            <p className="text-[#6e6e7e] text-xl md:text-sm px-3">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center px-3 py-5">
                            <p className="text-[#00B2A9] text-lg">
                              ${product.price}
                            </p>
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
                {filteredData?.length && filteredData?.length > showCount && (
                  <div className="text-center pt-10 md:pt-20 pb-5 ">
                    <button
                      className="text-stone-300 text-3xl md:text-2xl font-poppins font-medium tracking-widest rounded hover:text-stone-400 transition-all duration-700 hover:scale-105 "
                      onClick={handleShowMore}
                    >
                      {t("Show More")}...
                    </button>
                  </div>
                )}
              </div>

              <EditModal />
              <DeleteModal />
              <ReactQueryDevtools />
            </>
          </Layout>
        </>
      ) : (
        <Image
          alt="NotFound"
          height={1000}
          width={1000}
          className="h-screen w-screen"
          src={LoadingImg}
        />
      )}
    </>
  );
};

export default Products;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

import React, { useRef, useState } from "react";
import UserAside from "../../../components/Client/UserAside/index";
import MainHeader from "../../../components/Client/MainHeader/index";
import { BsDot } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { OrderPostDataType } from "../../../interfaces/index";
import { useMutation, useQueryClient } from "react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps, BasketPostDataType } from "@/interfaces";
import { useQuery } from "react-query";
import EmptyBasket from "../../../public/svgs/emptyBasket.svg";
import Image from "next/image";
import { addOrder, getUser } from "@/services";
import { toast } from "react-toastify";
import { QUERIES } from "../../../constant/Queries";
import { FaCheck } from "react-icons/fa6";
import { isValidPhone } from "@/constant/ValidRegex";
import MainFooter from "@/components/Client/MainFooter";

const UserCheckout = () => {
  const { data: userD, isLoading, isError } = useQuery(QUERIES.User, getUser);
  const { basketProducts, basketProductsItems } =
    useSidebarContext() as SidebarContextProps;
  const [orderAdded, setOrderAdded] = useState<boolean>(false);
  const { t } = useTranslation("common");
  const orderBill: OrderPostDataType = {
    basket_id: "",
    delivery_address: "",
    contact: "",
    payment_method: "",
  };
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const radioRef0 = useRef<HTMLInputElement>(null);
  const radioRef1 = useRef<HTMLInputElement>(null);

  const [radioSelect, setRadioSelect] = useState<number | null>(null);
  const [newOrder, setNewOrder] = useState<OrderPostDataType>(orderBill);

  const queryClient = useQueryClient();
  const mutation = useMutation(() => addOrder(newOrder), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Basket);
      setTimeout(() => {}, 1100);
      toast.success("Order added successfully!", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error("Error added Order:", error);
      toast.error("Error added Order", {
        autoClose: 1000,
      });
    },
  });
  const handleCheckRadio = () => {
    if (radioRef1.current && radioRef1.current.checked) {
      setRadioSelect(+radioRef1.current.id);
    } else if (radioRef0.current && radioRef0.current.checked) {
      setRadioSelect(+radioRef0.current.id);
    } else {
      setRadioSelect(null);
    }
  };
  const handleAddOrder = () => {
    const phoneValue = phoneRef.current?.value;

    if (phoneValue && !isValidPhone(phoneValue)) {
      toast.error("Please enter a valid phone number", { autoClose: 1500 });
      return;
    }

    handleCheckRadio();

    const selectedPaymentMethod =
      radioRef1.current && radioRef1.current.checked
        ? "Pay at the door"
        : radioRef0.current && radioRef0.current.checked
        ? "By Credit Card"
        : "";

    setNewOrder({
      basket_id: basketProducts?.id,
      delivery_address: addressRef.current?.value,
      contact: phoneRef.current?.value,
      payment_method: selectedPaymentMethod,
    });

    setTimeout(() => {
      if (basketProductsItems?.length === 0) {
        toast.error("Please add items to your basket before placing an order", {
          autoClose: 1000,
        });
      } else if (
        addressRef.current?.value.trim() === "" ||
        phoneRef.current?.value.trim() === "" ||
        selectedPaymentMethod === ""
      ) {
        if (addressRef.current?.value.trim() === "") {
          toast.error("Please enter the address", {
            autoClose: 1000,
          });
        }
        if (phoneRef.current?.value.trim() === "") {
          toast.error("Please enter the contact number", {
            autoClose: 1000,
          });
        }
        if (selectedPaymentMethod === "") {
          toast.error("Please select the payment method", {
            autoClose: 1000,
          });
        }
      } else {
        mutation.mutate();
        setOrderAdded(true);
      }
    }, 100);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      <MainHeader />
      <div className="flex flex-col items-center  md:flex-row md:items-start  md:justify-evenly pt-8 pb-32">
        <UserAside />

        {!orderAdded ? (
          <div className="w-10/12 md:w-5/12 py-3 rounded-md bg-[#F3F4F6] dark:bg-gray-900 flex flex-wrap justify-evenly pt-2 pb-3 ">
            <h1 className="capitalize text-[#4F4F4F] dark:text-green-300 text-[30px] font-bold my-3 w-10/12 justify-self-start ">
              {t("Checkout")}
            </h1>
            <div className="flex flex-col    w-10/12">
              <label className="text-[#4F4F4F] dark:text-green-300 text-lg font-mukta mb-[6px] font-semibold">
                {t("Delivery Address")}
              </label>
              <input
                type="text"
                defaultValue={userD ? userD.data.user.address : ""}
                ref={addressRef}
                placeholder={t("Delivery Address")}
                className="py-3 px-4 text-xl font-mukta font-semibold tracking-wide text-[#828282] bg-white dark:bg-black  dark:text-white rounded-[4px]"
              />
            </div>
            <div className="flex flex-col my-5  w-10/12">
              <label className="text-[#4F4F4F] dark:text-green-300 mb-[6px] text-lg font-mukta font-semibold">
                {t("Contact Number")}
              </label>
              <input
                type="text"
                ref={phoneRef}
                placeholder={t("Contact Number")}
                defaultValue={userD ? userD.data.user.phone : ""}
                className="py-3 px-4 text-xl font-semibold font-mukta tracking-wide text-[#828282] bg-white dark:bg-black  dark:text-white rounded-[4px]"
              />
            </div>

            <div className="flex flex-col my-2 mr-5 w-10/12">
              <label className="capitalize text-xl text-[#4F4F4F] dark:text-green-300 font-bold mx-4 mb-1 ">
                {t("Payment Method")}
              </label>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    data-ripple-dark="true"
                  >
                    <input
                      name="type"
                      type="radio"
                      ref={radioRef1}
                      defaultChecked 
                      className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border-2 border-green-500 text-green-600 duration-500  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                      id="1"
                    />
                    <span className="absolute text-green-600 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <BsDot
                        size={80}
                        className="text-green-600 daek:text-green-300"
                      />
                    </span>
                  </label>
                  <label
                    htmlFor="1"
                    className="  text-green-600 dark:text-green-300 font-semibold cursor-pointer select-none"
                  >
                    {t("Pay at the door")}
                  </label>
                </div>

                <div className="inline-flex items-center">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                    <input
                      name="type"
                      type="radio"
                      ref={radioRef0}
                      className="before:content[''] peer relative h-8 w-8 cursor-pointer duration-500 appearance-none rounded-full border-2 border-green-500 text-green-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-green-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                      id="0"
                    />
                    <span className="absolute text-green-700 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <BsDot
                        size={80}
                        className="text-green-600 daek:text-green-300"
                      />
                    </span>
                  </label>
                  <label
                    htmlFor="0"
                    className=" font-semibold text-green-600 dark:text-green-300 cursor-pointer select-none"
                  >
                    {t("By Credit Card")}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col py-5 w-10/12">
              <button
                onClick={handleAddOrder}
                className="capitalize py-2 px-4 bg-[#6FCF97] font-bold text-lg text-white dark:text-gray-900 rounded-[4px] hover:bg-[#54ff9b]  transition-all duration-500 cursor-pointer  "
              >
                {t("Send")}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-10/12 md:w-8/12 py-3 rounded-md bg-[#F3F4F6] dark:bg-gray-900 flex flex-col justify-center items-center min-h-[65vh]">
            <div className="flex  justify-center items-center bg-green-600 dark:bg-green-300 text-white dark:text-gray-800 rounded-full h-[200px] w-[200px]">
              <FaCheck className="text-[150px]" />
            </div>

            <p className="text-black dark:text-green-300  text-xl md:text-3xl font-bold mt-7">
              {t("Your order has been received")}
            </p>
          </div>
        )}

        {!orderAdded ? (
          <div className="w-10/12 md:w-[28%] mt-[5%] md:mt-[0%] rounded-md capitalize text-[#828282)] px-6 py-3 dark:text-green-300 bg-[#F3F4F6] dark:bg-gray-900  asideScroll max-h-[45vh] overflow-y-auto">
            <div>
              <h1 className=" font-body font-semibold text-[#828282]  text-xl text-center py-3">
                {t("Your Order")}
              </h1>

              <div className="max-h-[25vh] min-h-[25vh] my-scrollable-component  overflow-y-auto">
                {basketProductsItems && basketProductsItems.length > 0 ? (
                  basketProductsItems.map((product: BasketPostDataType) => (
                    <ul className="py-2 w-full text-[#828282]" key={product.id}>
                      <li className="text-[14px] my-1">
                        <span className="text-lg font-medium font-poppins flex justify-between items-center w-full">
                          <span className="w-[90%]">
                            <span>{product.count}</span>
                            <span >
                              <span className="mx-[6px]">x</span>
                              {product.name}
                            </span>
                          </span>

                          <span className="flex items-center w-[10%]">
                            <span className="mr-[3px] text-[18px]">$</span>
                            <span >{product.amount}</span>
                          </span>
                        </span>
                      </li>
                    </ul>
                  ))
                ) : (
                  <div className=" flex items-center   flex-col  justify-center  pb-4 text-[#BDBDBD] dark:text-green-300">
                    <div>
                      <Image
                        src={EmptyBasket}
                        alt="EmptyBasket"
                        width={100}
                        height={100}
                        className=" object-cover w-[125px] h-[100px]"
                      />
                    </div>
                    <p className="capitalize font-bold  flex flex-col text-[#828282] dark:text-green-300 items-center pb-3 ">
                      <span>oops !</span> <span>{t("basket is empty")}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t-2  font-poppins border-t-gray-400 dark:border-t-green-400 py-5 px-2 flex justify-between">
                <p className="font-medium text-[#828282]  dark:text-green-300 text-[18px]">
                  {t("Total")}
                </p>
                {basketProducts && (
                  <p className="font-semibold ml-12 text-[#828282] dark:text-green-300 ">
                    $ {basketProducts?.total_amount}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <MainFooter />

    </div>

  );
};

export default UserCheckout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});

import React from "react";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import hiw from '../../public/svgs/howitworks.svg'
import MainFooter from "@/components/Client/MainFooter";
const How_It_Works = () => {
  return (
    <div className="h-screen">
        <MainHeader/>
        <p className="text-[45px] dark:text-white mt-18 font-semibold text-center">How it works</p>
        <p className="text-center text-[#828282] font-medium text-[20px] mx-4 sm:mx-[220px]">Delivery may be extended during sale periods. Please refer to the checkout page for an updated estimate for your location. Kindly note that once you have placed an order, it is no longer possible to modify your order. Taxes and duties are included in all product prices.It is possible to place an order with shipment to a different address than your home or billing address when paying with a credit card. Please note that Klarna payments require that your order is shipped to your registered home address.</p>
        <div className="relative mt-36 mb-36 flex justify-center">
            <div className="sm:w-[400px] h-[480px] w-[280px] rounded-[100px] top-[-100px] absolute sm:rotate-[-260deg] bg-[#FFB64F] sm:h-[900px]">

            </div>
            <Image className="z-20 sm:w-[628px] w-[292px] duration-500 hover:scale-110" alt="" src={hiw}/>
        </div>
        <MainFooter/>
    </div>
  )
}
export default How_It_Works;
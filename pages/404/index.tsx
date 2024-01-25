import React from "react";
import MainHeader from "@/components/Client/MainHeader";
import Image from "next/image";
import notFound from "../../public/svgs/notFound.svg"
import MainFooter from "@/components/Client/MainFooter";
const NotFound = () => {
  return (
    <div className="h-screen">
        <MainHeader/>
        <div className="pl-[30px] pr-[37px] pt-4 pb-[60px]">
        <Image  alt="" src={notFound}/>
        </div>
        <MainFooter/>
    </div>
  )
}
export default NotFound;
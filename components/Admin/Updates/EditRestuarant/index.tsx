import React from "react";
import Image from "next/image";
import uploadImg from '../../../../public/svgs/upload.svg'
import { useSidebarContext } from "@/contexts/SidebarContext";
import { SidebarContextProps } from "../../../../interfaces/index";

const EditRestuarant: React.FC = () => {
  const {setLastData,lastData, show, closeModal } = useSidebarContext() as SidebarContextProps;

  return (
    <>
      {show && (
        <div className=" text-gray1 font-body leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> edit restuarant</h1>
              <p className="capitalize text-lg">upload your restaurant image</p>
              <div className="h-[15vh] w-3/4 bg-emerald-800 my-4">image</div>
              <p className=" text-lg">
                Edit your restuarant description and necesarry information
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div >
                <h1 className="capitalize text-3xl mb-[5%]"> Edit Restaurant</h1>
                <p className="capitalize text-xl">upload your restaurant image</p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  show ? "" : "opacity-0 pointer-events-none "
                }`}
                onClick={closeModal}
              >
                <span className="text-[#F2F2F2] text-3xl cursor-pointer z-50 mb-[6px]">
                  x
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full rounded-[14px]  bg-[#43445A]  cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
              Edit your Restaurant description and necesarry information
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="my-5 flex flex-col">
                <label className="mb-1">Cuisine:</label>

                <textarea
                  className="w-full h-[100px]  rounded-[14px] bg-inputBg leading-10 resize-y"
                  rows={4}
                  cols={50}
                  
                />
              </div>

              <div className="mb-5 flex flex-col">
                <label className="mb-1">Delivery Price</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="mb-5 flex flex-col">
                <label className="mb-1">Delivery Min</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Address</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="mb-1">
                  Category:
                </label>
                <select
                  id="category"
                  className="w-full p-3 rounded-[14px] bg-inputBg"
                >
                  <option value="">Select...</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-around md:justify-between">
          <button
            className="capitalize rounded-[14px] 	border-color: [#38394E] border-solid  border-0 bg-[#43445A] shadow-shadow1 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px] "
            onClick={closeModal}
          >
            cancel
          </button>
          <button className="capitalize rounded-[14px] 	border-color:[#970e79] border-solid  border-0 bg-[#C035A2] shadow-shadow2 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px]">
            update restaurant
          </button>
        </div>
      </div>
      )}
    </>
  );
};

export default EditRestuarant;

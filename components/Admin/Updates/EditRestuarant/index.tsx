import React, { useEffect,useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {updateRestaurant } from "@/services/index";
import uploadImg from '@/public/svgs/upload.svg'
import { fileStorage } from "@/server/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { QUERIES } from "@/constant/Queries";
import { useMutation, useQueryClient } from "react-query";
import { FirstStateType } from "@/interfaces/index";
import {RestaurantPostDataType} from "@/interfaces/index"
import { SidebarContextProps } from "@/interfaces/index";

const EditRestuarant: React.FC = () => {
  const {setLastData,newImg,setNewImg, selectedFile,setSelectedFile,lastData, show, closeModal } = useSidebarContext() as SidebarContextProps;
  // const [isChanged,setIsChanged]=useState<boolean>(false)
  const nameRef=useRef<HTMLInputElement>(null);
  const cuisineRef=useRef<HTMLTextAreaElement>(null);
  const deliveryPriceRef=useRef<HTMLInputElement>(null);
  const deliveryMinuteRef=useRef<HTMLInputElement>(null);
  const addressRef=useRef<HTMLInputElement>(null);
  const categoryRef=useRef<HTMLSelectElement>(null);


  const editState: RestaurantPostDataType = {
    name: lastData?.name,
    category_id: lastData?.category_id,
    img_url: newImg,
    cuisine: lastData?.cuisine,
    address: lastData?.address,
    delivery_min: lastData?.delivery_min,
    delivery_price: lastData?.delivery_price,
  };

  const [edtRestaurant,setEdtRestaurant]=useState<RestaurantPostDataType>(editState)
  const handleNewImg = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file){
      setSelectedFile(file);
      setNewImg(URL.createObjectURL(file));
      const restaurantId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 1000
      )}`
      const imageRef = ref(fileStorage, `images/${file.name + restaurantId}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              setEdtRestaurant((prevRest) => ({
                ...prevRest,
                img_url: downloadURL,
              }));
              console.log("Dosyanın Firebase Storage URL'si: ", downloadURL);
            })
            .catch((error) => {
              console.error("Download URL alınırken bir hata oluştu: ", error);
            });
        })
        .catch((error) => {
          console.error("Dosya yüklenirken bir hata oluştu: ", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  const handleEditRestaurant=()=>{
    setEdtRestaurant({
      name: nameRef.current?.value,
      category_id: categoryRef.current?.value,
      img_url: newImg,
      cuisine: cuisineRef.current?.value,
      address: addressRef.current?.value,
      delivery_min: Number(deliveryMinuteRef.current?.value),
      delivery_price: Number(deliveryPriceRef.current?.value),
    })
    setTimeout(() => {
      mutation.mutate()
    }, 100);
  }
  const handleChange=( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    
  }
  const handleClose=()=>{
    closeModal()
    setLastData(null)
  }
  const queryClient=useQueryClient()
  const mutation = useMutation(() =>updateRestaurant(edtRestaurant,lastData?.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Restaurants);
      // setEdtRestaurant(firstState);
      setTimeout(() => {
        closeModal();
        setLastData(null)
        setNewImg(null)
      }, 1000);
      toast.success("Restaurant edited successfully!", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error("Error added Restaurant:", error);
      toast.error("Error edited Restaurant", {
        autoClose: 1000,
      });
    },
  });
  return (
    <>
      {show && (
        <div className=" text-gray1 font-body leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> edit restuarant</h1>
              <p className="capitalize text-lg">upload your restaurant image</p>
              <div className="h-[50vh] w-3/4 my-4">
                  <Image
                  width={300}
                  height={300}
                  src={newImg||uploadImg}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-[14px]"
                />
              </div>
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
                onClick={handleClose}
              >
                <span className="text-[#F2F2F2] text-3xl cursor-pointer z-50 mb-[6px]">
                  x
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4 md:mb-8 h-[20%]  w-full rounded-[14px] bg-[#43445A]">
              <label
                htmlFor="edit-rest-file"
                className="flex flex-col items-center justify-center w-full rounded-[14px]  bg-[#43445A]  cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                </div>
                <input
                  name="img_url"
                  id="edit-rest-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleNewImg(e)}
                />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
              Edit your Restaurant description and necesarry information
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">Name</label>
                <input
                  defaultValue={lastData?.name}
                  ref={nameRef}
                  // name="name"
                  // value={edtRestaurant.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="my-5 flex flex-col">
                <label className="mb-1">Cuisine:</label>

                <textarea
                  defaultValue={lastData?.cuisine}
                  ref={cuisineRef}
                  // name="cuisine"
                  // value={edtRestaurant.cuisine}
                  onChange={handleChange}
                  className="w-full h-[100px]  rounded-[14px] bg-inputBg leading-10 resize-y"
                  rows={4}
                  cols={50}
                  
                />
              </div>

              <div className="mb-5 flex flex-col">
                <label className="mb-1">Delivery Price</label>
                <input
                  defaultValue={lastData?.delivery_price}
                  ref={deliveryPriceRef}
                  // name="delivery_price"
                  // value={edtRestaurant.cuisine}
                  onChange={handleChange}
                  type="number"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="mb-5 flex flex-col">
                <label className="mb-1">Delivery Min</label>
                <input
                  type="number"
                  ref={deliveryMinuteRef}
                  // name="delivery_min"
                  // value={edtRestaurant.delivery_min}
                  onChange={handleChange}
                  defaultValue={lastData?.delivery_min}
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Address</label>
                <input
                  type="text"
                  ref={addressRef}
                  // name="address"
                  // value={edtRestaurant.address}
                  onChange={handleChange}
                  defaultValue={lastData?.address}
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="mb-1">
                  Category:
                </label>
                <select
                  id="category"
                  ref={categoryRef}
                  // name="categoryry_id"
                  // value={edtRestaurant.category_id}
                  onChange={handleChange}
                  defaultValue={lastData?.category_id}
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
          <button onClick={handleEditRestaurant} className="capitalize rounded-[14px] 	border-color:[#970e79] border-solid  border-0 bg-[#C035A2] shadow-shadow2 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px]">
            update restaurant
          </button>
        </div>
      </div>
      )}
    </>
  );
};

export default EditRestuarant;

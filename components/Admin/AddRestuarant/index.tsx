import React, { useState } from "react";
import Image from "next/image";
import uploadImg from "../../../public/svgs/upload.svg";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../interfaces/index";
import { FirstStateType } from "../../../interfaces/index";
import { fileStorage } from "../../../server/configs/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addRestaurant } from "../../../services/index";
import { toast } from "react-toastify";
import { QUERIES } from "../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";

const AddRestuarant: React.FC = () => {
  const firstState: FirstStateType = {
    name: "",
    category_id: 0,
    img_url: "",
    cuisine: "",
    address: "",
    delivery_min: 0,
    delivery_price: 0,
  };
  const {
    showAdds,
    closeAddsModal,
    selectedFile,
    setSelectedFile,
    addProductImg,
    setAddProductImg,
  } = useSidebarContext() as SidebarContextProps;
  const [newRestaurant, setNewRestaurant] =
    useState<FirstStateType>(firstState);

  // const [currentFile, setCurrentFile] = useState<File | null>(null);
  // const [addRestaurantImg, setAddRestaurantImg] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const mutation = useMutation(() => addRestaurant(newRestaurant), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Restaurants);
      setNewRestaurant(firstState);
      setTimeout(() => {
        closeAddsModal();
      }, 1000);
      toast.success("Restaurant added successfully!", {
        autoClose: 1000,
      });
    },
    onError: (error) => {
      console.error("Error added Restaurant:", error);
      toast.error("Error added Restaurant", {
        autoClose: 1000,
      });
    },
  });
  // const isValid = (): boolean => {
  //   return Object.values(newRestaurant).every((value) => value !== "");
  // };
  const handleAddRestaurant = async () => {
    // if (isValid()) {
    mutation.mutate();
    // } else {
    //   toast.error("Please fill in all fields before creating the product", {
    //     autoClose: 1000,
    //   });
    // }
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const parsedValue =
      name === ("delivery_price" || name === "delivery_min")
        ? parseFloat(value)
        : value;

    setNewRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: parsedValue,
    }));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      setAddProductImg(URL.createObjectURL(file));
      console.log("File yuklendi" + addProductImg);

      const restaurantId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 1000
      )}`;
      const storageRef = ref(
        fileStorage,
        `restaurants/${restaurantId}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file", {
            autoClose: 1000,
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewRestaurant((prevProduct) => ({
              ...prevProduct,
              img_url: downloadURL,
            }));
          });
        }
      );
    }
  };

  console.log("currentFileRes", setSelectedFile);
  return (
    <>
      <div className=" text-gray1 font-body leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> add restuarant</h1>
              <p className="capitalize text-lg">upload your restaurant image</p>
              <div className="h-[50vh] w-3/4 my-4">
                <Image
                  width={300}
                  height={300}
                  src={addProductImg || uploadImg}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-[14px]"
                />
              </div>
              <p className=" text-lg">
                Add your restuarant description and necesarry information
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]"> add Restaurant</h1>
                <p className="capitalize text-xl">
                  upload your restaurant image
                </p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  showAdds ? "" : "opacity-0 pointer-events-none "
                }`}
                onClick={closeAddsModal}
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
                <input
                  name="img_url"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
              Add your Restaurant description and necesarry information
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  value={newRestaurant.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-5 flex flex-col">
                <label className="mb-1">Cuisine:</label>

                <input
                  className="w-full h-[100px]  rounded-[14px] bg-inputBg leading-10 resize-y"
                  name="cuisine"
                  value={newRestaurant.cuisine}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-5 flex flex-col">
                <label className="mb-1">Delivery Price</label>
                <input
                  type="number"
                  name="delivery_price"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  value={newRestaurant.delivery_price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-5 flex flex-col">
                <label className="mb-1">Delivery Min</label>
                <input
                  type="number"
                  name="delivery_min"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  value={newRestaurant.delivery_min}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  value={newRestaurant.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex mt-2 flex-col">
                <label htmlFor="category" className="mb-1">
                  Category:
                </label>
                <select
                  id="category"
                  name="category_id"
                  className="w-full p-3 rounded-[14px] bg-inputBg"
                  value={newRestaurant.category_id}
                  onChange={handleInputChange}
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
            onClick={closeAddsModal}
          >
            cancel
          </button>
          <button
            // className={`capitalize rounded-[14px] border-solid border-0 shadow-shadow1 transition-all duration-500 w-5/12 py-3 md:py-4 text-lg font-bold leading-5 tracking-[0.25px]
            // ${
            //   !isValid()
            //     ? "bg-[#5a6874] cursor-not-allowed"
            //     : "bg-[#C035A2] hover:opacity-75"
            // }`}
            // disabled={!isValid()}
            onClick={handleAddRestaurant}
          >
            {mutation.isLoading
              ? "restaurant is creating"
              : "create restaurant"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddRestuarant;

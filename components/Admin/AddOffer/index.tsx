import React, { useState, useRef } from "react";
import Image from "next/image";
import uploadImg from "../../../public/svgs/upload.svg";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import {
  OfferPostDataType,
  SidebarContextProps,
} from "../../../interfaces/index";
import { fileStorage } from "../../../server/configs/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addOffer } from "../../../services/index";
import { toast } from "react-toastify";
import { QUERIES } from "../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";
import { FadeLoader } from "react-spinners";

const AddOffer: React.FC = () => {
  const firstOfferState: OfferPostDataType = {
    name: "",
    description: "",
    img_url: "",
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptioneRef = useRef<HTMLTextAreaElement>(null);
  const { showAdds, setSelectedFile, newImg, setNewImg, closeAddsModal } =
    useSidebarContext() as SidebarContextProps;
  const [newOffer, setNewOffer] = useState<OfferPostDataType>(firstOfferState);
  const queryClient = useQueryClient();

  const isValid = (): boolean => {
    return Object.values(newOffer).every((value) => value !== "");
  };
  const handleNewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewImg(URL.createObjectURL(file));
      const restaurantId = `${new Date().getTime()}_${Math.floor(
        Math.random() * 1000
      )}`;
      const imageRef = ref(fileStorage, `images/${file.name + restaurantId}`);
      uploadBytes(imageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              setNewOffer((prevOffer) => ({
                ...prevOffer,
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
  const zeroValue = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    } else if (descriptioneRef.current) {
      descriptioneRef.current.value = "";
    }
  };
  const handleChange = () => {
    setNewOffer({
      name: nameRef.current?.value,
      description: descriptioneRef.current?.value,
      img_url: newImg,
    });
  };
  const mutation = useMutation(() => addOffer(newOffer), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Offers);
      setNewOffer(firstOfferState);
      setTimeout(() => {
        closeAddsModal();
        zeroValue();
        setNewImg(null);
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

  const handleClose = () => {
    zeroValue();
    closeAddsModal();
  };
  const handleAddOffer = () => {
    mutation.mutate();
  };

  return (
    <>
      <div className=" text-gray1 font-body  leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> add offer</h1>
              <p className="capitalize text-lg">upload your offer image</p>
              <div className="h-[50vh] w-3/4 my-4">
                <Image
                  width={300}
                  height={300}
                  src={newImg || uploadImg}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-[14px]"
                />
              </div>
              <p className=" text-lg">Add your offer information</p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]"> add offer</h1>
                <p className="capitalize text-xl">upload your offer image</p>
              </div>

              <div
                className={`flex  mb-8  justify-center z-50 items-center bg-[#EC5CF8] w-10 h-10 rounded-full transition-all duration-500 ${
                  showAdds ? "" : "opacity-0 pointer-events-none "
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
                htmlFor="offer-add-file"
                className="flex flex-col items-center justify-center w-full rounded-[14px]  bg-[#43445A]  cursor-pointer  "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                  <Image width={75} height={75} src={uploadImg} alt="upload" />
                </div>
                <input
                  id="offer-add-file"
                  onChange={(e) => {
                    handleNewImg(e);
                  }}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <p className=" block md:hidden text-xl mt-[5%]">
              Add your offer information
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  ref={nameRef}
                  onChange={handleChange}
                  className="w-full p-2 py-6 rounded-[14px] bg-inputBg"
                />
              </div>
              <div className="my-5 flex flex-col">
                <label className="mb-1">Description:</label>

                <textarea
                  className="w-full pl-2 h-[125px]  rounded-[14px] bg-inputBg leading-10 resize-y"
                  ref={descriptioneRef}
                  rows={4}
                  onChange={handleChange}
                  cols={50}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-[10%] flex justify-around md:justify-between">
          <button
            className="capitalize rounded-[14px] 	border-color: [#38394E] border-solid  border-0 bg-[#43445A] shadow-shadow1 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px] "
            onClick={handleClose}
          >
            cancel
          </button>
          <button
            className={`capitalize rounded-[14px] border-solid border-0 shadow-shadow1 transition-all duration-500 w-5/12 py-3 md:py-4 text-lg font-bold leading-5 tracking-[0.25px]
            ${
              !isValid()
                ? "bg-[#5a6874] cursor-not-allowed"
                : "bg-[#C035A2] hover:opacity-75"
            }
            `}
            disabled={!isValid()}
            onClick={handleAddOffer}
          >
            {mutation.isLoading ? (
              <div className="flex justify-center items-center mx-0 my-auto">
                <FadeLoader className="w-[15px] h-[15px]" color={"#fff"} />
              </div>
            ) : (
              "Add Offer"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddOffer;

import React, { useState, useEffect } from "react";
import Image from "next/image";
import uploadImg from "../../../../public/svgs/upload.svg";
import { useSidebarContext } from "../../../../contexts/SidebarContext";
import { SidebarContextProps } from "../../../../interfaces/index";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { QUERIES } from "../../../../constant/Queries";
import { editProduct } from "../../../../services/index";
import useFileHandling from "../../../../helpers/uploadFile";

const EditProduct: React.FC = () => {
  const {
    show,
    closeModal,
    editedItem,
    selectedFile,
    setSelectedFile,
    addProductImg,
    setAddProductImg,
  } = useSidebarContext() as SidebarContextProps;

  const [editedProduct, setEditedProduct] = useState(editedItem);
  const { uploadedFile, handleFileChange } = useFileHandling();

  const queryClient = useQueryClient();

  const editProductMutation = useMutation(editProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Products);
      toast.success("Product edited successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        closeModal();
      }, 1000);
    },
    onError: (error) => {
      toast.error(`Error editing product: ${error}`, {
        autoClose: 1000,
      });
    },
  });

  const handleEditProduct = async () => {
    if (editedProduct) {
      await editProductMutation.mutateAsync(editedProduct);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const parsedValue = name === "price" ? parseFloat(value) : value;
    setEditedProduct((prevProduct) => ({
      ...prevProduct!,
      [name]: parsedValue,
    }));
  };

  useEffect(() => {
    setEditedProduct(editedItem);
    setAddProductImg(editedItem?.img_url || null);
  }, [editedItem]);

  const handleFileChangeWrapper = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && editedProduct) {
      console.log("Before Setting img_url:", editedProduct.img_url);

      setSelectedFile(file);
      setAddProductImg(URL.createObjectURL(file));

      handleFileChange(
        file,
        (downloadURL) => {
          setEditedProduct((prevProduct) => ({
            ...prevProduct!,
            img_url: downloadURL,
          }));
          console.log("After Setting img_url:", downloadURL);
        },
        (error) => {
          console.error("Error handling file change:", error);
        }
      );
    }
  };

  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];

  //   if (file && editedProduct) {
  //     setSelectedFile(file);
  //     setAddProductImg(URL.createObjectURL(file));

  //     const productId = `${new Date().getTime()}_${Math.floor(
  //       Math.random() * 1000
  //     )}`;
  //     const storageRef = ref(fileStorage, `products/${productId}/${file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       (error) => {
  //         console.error("Error uploading file:", error);
  //         toast.error("Error uploading file", {
  //           autoClose: 1000,
  //         });
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setEditedProduct((prevProduct) => ({
  //             ...prevProduct!,
  //             img_url: downloadURL,
  //           }));
  //         });
  //       }
  //     );
  //   }
  // };
  console.log("addProductImg",addProductImg);
  console.log("EDIT", uploadedFile);

  return (
    <>
      <div className=" text-gray1 font-body leading-6 tracking-wide py-8 md:pt-10  md:pb-6">
        <div className="flex justify-center">
          <div className="hidden md:block  w-1/3 mr-[5%] font-medium">
            <div className="flex flex-col justify-center ">
              <h1 className="capitalize text-2xl mb-2"> Edit product</h1>
              <p className="capitalize text-lg">upload your product image</p>
              <div className="h-[50vh] w-3/4  my-4">
                <Image
                  width={300}
                  height={300}
                  src={addProductImg || uploadImg}
                  alt="uploaded"
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>

              <p className=" text-lg">
                Edit your Product description and necesarry information
              </p>
            </div>
          </div>

          <div className="w-full  md:w-2/3 flex justify-center flex-col md:mt-[9.2%]">
            <div className="mb-5 flex justify-between items-center md:hidden">
              <div>
                <h1 className="capitalize text-3xl mb-[5%]"> Edit product</h1>
                <p className="capitalize text-xl">upload your product image</p>
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
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChangeWrapper}
                />
              </label>
            </div>

            <p className=" block md:hidden text-md mt-[5%]">
              Edit your Product description and necesarry information
            </p>

            <div className="flex flex-col bg-[#43445A] rounded-[14px] mt-4 md:mt-12 p-6">
              <div className="flex flex-col">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  name="name"
                  value={editedProduct?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-5 flex flex-col">
                <label className="mb-1">Description:</label>

                <input
                  className="w-full h-[100px] px-2 rounded-[14px] bg-inputBg leading-10 resize-y"
                  name="description"
                  value={editedProduct?.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-5 flex flex-col">
                <label className="mb-1">Price</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-[14px] bg-inputBg"
                  name="price"
                  value={editedProduct?.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="category" className="mb-1">
                  Select Category:
                </label>
                <select
                  id="category"
                  className="w-full p-3 rounded-[14px] bg-inputBg"
                  name="rest_id"
                  value={editedProduct?.rest_id}
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
            onClick={closeModal}
          >
            cancel
          </button>
          <button
            className="capitalize rounded-[14px] 	border-color:[#970e79] border-solid  border-0 bg-[#C035A2] shadow-shadow2 hover:opacity-75 transition-all duration-500 w-5/12 py-3 md:py-4 text-[#fff] text-lg font-bold leading-5 tracking-[0.25px]"
            onClick={handleEditProduct}
          >
            {editProductMutation.isLoading
              ? "product is editing"
              : "edit product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;

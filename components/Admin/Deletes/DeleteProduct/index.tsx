import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SidebarContextProps } from "../../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { deleteProduct } from "../../../../services/index";
import { toast } from "react-toastify";
import { QUERIES } from "../../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";

const DeleteProduct = () => {
  const { showDelete, closeDeleteModal, deletedItem } =
    useSidebarContext() as SidebarContextProps;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProduct, // (userId) => DeleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES.Products);
      closeDeleteModal();
      toast.success("Product deleted successfully!", {
        autoClose: 1000,
      });
    },
  });

  return (
    <>
      <Transition appear show={showDelete} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeDeleteModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md py-8 px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <h1 className="text-lg font-medium leading-6 text-gray-900">
                  <p className="text-xl text-black font-bold text-center">
                    Are you sure {deletedItem && deletedItem.name} ? deleted?
                  </p>
                </h1>
                <div className="mt-2 py-2  text-gray-600 text-center">
                  <p>
                    Attention if you delete this <br />{" "}
                    {deletedItem && deletedItem.name} it will not come back
                  </p>
                </div>

                <div className="flex flex-col">
                  <button
                    className="inline-flex justify-center px-4 py-2 mt-5  text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-500"
                    onClick={() => {
                      if (deletedItem?.id) {
                        mutation.mutate(deletedItem?.id);
                      }
                    }}
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading
                      ? "Product is Deleting..."
                      : "Delete Product"}
                  </button>

                  <button
                    className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-gray-700  bg-gray-100  border-2 border-gray-400 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-500"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteProduct;

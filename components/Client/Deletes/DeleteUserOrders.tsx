import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SidebarContextProps } from "../../../interfaces/index";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { deleteOrder } from "../../../services/index";
import { toast } from "react-toastify";
import { QUERIES } from "../../../constant/Queries";
import { useMutation, useQueryClient } from "react-query";

const DeleteUserOrder = () => {
  const { showDelete, closeDeleteModal, deletedOrder } =
    useSidebarContext() as SidebarContextProps;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      console.log("Delete Order Success:", data);

      queryClient.invalidateQueries(QUERIES.UserOrder);
      closeDeleteModal();
      toast.success("Order deleted successfully!", {
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
                    Are you sure ORDER{" "}
                    {deletedOrder && deletedOrder?.customer_id.slice(0, 5)}{" "}
                    deleted?
                  </p>
                </h1>
                <div className="mt-2 py-2  text-gray-600 text-center">
                  <p>
                    Attention if you delete this <br />{" "}
                    {deletedOrder && deletedOrder?.customer_id.slice(0, 5)} it
                    will not come back ?
                  </p>
                </div>

                <div className="flex flex-col">
                  <button
                    className="inline-flex justify-center px-4 py-2 mt-5  text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-500"
                    onClick={() => {
                      if (deletedOrder?.id) {
                        mutation.mutate(deletedOrder?.id);
                      }
                    }}
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading
                      ? "Order is Deleting..."
                      : "Delete Order"}
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

export default DeleteUserOrder;

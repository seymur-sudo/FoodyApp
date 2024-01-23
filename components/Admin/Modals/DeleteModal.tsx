import React from "react";
import { useRouter } from "next/router";
import DeleteProduct from "../Deletes/DeleteProduct";
import DeleteCategory from "../Deletes/DeleteCategory";
import DeleteHistory from "../Deletes/DeleteHistory";
import DeleteOffer from "../Deletes/DeleteOffer";
import DeleteOrder from "../Deletes/DeleteOrder";
import DeleteRestuarant from "../Deletes/DeleteRestuarant";
import DeleteUserOrder from "@/components/Client/Deletes/DeleteUserOrders";
import DeleteUserBasket from "@/components/Client/Deletes/DeleteUserProduct";

const DeleteModal: React.FC = () => {
  const router = useRouter();

  const getDeleteModal = () => {
    if (router.pathname === "/admin/restaurants") {
      return <DeleteRestuarant />;
    } else if (router.pathname === "/admin/category") {
      return <DeleteCategory />;
    } else if (router.pathname === "/admin/offers") {
      return <DeleteOffer />;
    } else if (router.pathname === "/admin/products") {
      return <DeleteProduct />;
    } else if (router.pathname === "/admin/order-history") {
      return <DeleteHistory />;
    } else if (router.pathname === "/admin/orders") {
      return <DeleteOrder />;
    } else if (router.pathname === "/user/orders") {
      return <DeleteUserOrder />;
    }
    else if (router.pathname === "/user/basket") {
      return <DeleteUserBasket />;
    }
    return null;
  };

  return <>{getDeleteModal()}</>;
};

export default DeleteModal;

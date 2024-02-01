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
import DeleteUserProduct from "@/components/Client/Deletes/DeleteUserProduct";
import { ROUTER } from "../../../shared/constant/router";

const DeleteModal: React.FC = () => {
  const router = useRouter();

  const getDeleteModal = () => {
    if (router.pathname === ROUTER.ADMIN_RESTAURANTS) {
      return <DeleteRestuarant />;
    } else if (router.pathname === ROUTER.ADMIN_CATEGORY) {
      return <DeleteCategory />;
    } else if (router.pathname === ROUTER.ADMIN_OFFERS) {
      return <DeleteOffer />;
    } else if (router.pathname === ROUTER.ADMIN_PRODUCTS) {
      return <DeleteProduct />;
    } else if (router.pathname === ROUTER.ADMIN_HISTORY) {
      return <DeleteHistory />;
    } else if (router.pathname === ROUTER.ADMIN_ORDERS) {
      return <DeleteOrder />;
    } else if (router.pathname === ROUTER.USER_ORDERS) {
      return <DeleteUserOrder />;
    } else if (router.pathname === ROUTER.USER_BASKET) {
      return <DeleteUserProduct />;
    } else if (router.pathname === `${ROUTER.USER_RESTAURANTS}/[id]`) {
      return <DeleteUserBasket />;
    }
    return null;
  };

  return <>{getDeleteModal()}</>;
};

export default DeleteModal;

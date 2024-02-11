import { createContext, useContext, useState, useEffect } from "react";
import {
  SidebarContextProps,
  ChildrenNode,
  PostDataType,
  RestaurantPostDataType,
  CategoryPostDataType,
  OfferPostDataType,
  BasketPostDataType,
  OrderPostDataType,
} from "../interfaces/index";
import { useSpring } from "@react-spring/web";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getUser, getBasket, deleteBasket, addBasket } from "@/services";
import { QUERIES } from "../constant/Queries";

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

const defaultEditedProduct: PostDataType = {
  id: "",
  name: "",
  description: "",
  price: 0,
  img_url: "",
  rest_id: "",
};

const defaultEditedCategory: CategoryPostDataType = {
  id: "",
  name: "",
  img_url: "",
};

const defaultOrder: OrderPostDataType = {
  basket_id: "",
  delivery_address: "",
  contact: "",
  payment_method: "",
  id: "",
  customer_id: "",
  created: "",
  amount: 0,
};

export const SidebarContextProvider: React.FC<ChildrenNode> = ({
  children,
}) => {
  const { data: basket } = useQuery(QUERIES.Basket, getBasket);
  const { data: userID } = useQuery(QUERIES.User, getUser);
  const userEmail = userID?.data.user.email;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    setIsAdmin(userEmail === "admin@gmail.com");
  }, [userID]);

  const basketProducts = basket?.data.result.data;
  const basketProductsItems = basket?.data.result.data.items;

  const queryClient = useQueryClient();
  const mutationAdd = useMutation(
    (basketProduct: BasketPostDataType) => addBasket(basketProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES.Basket);
        toast.success("Product added to the basket successfully!", {
          autoClose: 1000,
        });
      },
      onError: (error) => {
        console.error("Error adding product to the basket:", error);
        toast.error("Error adding product to the basket", {
          autoClose: 1000,
        });
      },
    }
  );

  const mutationDelete = useMutation(
    (basketProduct: BasketPostDataType) => deleteBasket(basketProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES.Basket);
        toast.success("Product count decremented successfully!", {
          autoClose: 1000,
        });
      },
      onError: (error) => {
        console.error("Error decrementing product count:", error);
        toast.error("Error decrementing product count", {
          autoClose: 1000,
        });
      },
    }
  );

  const handleBasket = (
    productId: number | string,
    action: "increment" | "decrement"
  ) => {
    const basketProduct: BasketPostDataType = {
      user_id: userID?.data.user.id,
      product_id: productId,
    };

    if (action === "increment") {
      mutationAdd.mutate(basketProduct);
    } else if (action === "decrement") {
      mutationDelete.mutate(basketProduct);
    }
  };

  const isBasketEmpty = !basketProducts || basketProducts.total_item === 0;

  const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);
  const closeNavbar = () => setNavbarOpen(false);

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const closeSidebar = () => {
    setSidebarOpen(false);
    setNewImg(null);
  };

  const [showAdds, setShowAdds] = useState<boolean>(false);
  const closeAddsModal = () => {
    setShowAdds(false);
    setNewImg(null);
  };

  const [editedItem, setEditedItem] = useState<PostDataType | null>(
    defaultEditedProduct
  );
  const [deletedItem, setDeletedItem] = useState<PostDataType | null>(
    defaultEditedProduct
  );

  const [editedCategory, setEditedCategory] =
    useState<CategoryPostDataType | null>(defaultEditedCategory);
  const [deletedCategory, setDeletedCategory] =
    useState<CategoryPostDataType | null>(defaultEditedCategory);

  const [show, setShow] = useState<boolean>(false);
  const [showDelete, setshowDelete] = useState<boolean>(false);

  const [deletedBasket, setDeletedBasket] = useState<BasketPostDataType | null>(
    null
  );

  const closeModal = () => {
    setShow(false);
  };

  const closeDeleteModal = () => {
    setshowDelete(false);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newImg, setNewImg] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);

  const openUserModal = () => {
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setNewImg(null);
  };

  const modalSpring = useSpring({
    opacity: showUserModal ? 1 : 0,
    transform: `translateY(${showUserModal ? 0 : -100}%)`,
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserModal && target.classList.contains("bg-black")) {
        closeUserModal();
      }
    };
    if (showUserModal) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showUserModal]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [lastData, setLastData] = useState<RestaurantPostDataType | null>(null);
  const [lastOffer, setLastOffer] = useState<OfferPostDataType | null>(null);

  const [userImg, setUserImg] = useState<string | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<OrderPostDataType | null>(
    defaultOrder
  );
  const [deletedOrder, setDeletedOrder] = useState<OrderPostDataType | null>(
    defaultOrder
  );

  const contextValue = {
    selectedOrder,
    setSelectedOrder,
    deletedOrder,
    setDeletedOrder,
    isBasketEmpty,
    handleBasket,
    basketProducts,
    basketProductsItems,
    isNavbarOpen,
    setNavbarOpen,
    closeNavbar,
    isSidebarOpen,
    setSidebarOpen,
    closeSidebar,
    show,
    lastData,
    setLastData,
    lastOffer,
    setLastOffer,
    newImg,
    setNewImg,
    setShow,
    closeModal,
    showAdds,
    setShowAdds,
    closeAddsModal,
    showDelete,
    setshowDelete,
    closeDeleteModal,
    editedItem,
    userImg,
    setUserImg,
    setEditedItem,
    deletedItem,
    setDeletedItem,
    selectedFile,
    setSelectedFile,
    showUserModal,
    setShowUserModal,
    openUserModal,
    closeUserModal,
    modalSpring,
    editedCategory,
    setEditedCategory,
    deletedCategory,
    setDeletedCategory,
    selectedCategory,
    setSelectedCategory,
    selectedRestaurant,
    setSelectedRestaurant,
    deletedBasket,
    setDeletedBasket,
    isAdmin,
  };

  const Component = SidebarContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

export const useSidebarContext = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("ERROR");
  }
  return context;
};

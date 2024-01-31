import { createContext, useContext, useState, useEffect } from "react";
import {
  SidebarContextProps,
  ChildrenNode,
  PostDataType,
  RestaurantPostDataType,
  CategoryPostDataType,
  OfferPostDataType,
  BasketPostDataType,
} from "../interfaces/index";
import { useSpring } from "@react-spring/web";

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

export const SidebarContextProvider: React.FC<ChildrenNode> = ({
  children,
}) => {
  const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);
  const closeNavbar = () => setNavbarOpen(false);

  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const closeSidebar = () => setSidebarOpen(false);

  const [showAdds, setShowAdds] = useState<boolean>(false);
  const closeAddsModal = () => setShowAdds(false);

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
    // setEditedItem(null);
  };

  const closeDeleteModal = () => {
    setshowDelete(false);
    // setDeletedItem(null);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [newImg, setNewImg] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);

  const openUserModal = () => {
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
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

  const contextValue = {
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

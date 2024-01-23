import { createContext, useContext, useState, useEffect } from "react";
import {
  SidebarContextProps,
  ChildrenNode,
  PostDataType,
} from "../interfaces/index";
import { useSpring, animated } from "@react-spring/web";

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

  const [show, setShow] = useState<boolean>(false);
  const openModal = (product: PostDataType | null) => {
    setShow(true);
    setEditedItem(product);
  };
  const closeModal = () => {
    setShow(false);
    setEditedItem(null);
  };
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const openDeleteModal = (product: PostDataType | null) => {
    setshowDelete(true);
    setDeletedItem(product);
  };
  const closeDeleteModal = () => {
    setshowDelete(false);
    setDeletedItem(null);
  };



  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [addProductImg, setAddProductImg] = useState<string | null>(null);

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

  const contextValue = {
    isNavbarOpen,
    setNavbarOpen,
    closeNavbar,
    isSidebarOpen,
    setSidebarOpen,
    closeSidebar,
    show,
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
    openModal,
    deletedItem,
    setDeletedItem,
    openDeleteModal,
    selectedFile,
    setSelectedFile,
    addProductImg,
    setAddProductImg,
    showUserModal,
    setShowUserModal,
    openUserModal,
    closeUserModal,
    modalSpring,
  };

  const Component = SidebarContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

export const useSidebarContext = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};

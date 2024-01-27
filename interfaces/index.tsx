import React, { ReactNode } from "react";
import { SpringValue } from "@react-spring/web";
export interface ChildrenNode {
  children: ReactNode;
}

export interface SidebarContextProps {
  isNavbarOpen: boolean;
  isSidebarOpen: boolean;
  setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeNavbar: () => void;
  closeSidebar: () => void;
  show: boolean;
  lastData: RestaurantPostDataType | null;
  setLastData: React.Dispatch<
    React.SetStateAction<RestaurantPostDataType | null>
  >;
  newImg: string | null;
  setNewImg: React.Dispatch<React.SetStateAction<string | null>>;
  showAdds: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAdds: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  closeAddsModal: () => void;
  showDelete: boolean;
  setshowDelete: React.Dispatch<React.SetStateAction<boolean>>;
  closeDeleteModal: () => void;
  editedItem: PostDataType | null;
  setEditedItem: React.Dispatch<React.SetStateAction<PostDataType | null>>;
  openModal: (product: PostDataType | null) => void;
  deletedItem: PostDataType | null;
  setDeletedItem: React.Dispatch<React.SetStateAction<PostDataType | null>>;
  openDeleteModal: (product: PostDataType | null) => void;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  openUserModal: () => void;
  closeUserModal: () => void;
  showUserModal: boolean;
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface DataItem {
  name: string;
  value: number;
}

export interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

export interface ThemeContextProps {
  toggleTheme: () => void;
}

export interface DataItems {
  name: string;
  Expense: number;
  Income: number;
}

export interface DataBubble {
  hour: string;
  index: number;
  value: number;
}

export interface PostDataType {
  id: number | string;
  name: string;
  description: string;
  price: number;
  img_url: string;
  rest_id: string;
}

export interface ApiResponse {
  result: {
    data: PostDataType[];
  };
  status: number;
  message: string;
}
export interface RestaurantPostDataType {
  id?:  number | string;
  name: string |undefined;
  category_id: number | string |undefined;
  img_url: string | null|undefined;
  cuisine: string|undefined;
  address: string|undefined;
  delivery_min: number|undefined;
  delivery_price: number|undefined;
}
export interface RestaurantApiResponse {
  result: {
    data: RestaurantPostDataType[]| FirstStateType[];
  };
  status: number;
  message: string;
}
export interface OfferPostDataType{
    name: string|null|undefined,
    description: string | null|undefined;
    img_url: string|null
}
export interface OfferApiResponse{
  result: {
    data: OfferPostDataType[];
  };
  status: number;
  message: string;
}
export interface InitialStateType extends Omit<PostDataType, "id"> {}
export interface FirstStateType extends Omit<RestaurantPostDataType, "id"> {}

export interface CategoryPostDataType {
  id: number;
  name: string;
  img_url: string | null;
}
export interface InitialCategoryState
  extends Omit<CategoryPostDataType, "id"> {}



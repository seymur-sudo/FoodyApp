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
  lastOffer: OfferPostDataType | null;
  setLastOffer: React.Dispatch<React.SetStateAction<OfferPostDataType | null>>;
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
  editedCategory: CategoryPostDataType | null;
  setEditedCategory: React.Dispatch<
    React.SetStateAction<CategoryPostDataType | null>
  >;
  deletedCategory: CategoryPostDataType | null;
  setDeletedCategory: React.Dispatch<
    React.SetStateAction<CategoryPostDataType | null>
  >;
  editedItem: PostDataType | null;
  setEditedItem: React.Dispatch<React.SetStateAction<PostDataType | null>>;
  deletedItem: PostDataType | null;
  setDeletedItem: React.Dispatch<React.SetStateAction<PostDataType | null>>;
  deletedBasket: BasketPostDataType | null;
  setDeletedBasket: React.Dispatch<
    React.SetStateAction<BasketPostDataType | null>
  >;
  openUserModal: () => void;
  closeUserModal: () => void;
  showUserModal: boolean;
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };

  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  selectedOrder: OrderPostDataType | null;
  setSelectedOrder: React.Dispatch<
    React.SetStateAction<OrderPostDataType | null>
  >;
  deletedOrder: OrderPostDataType | null;
  setDeletedOrder: React.Dispatch<
    React.SetStateAction<OrderPostDataType | null>
  >;
  selectedRestaurant: string | null;
  setSelectedRestaurant: React.Dispatch<React.SetStateAction<string | null>>;
  isBasketEmpty: boolean;
  handleBasket: (
    productId: number | string,
    action: "increment" | "decrement"
  ) => void;

  basketProducts: BasketPostDataType | null;
  basketProductsItems: BasketPostDataType[] | undefined;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

export interface PostDataType {
  id: number | string;
  name: string;
  description?: string;
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
  id?: number | string | any;
  category_id: number | string | undefined;
  img_url: string | null | undefined;
  cuisine: string | undefined;
  address: string | undefined;
  delivery_min: number | undefined;
  delivery_price: number | undefined;
  name?: string;
}
export interface RestaurantApiResponse {
  result: {
    data: RestaurantPostDataType[];
  };
  status: number;
  message: string;
}

export interface messageObj{
  recieve:string,
  send:string,
  content:string|undefined,
  time:number|null
}
export interface chatUser{
  user_id:string,
  email:string
}
export interface RestaurantSingleApiResponse {
  result: {
    data: {
      id: number | string;
      name: string | undefined;
      category_id: number | string | undefined;
      img_url: string | null | undefined;
      cuisine: string | undefined;
      address: string | undefined;
      delivery_min: number | undefined;
      delivery_price: number | undefined;
      products: PostDataType[];
    };
  };
  status: number;
  message: string;
}

export interface OfferPostDataType {
  id?: number | string | any;
  name: string;
  description: string;
  img_url: string | null;
}
export interface UserDataType {
  email: string | undefined;
  address: string | undefined;
  username: string | undefined;
  img_url: string | undefined | null;
  phone: string | null | undefined;
  fullname: string | undefined;
}
export interface OfferApiResponse {
  result: {
    data: OfferPostDataType[];
  };
  status: number;
  message: string;
}
export interface InitialStateType extends Omit<PostDataType, "id"> {}
export interface FirstStateType extends Omit<RestaurantPostDataType, "id"> {}

export interface CategoryPostDataType {
  id: number | string | any;
  name: string;
  img_url: string | null;
}
export interface InitialCategoryState
  extends Omit<CategoryPostDataType, "id"> {}

export interface CategoryApiResponse {
  result: {
    data: CategoryPostDataType[];
  };
  status: number;
  message: string;
}

export interface BasketPostDataType {
  id?: string | number | any;
  basket_id?: string | number;
  user_id: string | number;
  product_id?: string | number;
  img_url?: string | null;
  price?: number;
  name?: string;
  count?: number;
  amount?: number;
  total_count?: number;
  total_item?: number;
  total_amount?: number;
}
export interface OrderPostDataType {
  basket_id?: string;
  products?: any;
  delivery_address?: string | undefined;
  contact?: string | undefined;
  payment_method?: string | undefined;
  id?: string | number | any;
  customer_id?: string | number | any;
  created?: string;
  amount?: number;
}
export interface OrderApiResponse {
  result: {
    data: OrderPostDataType[];
  };
  status: number;
  message: string;
}

export interface orderItem {
  img_url: string | undefined;
  amount: number | undefined;
  price: number | undefined;
  name: string | undefined;
  count: number | undefined;
}

export interface FormValues {
  fullName?: string;
  userName?: string;
  email: string;
  password: string;
}

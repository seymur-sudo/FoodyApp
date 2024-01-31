import { ENDPOINTS } from "../constant/EndPoints";
import { instanceAxios } from "../helpers/instanceAxios";
import { AxiosPromise } from "axios";
import {
  ApiResponse,
  RestaurantApiResponse,
  CategoryApiResponse,
  RestaurantPostDataType,
  RestaurantSingleApiResponse,
  PostDataType,
  CategoryPostDataType,
  FirstStateType,
  InitialStateType,
  InitialCategoryState,
  OfferApiResponse,
  OfferPostDataType,
  BasketPostDataType,
} from "../interfaces/index";

// GET_PRODUCT
export const getProduct = (): AxiosPromise<ApiResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.PRODUCT });

// GET_BY_ID_PRODUCT
export const getProductById = (
  productId: string | number
): AxiosPromise<ApiResponse> =>
  instanceAxios({ method: "GET", url: `${ENDPOINTS.PRODUCT}/${productId}` });

// ADD_PRODUCT
export const addProduct: (
  newProduct: InitialStateType
) => AxiosPromise<PostDataType> = (newProduct) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.PRODUCT,
    data: newProduct,
  });
};

// EDIT_PRODUCT
export const editProduct = (
  editedProduct: PostDataType
): AxiosPromise<ApiResponse> => {
  return instanceAxios({
    method: "PUT",
    url: `${ENDPOINTS.PRODUCT}/${editedProduct.id}`,
    data: editedProduct,
  });
};

// DELETE_PRODUCT
export const deleteProduct = (
  productId: string | number
): AxiosPromise<ApiResponse> =>
  instanceAxios({ method: "DELETE", url: `${ENDPOINTS.PRODUCT}/${productId}` });

// GET_USER
export const getUser = (): AxiosPromise => {
  const accessToken = localStorage.getItem("access_token");
  return instanceAxios({
    method: "GET",
    url: ENDPOINTS.USER,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

//GET_RESTAURANT
export const getRestaurant = (): AxiosPromise<RestaurantApiResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.RESTAURANT });

//GET_RESTAURANT_BY_ID
export const getRestaurantById = (
  restaurantID: string | number
): AxiosPromise<RestaurantSingleApiResponse> =>
  instanceAxios({
    method: "GET",
    url: `${ENDPOINTS.RESTAURANT}/${restaurantID}`,
  });

// ADD_RESTAURANT
export const addRestaurant: (
  newRestaurant: FirstStateType
) => AxiosPromise<RestaurantPostDataType> = (newRestaurant) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.RESTAURANT,
    data: newRestaurant,
  });
};

//UPDATE_RESTAURANT
export const updateRestaurant = (
  newRestaurant: RestaurantPostDataType,
  restaurantID: string | number
) => {
  return instanceAxios({
    method: "PUT",
    url: `${ENDPOINTS.RESTAURANT}/${restaurantID}`,
    data: newRestaurant,
  });
};

//DELETE_RESTAURANT
export const deleteRestaurant = (
  restaurantID: string | number | undefined
): AxiosPromise<RestaurantApiResponse> =>
  instanceAxios({
    method: "DELETE",
    url: `${ENDPOINTS.RESTAURANT}/${restaurantID}`,
  });

//  GET_OFFER
export const getOffer = (): AxiosPromise<OfferApiResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.OFFER });

// ADD_OFFER
export const addOffer: (
  newOffer: OfferPostDataType
) => AxiosPromise<OfferApiResponse> = (newOffer) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.OFFER,
    data: newOffer,
  });
};

// EDIT_Offer
export const updateOffer = (
  editedOffer: OfferPostDataType
): AxiosPromise<OfferApiResponse> => {
  return instanceAxios({
    method: "PUT",
    url: `${ENDPOINTS.OFFER}/${editedOffer.id}`,
    data: editedOffer,
  });
};

// EDIT_CATEGORY
export const editCategory = (
  editedCategory: CategoryPostDataType
): AxiosPromise<CategoryApiResponse> => {
  return instanceAxios({
    method: "PUT",
    url: `${ENDPOINTS.CATEGORY}/${editedCategory.id}`,
    data: editedCategory,
  });
};

// DELETE_OFFER
export const deleteOffer = (
  offerID: string | number | undefined
): AxiosPromise<OfferPostDataType> =>
  instanceAxios({
    method: "DELETE",
    url: `${ENDPOINTS.OFFER}/${offerID}`,
  });
//  GET_CATEGORY
export const getCategory = (): AxiosPromise<CategoryApiResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.CATEGORY });

// ADD_CATEGORY
export const addCategory: (
  newCategory: InitialCategoryState
) => AxiosPromise<CategoryPostDataType> = (newCategory) => {
  return instanceAxios({
    method: "POST",
    url: ENDPOINTS.CATEGORY,
    data: newCategory,
  });
};

// DELETE_CATEGORY
export const deleteCategory = (
  categoryId: string | number
): AxiosPromise<CategoryApiResponse> =>
  instanceAxios({
    method: "DELETE",
    url: `${ENDPOINTS.CATEGORY}/${categoryId}`,
  });

// GET_BASKET
export const getBasket = (): AxiosPromise => {
  const accessToken = localStorage.getItem("access_token");
  return instanceAxios({
    method: "GET",
    url: ENDPOINTS.BASKET,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// ADD_BASKET
export const addBasket: (
  basketProduct: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
  const accessToken = localStorage.getItem("access_token");
  return instanceAxios({
    method: "POST",
    url: `${ENDPOINTS.BASKET}/add`,
    data: basketProduct,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

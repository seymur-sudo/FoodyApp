import { ENDPOINTS } from "../constant/EndPoints";
import { instanceAxios } from "../helpers/instanceAxios";
import { AxiosPromise } from "axios";
import {
  ApiResponse,
  RestaurantApiResponse,
  RestaurantPostDataType,
  PostDataType,
  FirstStateType,
  InitialStateType,
} from "../interfaces/index";

// GET
export const getProduct = (): AxiosPromise<ApiResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.PRODUCT });

// GET_BY_ID
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

// // ADD_RESTAURANT
// export const addRestaurant = (newRestaurant: FirstStateType) => {
//   return instanceAxios({
//     method: "POST",
//     url: ENDPOINTS.RESTAURANT,
//     data: newRestaurant,
//   });
// };

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

//GET_RESTAURANT
export const getRestaurant = (): AxiosPromise<RestaurantApiResponse> =>
  instanceAxios({ method: "GET", url: ENDPOINTS.RESTAURANT });

//GET_RESTAURANT_BY_ID
export const getRestaurantById = (
  restaurantID: string | number
): AxiosPromise<RestaurantApiResponse> =>
  instanceAxios({
    method: "GET",
    url: `${ENDPOINTS.RESTAURANT}/${restaurantID}`,
  });

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
  restaurantID: string | number
): AxiosPromise<RestaurantApiResponse> =>
  instanceAxios({
    method: "DELETE",
    url: `${ENDPOINTS.RESTAURANT}/${restaurantID}`,
  });

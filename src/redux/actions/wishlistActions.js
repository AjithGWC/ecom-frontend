import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/constants";

export const setWishlist = (product) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: product,
  };
};

export const removeWishlist = (productId) => {
    return {
      type: REMOVE_FROM_WISHLIST,
      payload: productId,
    };
  };
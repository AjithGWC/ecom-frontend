import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../constants/constants';

export const setCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity },
  };
};

export const removeCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateCartQuantity = (productId, quantity) => {
  return {
    type: UPDATE_CART_QUANTITY,
    payload: { productId, quantity },
  };
};

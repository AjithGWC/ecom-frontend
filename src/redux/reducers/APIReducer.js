import { addToWishlist } from '../actions/APIActions';
import { 
    FETCHED_PRODUCTS, 
    FETCHED_PRODUCTS_BY_ID, 
    FETCHED_CATEGORY, 
    FETCHED_CATEGORY_BY_ID, 
    FETCHED_CART, 
    FETCHED_CART_PRODUCT_DETAILS,
    FETCHED_WISHLIST,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    FETCH_USER_BY_ID,
    FETCH_ORDERS,
    FETCH_ORDERS_BY_ORDER_ID,
    FETCH_ORDER_BY_USER_ID,
    SAVE_ORDER
  } from '../constants/APIConstants';
  
  const initialState = { 
    fetchedProducts: [], 
    fetchedProductById: [], 
    fetchedCategories: [], 
    fetchedCategoryById: null, 
    fetchedCart: [], 
    fetchedCartProducts: [],
    fetchedWishlist: null,
    addProductToWishlist: [],
    removeProductFromWishlist: [],
    fetchUserById: [],
    fetchedOrders: [],
    fetchedOrdersByOrderId: [],
    fetchedUserOrders: [],
    saveOrder: []
  };
  
  const apireducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHED_PRODUCTS:
        return {
          ...state,
          fetchedProducts: action.payload,
        };
      case FETCHED_PRODUCTS_BY_ID:
        return {
          ...state,
          fetchedProductById: action.payload,
        };
      case FETCHED_CATEGORY:
        return {
          ...state,
          fetchedCategories: action.payload,
        };
      case FETCHED_CATEGORY_BY_ID:
        return {
          ...state,
          fetchedCategoryById: action.payload,
        };
      case FETCHED_CART:
        return {
          ...state,
          fetchedCart: action.payload,
        };
      case FETCHED_CART_PRODUCT_DETAILS:
        return {
          ...state,
          fetchedCartProducts: action.payload,
        };
      case FETCHED_WISHLIST:
        return {
          ...state,
          fetchedWishlist: action.payload,
        };
      case ADD_TO_WISHLIST:
        return {
          ...state,
          addProductToWishlist: action.payload,
        };
      case REMOVE_FROM_WISHLIST:
        return {
          ...state,
          removeProductFromWishlist: action.payload,
        };
      case FETCH_USER_BY_ID:
        return {
          ...state,
          fetchUserById: action.payload,
        };
      case FETCH_ORDERS:
        return {
          ...state,
          fetchedOrders: action.payload,
        };
      case FETCH_ORDERS_BY_ORDER_ID:
        return {
          ...state,
          fetchedOrdersByOrderId: action.payload,
        };
      case FETCH_ORDER_BY_USER_ID:
        return {
          ...state,
          fetchedUserOrders: action.payload,
        };
      case SAVE_ORDER:
        return {
          ...state,
          saveOrder: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default apireducer;
  
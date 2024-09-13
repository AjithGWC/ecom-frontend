// reducers/productReducer.js

import { CREATE_PRODUCT, 
  UPDATE_PRODUCT, 
  DELETE_PRODUCT, 
  CREATE_CATEGORY, 
  UPDATE_CATEGORY, 
  DELETE_CATEGORY,
  FETCH_SELLER,
  CREATE_SELLER,
  FETCH_SELLER_BY_ID,
  UPDATE_SELLER,
  DELETE_SELLER,
  FETCH_USER_BY_ID ,
  UPDATE_USER_BY_ID
} from '../../constants/backend/backendConstant';

const initialState = {
  products: [],
  category: [],
  seller: [],
  selectedSeller: null,
  user: [],
  users: []
};

const backendApiRender = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        )
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload]
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        category: state.category.map(categoryies =>
          categoryies._id === action.payload._id ? action.payload : categoryies
        )
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        category: state.category.filter(categoryies => categoryies._id !== action.payload)
      };

    case FETCH_SELLER:
      return {
        ...state,
        seller: action.payload 
      };

    case CREATE_SELLER:
      return {
        ...state,
        seller: [...state.seller, action.payload]
      };

    case FETCH_SELLER_BY_ID:
      return {
        ...state,
        selectedSeller: action.payload
      };


    case UPDATE_SELLER:
      return {
        ...state,
        seller: state.seller.map(sellers =>
          sellers._id === action.payload._id ? action.payload : sellers
        )
      };

    case DELETE_SELLER:
      return {
        ...state,
        seller: state.seller.filter(sellers => sellers._id !== action.payload)
      };

    case FETCH_USER_BY_ID:
      if (action.payload && action.payload._id) {
        const existingUser = state.user.find(user => user._id === action.payload._id);
        if (!existingUser) {
          return {
            ...state,
            user: [...state.user, action.payload]
          };
        }
      }
      return state;

    case UPDATE_USER_BY_ID:
      return {
        ...state,
        users:  action.payload
      };

    default:
      return state;
  }
};

export default backendApiRender;

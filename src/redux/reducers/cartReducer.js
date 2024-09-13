import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../constants/constants';

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product: addProduct, quantity: addQuantity } = action.payload;
      const existingProduct = state.products.find(p => p.product._id === addProduct._id);
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map(p =>
            p.product._id === addProduct._id
              ? { ...p, quantity: p.quantity + addQuantity }
              : p
          ),
        };
      }
      return {
        ...state,
        products: [...state.products, { product: addProduct, quantity: addQuantity }],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(p => p.product._id !== action.payload),
      };

    case UPDATE_CART_QUANTITY:
      const { productId, quantity: updatedQuantity } = action.payload;
      return {
        ...state,
        products: state.products.map(p =>
          p.product._id === productId
            ? { ...p, quantity: updatedQuantity }
            : p
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;

import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../constants/constants';

const initialState = {
  wishlist: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      
      const exists = state.wishlist.find(item => item._id === action.payload._id);
      if (exists) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default wishlistReducer;

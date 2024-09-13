import axios from 'axios';
import { 
  FETCHED_PRODUCTS, 
  FETCHED_PRODUCTS_BY_ID, 
  FETCHED_CATEGORY, 
  FETCHED_CATEGORY_BY_ID, 
  FETCHED_CART, 
  FETCHED_CART_PRODUCT_DETAILS, 
  CART_UPDATE_QUANTITY,
  CART_REMOVE_ITEM,
  FETCHED_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  FETCH_USER_BY_ID,
  FETCH_ORDERS,
  FETCH_ORDERS_BY_ORDER_ID,
  FETCH_ORDER_BY_USER_ID,
  SAVE_ORDER
 } from "../constants/APIConstants";

// Fetch products
export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get('https://ecommerce-backend-mdiu.onrender.com/admin/product/');
    dispatch({
      type: FETCHED_PRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
};

// Fetch products by id
export const fetchProductsById = (id) => async (dispatch) => {
  console.log(id);
  
    try {
      const response = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/admin/product/${id}`);
      dispatch({
        type: FETCHED_PRODUCTS_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

// Fetch categories
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('https://ecommerce-backend-mdiu.onrender.com/admin/category/');
    dispatch({
      type: FETCHED_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching categories: ", error);
  }
};

// Fetch products by id
export const fetchCategoriesById = (id) => async (dispatch) => {
    try {
      const response = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/admin/category/${id}`);
      dispatch({
        type: FETCHED_CATEGORY_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

// Fetch cart by user ID
export const fetchCartByUserId = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/cart/${userId}`);    
    dispatch({
      type: FETCHED_CART,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching cart: ", error);
  }
};

// Fetch cart products by user IDs
export const fetchCartProductByIds = (products) => async (dispatch) => {
  try {
    const productData = products.map(product => ({
      productId: product.productId,
      quantity: product.quantity
    }));
    const response = await axios.post('https://ecommerce-backend-mdiu.onrender.com/cart/products', productData);    
    dispatch({
      type: FETCHED_CART_PRODUCT_DETAILS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching cart products: ", error);
  }
};

//update cart quantity
export const updateCartProductQuantity = (userId, productId, newQuantity) => async (dispatch) => {
  try {
    await axios.patch(`https://ecommerce-backend-mdiu.onrender.com/cart/product-update/${userId}`, { productId: productId, quantity: newQuantity });
    dispatch({
      type: CART_UPDATE_QUANTITY,
      payload: { productId, newQuantity }
    });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
  }
};

// Remove item from cart
export const removeCartProduct = (userId, productId) => async (dispatch) => {
  try {
    await axios.patch(`https://ecommerce-backend-mdiu.onrender.com/cart/product/${userId}`, { productId: productId });
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: productId
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Fetch wishlist by user ID
export const fetchWishlistByUserId = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/wishlist/${userId}`);
    dispatch({
      type: FETCHED_WISHLIST,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching wishlist: ", error);
  }
};

// Add to wishlist action
export const addToWishlist = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/wishlist/add/${userId}`, { productId });
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: data.products,
    });
  } catch (error) {
    console.error(error);
  }
};

// Remove from wishlist action
export const removeFromWishlist = (userId, productId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/wishlist/remove/${userId}`, { productId });
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: data.products,
    });
  } catch (error) {
    console.error(error);
  }
};

// Fetch User from db action
export const fetchUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/admin/users/${userId}`);
    dispatch({
      type: FETCH_USER_BY_ID,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

// get Order by userId
export const getOrders = () => async (dispatch) => {  
  try {
    const { data } = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/order`);
    dispatch({
      type:   FETCH_ORDERS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

// get Order by userId
export const getOrderByOrderId = (orderId) => async (dispatch) => {    
  try {
    const { data } = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/order/id/${orderId}`);
    dispatch({
      type: FETCH_ORDERS_BY_ORDER_ID,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

// get Order by userId
export const getOrderByUserId = (userId) => async (dispatch) => {  
  try {
    const { data } = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/order/${userId}`);
    dispatch({
      type: FETCH_ORDER_BY_USER_ID,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Save Order
export const saveOrder = (userId, products, shipping, total) => async (dispatch) => {  
  try {
    const { data } = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/order/${userId}`, { products, shipping, total });
    dispatch({
      type: SAVE_ORDER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
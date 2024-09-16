import { 
  CREATE_PRODUCT, 
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
import axios from 'axios'; 

// Action to create a new product
export const createProduct = (token, formData) => async (dispatch) => {
    try {
      const response = await axios.post('https://ecommerce-backend-mdiu.onrender.com/admin/product/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      dispatch({
        type: CREATE_PRODUCT,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  // Action to update an existing product
  export const updateProduct = (token, productId, product) => async (dispatch) => {    
    try {
      const response = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/admin/product/${productId}`, product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  // Action to delete a product
  export const deleteProduct = (token, productId) => async (dispatch) => {
    try {
      const response = await axios.delete(`https://ecommerce-backend-mdiu.onrender.com/admin/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      dispatch({
        type: DELETE_PRODUCT,
        payload: response.data
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Action to create a new category
  export const createCategory = (token, formData) => async (dispatch) => {
    try {
      const response = await axios.post('https://ecommerce-backend-mdiu.onrender.com/admin/category/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: CREATE_CATEGORY,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
    
  // Action to update an existing category
  export const updateCategory = (token, categoryId, category) => async (dispatch) => {    
    try {
      const response = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/admin/category/${categoryId}`, category, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: UPDATE_CATEGORY,
        payload: response.data
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
    
  // Action to delete a category
  export const deleteCategory = (token, categoryId) => async (dispatch) => {
    try {
      const response = await axios.delete(`https://ecommerce-backend-mdiu.onrender.com/admin/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: DELETE_CATEGORY,
        payload: response.data
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Action to fetch Sellers
  export const fetchSeller = (token) => async (dispatch) => {
    try {
      const response = await axios.get('https://ecommerce-backend-mdiu.onrender.com/admin/seller/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: FETCH_SELLER,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Action to create a new Seller
  export const createSeller = (token, formData) => async (dispatch) => {
    try {
      const response = await axios.post('https://ecommerce-backend-mdiu.onrender.com/admin/seller/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: CREATE_SELLER,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Action to fetch Seller by Id
  export const fetchSellerById = (token, sellerId) => async (dispatch) => {    
    try {
      const response = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/admin/seller/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: FETCH_SELLER_BY_ID,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Action to update an existing Seller
  export const updateSeller = (token, sellerId, seller) => async (dispatch) => {    
    try {
      const response = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/admin/seller/${sellerId}`, seller, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: UPDATE_SELLER,
        payload: response.data
      });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
    
  // Action to delete a Seller
  export const deleteSeller = (token, sellerId) => async (dispatch) => {
    try {
      const response = await axios.delete(`https://ecommerce-backend-mdiu.onrender.com/admin/seller/${sellerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: DELETE_SELLER,
        payload: response.data
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Action to fetch user by Id
  export const fetchUserById = (token, userId) => async (dispatch) => {
    try {
      const response = await axios.get(`https://ecommerce-backend-mdiu.onrender.com/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: FETCH_USER_BY_ID,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Action to UPDATE user by Id
  export const updateUserById = (token, userId, data) => async (dispatch) => {
    try {
      const response = await axios.post(`https://ecommerce-backend-mdiu.onrender.com/admin/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: UPDATE_USER_BY_ID,
        payload: response.data
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, fetchCartByUserId, fetchCartProductByIds, fetchWishlistByUserId } from './redux/actions/APIActions';

// frontend components
import FrontendHome from './components/frontend/main';
import FrontendLogin from './components/frontend/pages/login';
import Signup from './components/frontend/pages/signup';
import FrontendHomePage from "./components/frontend/pages/home";
import FrontendShopPage from './components/frontend/pages/shop';
import Product from './components/frontend/pages/product';
import Cart from './components/frontend/cart/cartList';
import Wishlist from './components/frontend/wishlist/wishlist';
import Checkout from './components/frontend/pages/checkout';
import ProfileHome from './components/frontend/pages/profileHome';
import Profile from './components/frontend/profile/profiles';
import MyOrders from './components/frontend/profile/myOrders';
import OrderView from './components/frontend/profile/orderView';

// backend components
import Login from './components/backend/pages/loginPage';
import BackendHome from './components/backend/pages/homePage';
import ProductAdd from './components/backend/product/productAdd';
import ProductList from './components/backend/product/product';
import ProductEdit from './components/backend/product/productEdit';
import CategoryList from './components/backend/category/categoryList';
import CategoryAdd from './components/backend/category/addCategory';
import CategoryEdit from './components/backend/category/editCategory';
import SellerList from './components/backend/seller/seller';
import SellerAdd from './components/backend/seller/sellerAdd';
import SellerEdit from './components/backend/seller/sellerEdit';

const App = () => {
  const dispatch = useDispatch();
  const fetchedCart = useSelector((state) => state.apireducer.fetchedCart);

  const getAuthToken = () => {
    const token = Cookies.get('token');
    return token;
  };
  const userId = Cookies.get('userId');

  const token = getAuthToken();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

    if (token && userId) {
      dispatch(fetchCartByUserId(userId));
      dispatch(fetchWishlistByUserId(userId));
    }
  }, [dispatch, token, userId]);

  useEffect(() => {
    if (fetchedCart && fetchedCart.products) {
      dispatch(fetchCartProductByIds(fetchedCart.products));
    }
  }, [fetchedCart, dispatch]);

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={<FrontendLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<FrontendHome />}>
            <Route path="/" element={<FrontendHomePage />} />
            <Route path="/shop" element={<FrontendShopPage />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile/:id" element={<ProfileHome />} >
              <Route index element={<Profile />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="orders/:id" element={<OrderView />} />
            </Route>
          </Route>

          <Route path="/backend/login" element={<Login />} />
          <Route 
            path="/backend" 
            element={token ? <BackendHome /> : <Navigate to="/backend/login" />}>
            <Route path="" element={<Navigate to="product" />} />
            <Route path="product" element={<ProductList />} />
            <Route path="add-product" element={<ProductAdd />} />
            <Route path="edit-product/:id" element={<ProductEdit />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="add-category" element={<CategoryAdd />} />
            <Route path="edit-category/:id" element={<CategoryEdit />} />
            <Route path="seller" element={<SellerList />} />
            <Route path="add-seller" element={<SellerAdd />} />
            <Route path="edit-seller/:id" element={<SellerEdit />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartByUserId } from '../../../redux/actions/APIActions';
import { selectCartItems } from '../../../redux/selectors/cartSelector'; 
import { selectWishlistItems } from '../../../redux/selectors/wishlistSelector';
import { ShoppingCart, Heart, User, Search } from 'react-feather';
import Cookies from 'js-cookie';
import './navbar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  const nonLoggedInCartItems = useSelector(selectCartItems);
  const fetchedCart = useSelector((state) => state.apireducer.fetchedCart);
  const fetchedWishlist = useSelector((state) => state.apireducer.fetchedWishlist) || {};
  const wishlistItems = useSelector(selectWishlistItems);

  const [isFixed, setIsFixed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 0 || window.innerHeight >= document.body.scrollHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
  
    window.addEventListener('scroll', checkScroll);  
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  

  useEffect(() => {
    if (token && userId) {
      dispatch(fetchCartByUserId(userId));
      // dispatch(fetchCartByUserId(userId));      
    }
  }, [token, userId, dispatch]);

  const totalCartQuantity = useMemo(() => {
    if (token && fetchedCart ) {
      const cartProducts = fetchedCart.products;
      if(cartProducts){
      return (cartProducts).reduce((acc, item) => acc + item.quantity, 0);
      }
    }
    return (nonLoggedInCartItems || []).reduce((acc, item) => acc + item.quantity, 0);
  }, [fetchedCart, nonLoggedInCartItems, token]);

  const totalWishlistQuantity = useMemo(() => {
    if (token && fetchedWishlist && fetchedWishlist.products) {
      return fetchedWishlist.products.length;
    } else {
      return wishlistItems.length;
    }
  }, [token, fetchedWishlist, wishlistItems]);

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('role', { path: '/' });
    Cookies.remove('userId', { path: '/' });
    navigate('/login');
  };

  const handleProfile = () =>{
    navigate(`/profile/${userId}`);
  };

  return (
    <nav className={`w-full top-0 z-50 bg-white ${isFixed ? 'fixed shadow-lg' : 'relative'} transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-black">
          AK Shop
        </Link>
        
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`text-lg font-semibold ${location.pathname === '/' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-lg font-semibold ${location.pathname === '/shop' ? 'text-blue-600' : 'text-black hover:text-blue-600'}`}
          >
            Shop
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {token ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-black">
                <User className="w-7 h-7" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                    onClick={handleProfile}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-1 border border-black rounded-lg shadow-sm hover:bg-black hover:text-white"
            >
              Login
            </Link>
          )}

          <Link to="/cart" className="relative text-black">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalCartQuantity}
            </span>
          </Link>

          <Link to="/favorites" className="relative text-black">
            <Heart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalWishlistQuantity}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

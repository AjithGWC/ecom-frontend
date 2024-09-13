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

      const intervalId = setInterval(() => {
        dispatch(fetchCartByUserId(userId));
      }, 1000);

      return () => clearInterval(intervalId);
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
    <nav className={`w-full top-0 z-50 transition-all duration-300 ease-out ${isFixed ? 'fixed shadow-lg' : 'relative'}`}>
      <div className="p-0 container bg-white mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-3xl font-bold text-black mr-4">
          Ecom Site
        </Link>
        
        <div className="flex mr-auto ml-12 space-x-4">
          <Link
            to="/"
            className={`text-lg font-semibold ${location.pathname === '/' ? 'bg-blue-100' : 'text-black'}`}
            aria-label="Go to Home Page"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-lg font-semibold ${location.pathname === '/shop' ? 'bg-blue-100' : 'text-black'}`}
            aria-label="Go to Shop Page"
          >
            Shop
          </Link>
        </div>
        {/* <div className='mr-auto'>
          <div className="search-container">
            <input type="text" placeholder="Search..." />
            <Search className='search-icon' />
          </div>
        </div> */}
        <div className="flex">
          {token ? (
            <div className="relative mr-6">
              <button
                aria-label="User Profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative text-black flex items-center"
              >
                <User aria-label="User" className="w-7 h-7" />
                {dropdownOpen && (
                  <div className="user-dropdown mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
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
              </button>
            </div>
          ) : (
            <div className="relative mr-6">
              <Link
                aria-label="Go to Login Page"
                to="/login"
                className="relative inline-flex items-center px-4 py-1 border border-2 border-black rounded-lg shadow-sm hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Login
              </Link>
            </div>
          )}
          <div className="relative mr-6">
            <Link
              aria-label="Go to Cart Page"
              to="/cart"
              className="relative text-black"
            >
              <ShoppingCart aria-label="Cart" className="w-7 h-7" />
              <span className="absolute -top-2 -right-2 bg-blue-800 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {totalCartQuantity}
              </span>
            </Link>
          </div>
          <div className="relative mr-4">
            <Link
              aria-label="Go to Favorites Page"
              to="/favorites"
              className="relative text-black"
            >
              <Heart aria-label="Favorites" className="w-7 h-7" />
              <span className="absolute -top-2 -right-2 bg-blue-800 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {totalWishlistQuantity}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

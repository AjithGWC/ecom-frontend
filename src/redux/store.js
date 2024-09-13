import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import productReducer from './reducers/cartReducer';
import wishlistReducer from './reducers/wishlistReducer';
import apireducer from './reducers/APIReducer';
import backendApiRender from './reducers/backend/backendReducer';

const rootReducer = combineReducers({
  cart: productReducer,
  wishlist: wishlistReducer,
  apireducer: apireducer,
  backend: backendApiRender
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

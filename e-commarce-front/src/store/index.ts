import { configureStore, isPlainObject } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import categoriesReducer from './categories/CategoriesSlice';
import productReducer from './product/productSlice';
import cartReducer from './cart/cartSlice';
import WishListReducer from './wishlist/WishListSlice';
import AuthReducer from './auth/AuthSlice';
import OrderReducer from './orderSlice/OrderSlice';


const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};


const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["itemsId"],
};


const rootReducer = combineReducers({
  AuthReducer: persistReducer(authPersistConfig, AuthReducer),
  categoriesReducer,
  productReducer,
  OrderReducer,
  cartReducer: persistReducer(cartPersistConfig, cartReducer),
   WishListReducer: persistReducer(wishlistPersistConfig, WishListReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);


export const store = configureStore({
  // reducer: {
  //   categoriesReducer,
  //   productReducer,
  //   cartReducer,
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

 export const prisestor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default {store, prisestor};


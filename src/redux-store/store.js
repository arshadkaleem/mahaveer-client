"use client";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/admin/auth";
import { orderApi } from "./api/admin/order";
import { manageuser } from "./api/admin/manageUserApi";
import { manageTransactions } from "./api/admin/transactionApi";
import { excelDownloadApi } from "./api/admin/xlsxApi";
import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slice/registerdUserSlice";
import tokenReducer from "./slice/tokenSlice";
import adminReducer from "./slice/useSlice";
import orderReducer from "./slice/orderSlice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "mahaveerChache",
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  admin: adminReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [manageuser.reducerPath]: manageuser.reducer,
    [manageTransactions.reducerPath]: manageTransactions.reducer,
    [excelDownloadApi.reducerPath]: excelDownloadApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      orderApi.middleware,
      manageuser.middleware,
      manageTransactions.middleware,
      excelDownloadApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

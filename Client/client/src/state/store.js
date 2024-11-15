import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./index.js"; // Import the reducer
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Step 1: Create a persist config
const persistConfig = {
  key: "root", // Key for local storage
  storage, // Default local storage for web
};

// Step 2: Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer, // Add your reducers here
  // other reducers...
});

// Step 3: Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Use the persisted reducer to configure your store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabling serializable check for redux-persist
    }),
});

// Step 5: Export the store and persistor
export const persistor = persistStore(store);
export default store;

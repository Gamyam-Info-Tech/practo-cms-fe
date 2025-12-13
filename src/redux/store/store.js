import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../reducer/authReducer/AuthReducer";

// Persist configuration for auth reducer
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "permissions", "isAuthenticated"],
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  // dashboard: dashboardReducer,
});

export const store = configureStore({   
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for redux-persist
        // serializableCheck: false,
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
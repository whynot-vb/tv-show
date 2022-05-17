import { configureStore } from "@reduxjs/toolkit";

import showsReducer from "../slices/tvShowSlice";
import detailsReducer from "../slices/showDetailsSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    shows: showsReducer,
    details: detailsReducer,
    auth: authReducer,
  },
});

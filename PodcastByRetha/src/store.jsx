import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";
import favoritesReducer from "./slices/favouriteSlice";

// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    user: userReducer,
    podcast: podcastReducer,
    favorites: favoritesReducer,
  },
});

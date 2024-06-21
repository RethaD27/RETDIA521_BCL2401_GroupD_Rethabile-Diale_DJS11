// slices/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  episodes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.episodes.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.episodes = state.episodes.filter(
        (episode) => episode.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

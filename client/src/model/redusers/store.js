import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./auth";
import { recipesSlice } from "./recipes";
export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    recipes: recipesSlice.reducer,
  },
});

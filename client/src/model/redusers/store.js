import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./auth";
import { recipesSlice } from "./recipes";
import { recipeSlice } from "./recipe";
import { errorRequetsSlice } from "./error";

export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    recipes: recipesSlice.reducer,
    recipe: recipeSlice.reducer,
    error: errorRequetsSlice.reducer,
  },
});

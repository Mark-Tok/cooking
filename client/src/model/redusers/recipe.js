import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "shared/api";

//Fetch Data
export const fetcRecipe = createAsyncThunk(
  "api/fetcRecipe",
  async function (id, { rejectWithValue }) {
    try {
      const response = await request(`http://localhost:5000/list/${id}`);
      if (response.status !== 200) {
        throw new Error(response.response.data.error);
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetcRecipe.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetcRecipe.fulfilled]: (state, actions) => {
      state.data = actions.payload;
      state.status = null;
    },
    [fetcRecipe.rejected]: (state, action) => {
      state.status = null;
      state.error = action.payload;
    },
  },
});

// export const { saveToken, deleteToken, sortedCompositions, putQuery } =
//   recipesSlice.actions;

//Selectors
export const selectLoadingRecipe = (state) => state.recipe.status;

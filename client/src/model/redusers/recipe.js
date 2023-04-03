import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { request } from "shared/api";

import {
  createImage,
  createBase,
  createComposition,
  createName,
  createDescription,
  createSteps,
  setId,
} from "./createRecipe";
//Fetch Data
export const fetcRecipe = createAsyncThunk(
  "api/fetcRecipe",
  async function ({ id, mode }, { rejectWithValue, dispatch }) {
    const isEdit = mode === "edit";
    try {
      const response = await request(`http://localhost:5000/list/${id}`);
      if (response.status !== 200) {
        throw new Error(response.response.data.error);
      }
      if (response.status === 200 && response?.data) {
        if (isEdit) {
          const {
            image,
            compositionBase,
            name,
            description,
            composition,
            steps,
            id,
          } = response.data[0];
          dispatch(createImage(image));
          dispatch(
            createBase(
              compositionBase.map((item) => ({ value: item, id: uuidv4() }))
            )
          );
          dispatch(createName(name));
          dispatch(createDescription(description));
          dispatch(
            createComposition(
              composition.map((item) => ({ value: item, id: uuidv4() }))
            )
          );
          dispatch(createSteps(steps));
          dispatch(setId(id));
        }

        return response.data;
      }
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
  reducers: {
    removeRecipe: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetcRecipe.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetcRecipe.fulfilled]: (state, actions) => {
      state.data = actions.payload[0];
      state.status = null;
    },
    [fetcRecipe.rejected]: (state, action) => {
      state.status = null;
      state.error = action.payload;
    },
  },
});

export const { removeRecipe } = recipeSlice.actions;

//Selectors
export const selectLoadingRecipe = (state) => state.recipe.status;
export const selectRecipe = (state) => state.recipe.data;

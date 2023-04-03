import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "shared/api";
import { fetchListRecipes } from "./recipes";
//Fetch Data
export const fetchPostRecipe = createAsyncThunk(
  "api/fetchPostRecipe",
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const response = await request(
        `http://localhost:5000/fetchPostRecipe`,
        data,
        "post"
      );
      if (response.status === 200 && !!response?.data) {
        await dispatch(fetchListRecipes());
      }
      if (response.status !== 200) {
        throw new Error(response.response.data.error);
      }
      if (response.status === 200 && response?.data) {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchPutRecipe = createAsyncThunk(
  "api/fetchPutRecipe",
  async function (data, { rejectWithValue, dispatch }) {
    try {
      const response = await request(
        `http://localhost:5000/fetchPutRecipe`,
        data,
        "put"
      );
      if (response.status === 200 && !!response?.data) {
        await dispatch(fetchListRecipes());
      }
      if (response.status !== 200) {
        throw new Error(response.response.data.error);
      }
      if (response.status === 200 && response?.data) {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);



const initialState = {
  base: [{ value: "", id: 1 }],
  composition: [{ value: "", id: 1 }],
  image: null,
  steps: [{ value: "" }],
  name: "",
  description: "",
  status: false,
  success: false,
  id: null,
};
export const createRecipeSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    createImage: (state, action) => {
      state.image = action.payload;
    },
    createBase: (state, action) => {
      state.base = action.payload;
    },
    createComposition: (state, action) => {
      state.composition = action.payload;
    },
    createName: (state, action) => {
      state.name = action.payload;
    },
    createDescription: (state, action) => {
      state.description = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetState: (state) => {
      state.image = null;
      state.base = [{ value: "", id: 1 }];
      state.composition = [{ value: "", id: 1 }];
      state.image = null;
      state.steps = [{ value: "" }];
      state.name = "";
      state.description = "";
      state.status = false;
      state.success = false;
    },
    createSteps: (state, action) => {
      state.steps = action.payload;
    },
  },
  extraReducers: {
    [fetchPostRecipe.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPostRecipe.fulfilled]: (state, actions) => {
      state.data = actions.payload[0];
      state.status = null;
      state.success = true;
    },
    [fetchPostRecipe.rejected]: (state, action) => {
      state.status = null;
      state.error = action.payload;
    },
    [fetchPutRecipe.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPutRecipe.fulfilled]: (state, actions) => {
      state.data = actions.payload[0];
      state.status = null;
      state.success = true;
    },
    [fetchPutRecipe.rejected]: (state, action) => {
      state.status = null;
      state.error = action.payload;
    },
  },
});

export const {
  createImage,
  createComposition,
  createBase,
  createName,
  createDescription,
  createSteps,
  resetState,
  setId,
} = createRecipeSlice.actions;

//Selectors
export const selectUploadImage = (state) => state.create.image;
export const selectBase = (state) => state.create.base;
export const selectComposition = (state) => state.create.composition;
export const selectNameRecipe = (state) => state.create.name;
export const selectDescriptionRecipe = (state) => state.create.description;
export const selectSteps = (state) => state.create.steps;
export const selectStatusPostRecipe = (state) => state.create.status;
export const selectStatusPostRecipeSuccess = (state) => state.create.success;
export const selectId = (state) => state.create.id;

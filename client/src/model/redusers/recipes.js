import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "shared/api";
import { fetcRecipe } from "./recipe";
//Fetch Data
export const fetchListRecipes = createAsyncThunk(
  "api/fetchListRecipes",
  async function (data, { rejectWithValue, getState, dispatch }) {
    const { recipes, recipe } = getState();
    try {
      if (!!data || !!recipes.query) {
        const response = await request(
          `http://localhost:5000/list/?search=${data || recipes.query}`
        );
        if (response.status !== 200) {
          throw new Error(response.response.data.error);
        }
        if (typeof recipes.sorted == "boolean") {
          const data = response.data.map((item) => {
            const sortedBaseComponent = recipes.value.find(
              ({ id }) => id === item.id
            );
            return {
              ...item,
              compositionBase: !!sortedBaseComponent?.compositionBase
                ? sortedBaseComponent?.compositionBase
                : item.compositionBase,
            };
          });
          return data;
        } else {
          return response.data;
        }
      } else {
        const response = await request("http://localhost:5000/list", data);
        if (response.status !== 200) {
          throw new Error(response.response.data.error);
        }
        if (typeof recipes.sorted == "boolean") {
          const data = response.data.map((item) => {
            const sortedBaseComponent = recipes.value.find(
              ({ id }) => id === item.id
            );
            return {
              ...item,
              compositionBase: !!sortedBaseComponent?.compositionBase
                ? sortedBaseComponent?.compositionBase
                : item.compositionBase,
            };
          });
          return data;
        }
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateRecipeLiked = createAsyncThunk(
  "api/updateRecipeLiked",
  async function (data, { rejectWithValue, dispatch, getState }) {
    const { recipes } = await getState();
    try {
      const response = await request(
        "http://localhost:5000/udateRecipeLiked",
        data,
        "put"
      );
      if (response.status !== 201) {
        throw new Error(response);
      }
      if (!recipes.query) {
        await dispatch(fetchListRecipes());
      } else {
        await dispatch(fetchListRecipes(recipes.query));
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const putListRecipe = createAsyncThunk(
  "api/putListRecipes",
  async function (data, { rejectWithValue }) {
    try {
      const response = await request("http://localhost:5000/list", data, "put");
      if (response.status !== 200) {
        throw new Error(response.response.data.error);
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    value: null,
    status: null,
    error: null,
    query: null,
    sorted: null,
  },
  reducers: {
    sortedCompositions: (state, action) => {
      if (!!action.payload) {
        state.value = action.payload;
        state.sorted = true;
      } else {
        state.sorted = "default";
      }
    },
    putQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: {
    [fetchListRecipes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchListRecipes.fulfilled]: (state, actions) => {
      state.value = actions.payload;
      state.status = "finish";
    },
    [fetchListRecipes.rejected]: (state, action) => {
      state.status = null;
      state.value = null;
      state.error = action.payload;
    },
    [updateRecipeLiked.pending]: (state) => {
      state.status = "loading";
    },
    [updateRecipeLiked.fulfilled]: (state) => {
      state.status = "finish";
    },
    [updateRecipeLiked.rejected]: (state, action) => {
      state.status = null;
      state.error = action.payload;
    },
  },
});

export const { saveToken, deleteToken, sortedCompositions, putQuery } =
  recipesSlice.actions;

//Selectors
export const selectRecipes = (state) => state.recipes.value;
export const selectLoadingRecipes = (state) => state.recipes.status;
export const selectError = (state) => state.recipes.error;

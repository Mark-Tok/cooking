import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "shared/api";

//Fetch Data
export const fetchListRecipes = createAsyncThunk(
  "api/fetchListRecipes",
  async function (data, { rejectWithValue, getState }) {
    const { recipes } = getState();
    try {
      if (!!data || !!recipes.query) {
        const response = await request(
          `http://localhost:5000/list/?search=${data || recipes.query}`,
          "get"
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
        const response = await request(
          "http://localhost:5000/list",
          "get",
          data
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
    const { recipes, sorted } = await getState();
    try {
      await request("http://localhost:5000/udateRecipeLiked", "put", data);
      if (!recipes.query) {
        await dispatch(fetchListRecipes());
      } else {
        await dispatch(fetchListRecipes(recipes.query));
      }
    } catch (e) {
      //ты перенес ошибку на и здесь она не будет записываться в стор
      return rejectWithValue(e.message);
    }
  }
);

export const putListRecipe = createAsyncThunk(
  "api/putListRecipes",
  async function (data, { rejectWithValue }) {
    try {
      const response = await request("http://localhost:5000/list", "put", data);
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

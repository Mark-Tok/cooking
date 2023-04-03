import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { request } from "shared/api";
// import jwt_decode from "jwt-decode";
// export const fetchToken = createAsyncThunk(
//   "auth/fetchAuth",
//   async function (data, { rejectWithValue }) {
//     try {
//       const response = await request(
//         "http://localhost:5000/auth",
//         data,
//         "post",
//       );
//       console.log(response, 'response')
//       if (response.status !== 200) {
//         throw new Error(response.response.data.error);
//       }
//       window.localStorage.setItem("token", JSON.stringify(response.data.token));
//       return response.data.token;
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );

export const createRecipeSlice = createSlice({
  name: "create",
  initialState: {
    base: [{ value: "", id: 1 }],
    composition: [{ value: "", id: 1 }],
    image: null,
    steps: {},
    name: "",
    description: "",
  },
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
  },
  extraReducers: {
    // [fetchToken.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [fetchToken.fulfilled]: (state, action) => {
    //   const token = action.payload;
    //   state.status = "finish";
    //   state.info = JSON.parse(window.atob(token.split(".")[1]));
    //   // state.info = jwt_decode(actions.payload);
    //   state.value = token;
    // },
    // [fetchToken.rejected]: (state, action) => {
    //   state.status = null;
    //   state.value = null;
    //   state.error = action.payload;
    // },
  },
});

export const {
  createImage,
  createComposition,
  createBase,
  createName,
  createDescription,
} = createRecipeSlice.actions;

//Selectors
export const selectUploadImage = (state) => state.create.image;
export const selectBase = (state) => state.create.base;
export const selectComposition = (state) => state.create.composition;
export const selectNameRecipe = (state) => state.create.name;
export const selectDescriptionRecipe = (state) => state.create.description;

//   export const selectLoading = (state) => state.token.status;
//   export const selectError = (state) => state.token.error;
//   export const selectIsAuth = (state) => !!state.token.value;
//   export const selectUserInfo = (state) => state.token.info;

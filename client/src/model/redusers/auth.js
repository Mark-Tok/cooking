import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { request } from "shared/api";
import jwt_decode from "jwt-decode";
export const fetchToken = createAsyncThunk(
  "auth/fetchAuth",
  async function (data, { rejectWithValue }) {
    try {
      const response = await request(
        "http://localhost:5000/auth",
        data,
        "post",
      );
      console.log(response, 'response')
      if (response.status !== 200) {
        throw new Error(response.response.data.error);
      }
      window.localStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data.token;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const tokenSlice = createSlice({
  name: "token",
  initialState: { value: null, status: null, error: null, info: null },
  reducers: {
    saveToken: (state, action) => {
      const token = action.payload;
      console.log(token, 'token')
      state.info = JSON.parse(window.atob(token.split(".")[1]));
      state.value = token;
      return state;
    },
    deleteToken: (state) => {
      state.value = null;
      return state;
    },
  },
  extraReducers: {
    [fetchToken.pending]: (state) => {
      state.status = "loading";
    },
    [fetchToken.fulfilled]: (state, action) => {
      const token = action.payload;
      state.status = "finish";
      state.info = JSON.parse(window.atob(token.split(".")[1]));
      // state.info = jwt_decode(actions.payload);
      state.value = token;
    },
    [fetchToken.rejected]: (state, action) => {
      state.status = null;
      state.value = null;
      state.error = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  },
});

export const { saveToken, deleteToken } = tokenSlice.actions;

//Selectors
export const selectToken = (state) => state.token.value;
export const selectLoading = (state) => state.token.status;
export const selectError = (state) => state.token.error;
export const selectIsAuth = (state) => !!state.token.value;
export const selectUserInfo = (state) => state.token.info;

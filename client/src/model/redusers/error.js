import { createSlice } from "@reduxjs/toolkit";

export const errorRequetsSlice = createSlice({
  name: "error",
  initialState: {
    data: null,
  },
  reducers: {
    setDataError: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataError } = errorRequetsSlice.actions;

//Selectors
export const selectErrorData = (state) => state.error.data;

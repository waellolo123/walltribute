import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAll: [],
  getOne: {},
  structure: null,
  payment: false,
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    GetAllImagesReducer: (state, action) => {
      state.getAll = action.payload;
    },
    GetOneImageReducer: (state, action) => {
      state.getOne = action.payload;
    },
    setStructure: (state, action) => {
      state.structure = action.payload;
    },
    ChangePayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  GetAllImagesReducer,
  GetOneImageReducer,
  setStructure,
  ChangePayment,
} = imagesSlice.actions;

export default imagesSlice.reducer;

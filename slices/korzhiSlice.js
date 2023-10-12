import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  korzhi: [],
  clearSelectedImages: false,
  imagesList: [],
  showForm: false,
};

export const korzhiSlice = createSlice({
  name: 'korzhi',
  initialState,
  reducers: {
    addKorzh: (state, action) => {
      state.korzhi.push(action.payload);
    },
    setStartupKorzhi: (state, action) => {
      state.korzhi = action.payload;
    },
  },
});

export const {
  addKorzh,
  setStartupKorzhi,
  setClearImagesFlagTrue,
  setClearImagesFlagFalse,
  updateImagesList,
  setShowFormFlagFalse,
  setShowFormFlagTrue,
} = korzhiSlice.actions;
export default korzhiSlice.reducer;

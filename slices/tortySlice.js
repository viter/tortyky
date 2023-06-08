import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  torty: [],
  clearSelectedImages: false,
  imagesList: [],
  showForm: false,
};

export const tortySlice = createSlice({
  name: 'torty',
  initialState,
  reducers: {
    addTort: (state, action) => {
      state.torty.push(action.payload);
    },
    setStartupTorty: (state, action) => {
      state.torty = action.payload;
    },

    //clearSelectedImages is used to clear selected images in FilePicker after TortyForm is reset
    setClearImagesFlagTrue: (state) => {
      state.clearSelectedImages = true;
    },
    setClearImagesFlagFalse: (state) => {
      state.clearSelectedImages = false;
    },

    setShowFormFlagTrue: (state) => {
      state.showForm = true;
    },
    setShowFormFlagFalse: (state) => {
      state.showForm = false;
    },

    updateImagesList: (state, action) => {
      state.imagesList = [...action.payload];
    },
  },
});

export const {
  addTort,
  setStartupTorty,
  setClearImagesFlagTrue,
  setClearImagesFlagFalse,
  updateImagesList,
  setShowFormFlagFalse,
  setShowFormFlagTrue,
} = tortySlice.actions;
export default tortySlice.reducer;

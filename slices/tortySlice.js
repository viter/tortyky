import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  torty: [],
  clearSelectedImages: false,
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
  },
});

export const { addTort, setStartupTorty, setClearImagesFlagTrue, setClearImagesFlagFalse } =
  tortySlice.actions;
export default tortySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  valuesToUpdate: {},
  isReload: false,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    setStartupTags: (state, action) => {
      state.tags = action.payload;
    },
    changeValuesToUpdate: (state, action) => {
      state.valuesToUpdate = action.payload;
    },
    resetValuesToUpdate: (state) => {
      state.valuesToUpdate = null;
    },
    setIsReload: (state, action) => {
      state.isReload = action.payload;
    },
  },
});

export const { addTag, setStartupTags, changeValuesToUpdate, resetValuesToUpdate, setIsReload } =
  tagsSlice.actions;
export default tagsSlice.reducer;

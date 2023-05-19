import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tags: [],
  valuesToUpdate: {},
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
  },
});

export const { addTag, setStartupTags, changeValuesToUpdate, resetValuesToUpdate } =
  tagsSlice.actions;
export default tagsSlice.reducer;

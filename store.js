'use client';

import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './slices/tagsSlice';
import tortyReducer from './slices/tortySlice';

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    torty: tortyReducer,
  },
});

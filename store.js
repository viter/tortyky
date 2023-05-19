'use client';

import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './slices/tagsSlice';

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
  },
});

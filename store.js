'use client';

import { configureStore } from '@reduxjs/toolkit';
import tagsReducer from './slices/tagsSlice';
import tortyReducer from './slices/tortySlice';
import korzhiReducer from './slices/korzhiSlice';

export const store = configureStore({
  reducer: {
    tags: tagsReducer,
    torty: tortyReducer,
    korzhi: korzhiReducer,
  },
});

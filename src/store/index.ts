import { configureStore } from '@reduxjs/toolkit';
import diaryReducer from './diary/diarySlice';

export const store = configureStore({
    reducer: {
        diary: diaryReducer
    }
})
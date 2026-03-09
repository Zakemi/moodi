import { configureStore } from '@reduxjs/toolkit';
import diaryReducer from './diary/diarySlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    user: userReducer,
  },
});

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log('set user', action);
      state = action.payload;
      console.log(state);
      return state;
    },
  },
  selectors: {
    user: (state) => state,
  },
});

export const { setUser } = userSlice.actions;
export const { user } = userSlice.selectors;

export default userSlice.reducer;

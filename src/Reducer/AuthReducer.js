import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAdmin = action.payload.isAdmin || false
      state.token = action.payload.token || null
    },
    logout: (state) => {
      state.isAdmin = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
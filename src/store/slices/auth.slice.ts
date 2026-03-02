import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  email: string;
}

interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log("ds",state.user);
      
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
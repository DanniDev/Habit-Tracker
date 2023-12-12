import { userStateProps } from "@/app/types/user.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
} as userStateProps;

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      if (
        action.payload === "idle" ||
        action.payload === "pending" ||
        action.payload === "success" ||
        action.payload === "failed"
      ) {
        state.status = action.payload;
      }
    },
    setUser: (state, action: PayloadAction<typeof state.user>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<typeof state.user>) => {
      state.user = action.payload;
    },
    resetUser: (state, action: PayloadAction<string>) => {
      state.user = null;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.user = null;
    },
  },
});

export const { setStatus, setUser, updateUser, resetUser, deleteUser } =
  userSlice.actions;

export default userSlice;

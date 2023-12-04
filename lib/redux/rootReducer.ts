import { combineReducers } from "@reduxjs/toolkit";
import habitSlice from "./slices/habitSlice";
import userSlice from "./slices/userSlice";
userSlice;

const rootReducer = combineReducers({
  habit: habitSlice.reducer,
  userInfo: userSlice.reducer,
});

export default rootReducer;

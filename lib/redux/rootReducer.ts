import { combineReducers } from '@reduxjs/toolkit';
import habitSlice from './slices/habitSlice';

const rootReducer = combineReducers({
	habit: habitSlice.reducer,
});

export default rootReducer;

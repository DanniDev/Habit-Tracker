import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HabitStateProps, NewHabitProps } from "../../../app/types/habit.model";

const initialState = {
  habits: [],
  status: "idle",
  currentPage: 1,
  error: null,
} as HabitStateProps;

const habitSlice = createSlice({
  name: "UserHabits",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      if (
        action.payload === "idle" ||
        action.payload === "pending" ||
        action.payload === "failed" ||
        action.payload === "onAddHabitPending" ||
        action.payload === "onAddHabitSuccess" ||
        action.payload === "onAddHabitFailed" ||
        action.payload === "onDeleteHabitPending" ||
        action.payload === "onDeleteHabitSuccess" ||
        action.payload === "onDeleteHabitFailed" ||
        action.payload === "onUpdateHabitPending" ||
        action.payload === "onUpdateHabitSuccess" ||
        action.payload === "onUpdateHabitFailed"
      ) {
        state.status = action.payload;
      } else {
        state.status = "idle";
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addHabit: (state, action: PayloadAction<NewHabitProps>) => {
      const habits = state.habits;

      state.habits = [...habits, action.payload];
    },
    getHabits: (state, action: PayloadAction<NewHabitProps[]>) => {
      state.habits = action.payload;
    },
    updateHabit: (state, action) => {
      state.habits = state.habits.map((habit) => {
        if (habit._id === action.payload._id) {
          return action.payload;
        } else {
          return habit;
        }
      });
    },
    deleteHabit: (state, action) => {
      const deletedHabitIds = action.payload;

      state.habits = state.habits.filter(
        (habit) => !deletedHabitIds.includes(habit._id)
      );
    },
  },
});

export const {
  setStatus,
  setError,
  setPage,
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit,
} = habitSlice.actions;

export default habitSlice;

import { NewHabitProps, daySelectionTypes } from '../types/habit.model';

export const calculateAchievement = (
	daySelection: {
		month: string;
		days: { day: number; isChecked: boolean }[];
	}[],
	currentChecked: boolean
): number => {
	const addOn = currentChecked ? 1 : -1;

	const daysChecked = ([] as Array<{ day: number; isChecked: boolean }>).concat(
		...daySelection.map((el) => el.days.filter((day) => day.isChecked))
	);

	return daysChecked.length + addOn;
};

export const getCurrentDate = (): [string, number, number] => {
	// Get the current date
	const currentDate = new Date();

	// Get the current month as a string (e.g., "February")
	const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

	// Get the current day as a two-digit number (e.g., "02")
	const currentDay = String(currentDate.getDate()).padStart(2, '0');

	const currentDayNumber = parseInt(currentDay, 10);
	// Get the current year as a four-digit number (e.g., 2021)
	const currentYear = currentDate.getFullYear();

	return [currentMonth, currentDayNumber, currentYear];
};

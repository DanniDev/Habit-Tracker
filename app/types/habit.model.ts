export interface daySelectionTypes {
	month: string;
	days: {
		day: number;
		isChecked: boolean;
	}[];
}
[];

export interface descriptionProps {
	title: string;
}

export interface goalProps {
	goal: number;
}

export interface achievementProps extends goalProps {
	achieved: number;
}

export interface UserInputType {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface NewHabitProps {
	readonly _id: string;
	title: string;
	goal: number;
	achieved: number;
	isCompleted: boolean;
	// daySelection: {
	// 	day: number;
	// 	isChecked: boolean;
	// 	month: string;
	// }[];
	daySelection: {
		month: string;
		days: {
			day: number;
			isChecked: boolean;
		}[];
	}[];
	completedAt?: string;
	yearCreated?: string;
	checked?: boolean;
}

export interface DailyStatusProps {
	habits: NewHabitProps[];
	habitId: string;
	day: number;
	isChecked: boolean;
}
export interface HabitStateProps {
	habits: NewHabitProps[];
	error: string | null;
	status:
		| 'idle'
		| 'pending'
		| 'failed'
		| 'onAddHabitPending'
		| 'onAddHabitSuccess'
		| 'onAddHabitFailed'
		| 'onDeleteHabitPending'
		| 'onDeleteHabitSuccess'
		| 'onDeleteHabitFailed'
		| 'onUpdateHabitPending'
		| 'onUpdateHabitSuccess'
		| 'onUpdateHabitFailed';
}

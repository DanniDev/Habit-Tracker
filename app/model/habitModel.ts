import mongoose from 'mongoose';
import { NewHabitProps } from '../types/habit.model';

const Schema = mongoose.Schema;

const habitSchema = new Schema<NewHabitProps>({
	title: {
		type: String,
		required: true,
	},
	goal: {
		type: Number,
		required: true,
	},
	achieved: {
		type: Number,
		default: 0,
	},
	yearCreated: {
		type: String,
	},
	isCompleted: {
		type: Boolean,
	},
	completedAt: {
		type: String,
	},
	checked: {
		type: Boolean,
	},
	daySelection: [
		{
			month: { type: String },
			days: [
				{
					day: { type: Number },
					isChecked: { type: Boolean },
				},
			],
		},
	],
});

export default mongoose.models.Habits || mongoose.model('Habits', habitSchema);

import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
// import TableItem from './TableItem';
import AddHabitModal from './AddHabitModal';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { NewHabitProps, daySelectionTypes } from '../types/habit.model';
import { IoFitnessSharp } from 'react-icons/io5';
import { BsFire } from 'react-icons/bs';
import { RiBarChartFill } from 'react-icons/ri';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	deleteHabit,
	getHabits,
	setError,
	setStatus,
} from '@/lib/redux/slices/habitSlice';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MdDone } from 'react-icons/md';

const Dashboard = () => {
	let pathname = usePathname();
	pathname = pathname.toLocaleLowerCase();

	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const { data: session, status: sessionStatus } = useSession();

	const [searchedHabits, setSearchedHabits] = useState<NewHabitProps[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const [selectAll, setSelectAll] = useState(false);

	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [numberOfHabitChecked, setNumberOfHabitChecked] = useState(0);
	const userInput = useRef<HTMLInputElement | null>(null);

	const habits = useAppSelector((state) => state.habit.habits);
	const status = useAppSelector((state) => state.habit.status);
	const dispatch = useAppDispatch();

	useEffect(() => {
		async function fetchHabits() {
			dispatch(setStatus('pending'));
			try {
				const res = await fetch('/api/habits');

				const data = await res.json();
				const foundHabits: NewHabitProps[] = data.data;

				dispatch(getHabits(foundHabits));
				dispatch(setStatus('idle'));
				setLoading(false);

				JSON.stringify(localStorage.setItem('habits', data.data));
				return;
			} catch (error: any) {
				const errMsg = error.response.data.message;
				toast.error(errMsg);
				dispatch(setError(errMsg));
				dispatch(setStatus('idle'));
				setLoading(false);
			}
		}
		if (pathname.toLocaleLowerCase() === '/dashboard' && session) {
			fetchHabits();
		}
		if (sessionStatus === 'unauthenticated' && !session) {
			router.push('/account/login', { scroll: false });
		}
	}, [session, sessionStatus]);

	const completedHabits = habits
		? habits.filter((habit) => habit.isCompleted)
		: [];
	const habitsNotCompleted = habits
		? habits.filter((habit) => !habit.isCompleted)
		: [];

	const [habitListItems, setHabitListItems] =
		useState<NewHabitProps[]>(completedHabits);

	// Calculate the overall completion rate
	const checkedDaysOfAllHabits = habits
		? ([] as { day: number; isChecked: boolean }[]).concat(
				...habits.flatMap((habit) =>
					habit.daySelection.map((el) => {
						return el.days.filter((day) => day.isChecked);
					})
				)
		  )
		: [];

	let completionRate: number = (checkedDaysOfAllHabits.length / 365) * 100;
	completionRate = Math.round(completionRate);

	// Handle seachbar
	const onHabitSearch = (event: ChangeEvent<HTMLInputElement>) => {
		userInput.current!.value = event.target.value;

		const searchInput = userInput.current!.value;
		if (completedHabits.length) {
			if (searchInput.length > 0) {
				setIsTyping(true);
			} else {
				setIsTyping(false);
			}

			const matchingHabits = completedHabits.filter((habit) => {
				// Convert numeric fields to strings for comparison
				const achievedStr = habit.achieved.toString();
				const goalStr = habit.goal.toString();
				const yearCreatedStr = habit.yearCreated!;

				// Check if any of the fields contain the user's input (case-insensitive)
				return (
					habit.title
						.replace(/\s/g, '')
						.toLowerCase()
						.includes(searchInput.toLowerCase()) ||
					achievedStr.includes(searchInput) ||
					goalStr.includes(searchInput) ||
					yearCreatedStr.includes(searchInput)
				);
			});

			setSearchedHabits(matchingHabits);
		}
	};

	// Handle single check state
	const handleCheckChange = (id: string) => {
		setHabitListItems((prevItems) => {
			const prev = prevItems.map((habit) => {
				if (habit._id === id) {
					return { ...habit, checked: !habit.checked };
				}
				return habit;
			});

			const habitChecked = prev.filter((habit) => habit.checked);
			setNumberOfHabitChecked(habitChecked.length);
			updateSelectedIds(prev);
			return prev;
		});
	};

	// Handle select all state
	const handleSelectAllChange = () => {
		const toggleSelectAll = !selectAll;
		setSelectAll(toggleSelectAll);

		setHabitListItems((prevItems) => {
			const prev = prevItems.map((habit) => ({
				...habit,
				checked: toggleSelectAll,
			}));
			const habitChecked = prev.filter((habit) => habit.checked);
			setNumberOfHabitChecked(habitChecked.length);
			updateSelectedIds(prev);
			return prev;
		});
	};

	// update habit checked field based on the checkbox value
	const updateSelectedIds = (updatedHabitItems: NewHabitProps[]) => {
		const selectedIds = updatedHabitItems
			.filter((habit) => habit.checked)
			.map((habit) => habit._id);
		setSelectedIds(selectedIds);
	};

	// Calcualte the overall highest streak
	const calculateLongestStreak = () => {
		let streak = 0,
			longestStreak = 0;

		const habitsDayActivities = habits
			? ([] as { day: number; isChecked: boolean }[]).concat(
					...habits.flatMap((habit) =>
						habit.daySelection.map((el) => {
							return el.days.map((day) => {
								return {
									day: day.day,
									isChecked: day.isChecked,
								};
							});
						})
					)
			  )
			: [];

		for (const day of habitsDayActivities) {
			if (day!.isChecked) {
				streak++;
			} else {
				longestStreak = Math.max(longestStreak, streak);
				streak = 0;
			}
		}

		return longestStreak;
	};

	const longestStreak = calculateLongestStreak();

	// Delete single or multiple completed habits
	const onHabitDelete = async (id: string | string[]) => {
		try {
			dispatch(setStatus('onDeleteHabitPending'));
			const res = await axios.delete('/api/habits', {
				data: JSON.stringify({ habitId: id }),
			});

			const { data } = res;

			dispatch(deleteHabit(data.deletedHabitIds));
			dispatch(setStatus('onDeleteHabitSuccess'));

			toast.success('Successfully deleted!');
		} catch (error: any) {
			dispatch(setStatus('onDeleteHabitFailed'));
			console.log(error);
			toast.error('Failed to delete!');
		}
	};

	return (
		<div className='pl-4'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-gray-900 font-bold text-[26px]'>Dashboard</h1>
				<AddHabitModal />
			</div>
			<div className='grid-container bg-white rounded-md p-5 pb-2'>
				<div className='grid grid-cols-4 gap-3'>
					<div className='column-1 bg-red-100 rounded-md p-5'>
						<div className=' max-w-[40px] max-h-[40px] rounded-full p-2 bg-red-500 flex justify-center items-center'>
							<RiBarChartFill size='60' className='text-white' />
						</div>
						<h6 className='font-bold text-1xl pt-3'>{completionRate}%</h6>
						<p className='text-gray-600 leading-tight text-sm'>
							Completion Rate
						</p>
					</div>
					<div className='column-2 bg-yellow-100 rounded-md p-5'>
						<div className=' max-w-[40px] max-h-[40px] rounded-full p-2 bg-orange-500 flex justify-center items-center'>
							<BsFire size='60' className='text-white' />
						</div>
						<h6 className='font-bold text-1xl pt-3'>
							{longestStreak}
							{''} {longestStreak > 1 ? 'DAYS' : 'DAY'}
						</h6>
						<p className='text-gray-600 leading-tight text-sm'>
							Longest Streak
						</p>
					</div>
					<div className='column-3 bg-green-100 rounded-md p-5'>
						<div className=' max-w-[40px] max-h-[40px] rounded-full p-2 bg-green-500 flex justify-center items-center'>
							<MdDone size='60' className='text-white' />
						</div>
						<h6 className='font-bold text-1xl pt-3'>
							{completedHabits.length}
						</h6>
						<p className='text-gray-600 leading-tight text-sm'>Marked Done</p>
					</div>
					<div className='column-4 bg-violet-100 rounded-md p-5'>
						<div className=' max-w-[40px] max-h-[40px] rounded-full p-2 bg-violet-500 flex justify-center items-center'>
							<IoFitnessSharp size='60' className='text-white' />
						</div>
						<h6 className='font-bold text-1xl pt-3'>
							{habitsNotCompleted.length}
						</h6>
						<p className='text-gray-600 leading-tight text-sm'>
							Habits Running
						</p>
					</div>
				</div>
				<div className='completed mt-10'>
					<div className='header flex justify-between items-center'>
						<div className='hcol-1 pl-1'>
							<h2 className='text-gray-900 mb-2 font-medium'>
								Completed Habits
							</h2>
							<p className='text-gray-600 leading-tight text-sm'>
								A list of all habits completed
							</p>
						</div>
						<div className='hcol-2 flex items-center'>
							{numberOfHabitChecked > 1 && (
								<button
									onClick={() => onHabitDelete(selectedIds)}
									className=' bg-red-500 outline-none hover:bg-red-600 font-medium text-sm text-white mr-4 p-2 pl-2 rounded-md'
								>
									Delete All
								</button>
							)}
							<div className=''>
								<label htmlFor='table-search' className='sr-only'>
									Search
								</label>
								<div className='relative'>
									<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
										<svg
											className='w-4 h-4 text-gray-500 dark:text-gray-400'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 20 20'
										>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
											/>
										</svg>
									</div>
									<input
										ref={userInput}
										onChange={onHabitSearch}
										type='text'
										id='table-search-users'
										className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='Search for habit'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='tbody mt-8'>
						<div className='relative overflow-x-auto sm:rounded-lg'>
							<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
								<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-[1px] border-gray-200'>
									<tr>
										<th scope='col' className='p-4'>
											<div className='flex items-center'>
												<input
													// checked={selectAll}
													onChange={handleSelectAllChange}
													id='checkbox-all-search'
													type='checkbox'
													className='cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
												/>
												<label
													htmlFor='checkbox-all-search'
													className='sr-only'
												>
													checkbox
												</label>
											</div>
										</th>
										<th scope='col' className='px-6 py-3 font-bold'>
											Name
										</th>
										<th scope='col' className='px-6 py-3 font-bold'>
											Achievement
										</th>
										<th scope='col' className='px-6 py-3 font-bold'>
											Completed
										</th>
										<th scope='col' className='px-6 py-3 font-bold'>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{isTyping &&
										searchedHabits.length > 0 &&
										// searchedHabits.map((habit) => (
											// <TableItem
											// 	onDeleteHandler={(event) => onHabitDelete([habit._id])}
											// 	onCheckedHandler={() => handleCheckChange(habit._id)}
											// 	isChecked={habit.checked!}
											// 	key={habit._id}
											// 	habit={habit}
											// />

											"Hello"
										// ))
										}

									{!isTyping &&
										completedHabits.length > 0 &&
										habitListItems.map((habit) => (
											// <TableItem
											// 	onDeleteHandler={(event) => onHabitDelete([habit._id])}
											// 	onCheckedHandler={() => handleCheckChange(habit._id)}
											// 	isChecked={habit.checked!}
											// 	key={habit._id}
											// 	habit={habit}
											// />

											"Hello"
										))}
								</tbody>
							</table>
							{completedHabits.length > 5 && (
								<p className='text-gray-500 mt-6 pl-4 text-sm'>
									{' '}
									showing 5 out of {completedHabits.length} Habits
								</p>
							)}{' '}
							{completedHabits && completedHabits.length > 5 && (
								<p className='text-gray-500 mt-6 pl-4 text-sm'>
									{' '}
									showing {completedHabits.length} out of{' '}
									{completedHabits.length} Habits
								</p>
							)}
							{!completedHabits.length && (
								<div className='text-center text-sm text-gray-400 py-16 flex items-center justify-center'>
									<span>Habit completed will be shown here.</span>
								</div>
							)}
							{isTyping && !searchedHabits.length && (
								<div className='text-center text-sm text-gray-400 py-16 flex items-center justify-center'>
									<span>Your search did not match any habit.</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

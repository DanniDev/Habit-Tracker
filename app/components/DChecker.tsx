'use client';
import React, { ChangeEvent, useState } from 'react';
import { DailyStatusProps } from '../types/habit.model';

import clsx from 'clsx';
import axios from 'axios';

export const DailyStatusChecker = (props: DailyStatusProps) => {
	const [isChecked, setIschecked] = useState(props.completed);

	const onCheckedHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		const targetElement = event.target;
		const { name: checkedDay, id: habitId, checked } = targetElement;
		try {
			const res = await axios.put(
				'/api/habits',
				JSON.stringify({
					id: habitId,
					day: Number(checkedDay),
					isChecked: checked,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			console.log(res.data.success);
		} catch (error: any) {
			const { message } = error.response.data;
			console.log(message);
		}
	};
	return (
		<div className='p-0 border-[1px] border-l-0 border-t-0 border-gray-200 list'>
			<div className='flex items-center check-wrapper'>
				<input
					checked={props.completed}
					id={props.habitId}
					name={props.day.toString()}
					onChange={onCheckedHandler}
					type='checkbox'
					className='cursor-pointer opacity-0 absolute h-8 w-8'
				/>
				<div className='border-0 border-t-0  border-gray-200 w-full h-10 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500'>
					<svg
						className={clsx(
							'fill-current hidden w-[10px] h-3 text-gray-600 pointer-events-none',
							{
								'border-0 !block': props.completed,
							}
						)}
						version='1.1'
						viewBox='0 0 17 12'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g fill='none' fillRule='evenodd'>
							<g transform='translate(-9 -11)' fill='#888' fillRule='nonzero'>
								<path d='m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z' />
							</g>
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
};

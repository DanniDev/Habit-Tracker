'use client';
import React, { ChangeEvent, useState } from 'react';
import { DailyStatusProps } from '../habit.model';

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
		<div className='p-0 list'>
			<div className='flex items-center check-wrapper'>
				<div className='w-6 h-6 border-[1.5px] border-orange-400 rounded-full'></div>
			</div>
		</div>
	);
};

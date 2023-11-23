import React from 'react';
import { DailyStatusChecker } from './DailyChecker';
import { v4 as uuidV4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';

export default function Calendar() {
	const dispatch = useAppDispatch();
	const habits = useAppSelector((state) => state.habit.habits);

	return (
		<div className='p-0 bg-white  border-gray-100 border-[1px] rounded-md'>
			<div className='border-[0px] border-b-0 border-gray-200 h-fit'>
				<div
					className='grid border-b-[1px] border-gray-200'
					style={{ gridTemplateColumns: 'repeat(31, minmax(0, 1fr))' }}
				>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						M
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						W
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						F
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						M
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						W
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						F
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						M
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						W
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						F
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						M
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						W
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						F
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						S
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						M
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						T
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 text-center text-[10px] text-gray-600'>
						W
					</span>
				</div>
				<div
					className='grid border-b-[1px] border-gray-200'
					style={{ gridTemplateColumns: 'repeat(31, minmax(0, 1fr))' }}
				>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						1
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						2
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						3
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						4
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						5
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						6
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						7
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						8
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						9
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						10
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						11
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						11
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						13
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						14
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						15
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						16
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						17
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						18
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						19
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						20
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						21
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						22
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						23
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						24
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						25
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						26
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						27
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						28
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						29
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						30
					</span>
					<span className='border-0 border-r-[1px] border-gray-200 p-2 py-3 text-center text-[11px]'>
						31
					</span>
				</div>

				{habits.map((habit) => (
					<div
						key={uuidV4()}
						className='grid checkbox-grid'
						style={{
							gridTemplateColumns: 'repeat(31, minmax(0, 1fr))',
						}}
					>
						{habit.dailyCheckout.map((checkout) => (
							<div key={uuidV4()} className='wrapper'>
								<DailyStatusChecker
									habits={habits}
									completed={checkout.completed}
									habitId={habit._id}
									day={checkout.day}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

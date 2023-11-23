import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Form from './Form';

export default function AddHabitModal() {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<div className='relative inset-0 flex items-center justify-center'>
				<button
					type='button'
					onClick={openModal}
					className='addBtn border-[1.5px] border-blue-300 p-3 pl-2 py-2 flex items-center text-sm rounded-md hover:bg-blue-800 hover:text-white'
				>
					<span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 text-blue-800'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 6v12m6-6H6'
							/>
						</svg>
					</span>
					<span>New Habit</span>
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-[460px] transform overflow-hidden rounded-2xl bg-white p-6 pt-0 text-left align-middle shadow-xl transition-all'>
									<Form onModalClose={closeModal} />

									<div className='mt-1 absolute top-0 right-3'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent px-1 py-1 text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={closeModal}
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='w-5 h-5'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

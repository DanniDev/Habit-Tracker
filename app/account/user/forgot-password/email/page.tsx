'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SuccessPage = () => {
	const params = useSearchParams();

	const email = params.get('acc') ? params.get('acc') : null;
	return (
		<div className='bg-[#f1f1f1] flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md'>
				<h1 className='mb-3 font-bold text-1xl uppercase text-center text-gray-900'>
					Check your inbox
				</h1>
				<p className='text-center text-sm tracking-tigh text-gray-700 pt-2'>
					{email
						? `If a Habit mentor account exists for ${email}`
						: 'If your Habit mentor account exists'}
					, an e-mail will be sent with further instructions.
				</p>
				<p className='text-center pt-3 pb-4 text-[14px] font-lighttext-center text-sm tracking-tigh text-gray-700 py-3'>
					If email was not received please check "Spam" folder or contact us
					support@habitmentor.com
				</p>
				<Link href='/account/login' className=''>
					<button
						type='submit'
						className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]'
					>
						Sign In
					</button>
				</Link>
			</div>
		</div>
	);
};

export default SuccessPage;

'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import logo2 from '../../../../public/images/logo2.png';
import Image from 'next/image';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSession } from 'next-auth/react';

const ForgotPasswordPage = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
	};

	useEffect(() => {
		if (session) {
			router.push('/dashboard');
		}
	}, [session]);

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading(true);

			await axios.post(`/api/auth/account/forgot-password`, {
				email,
			});

			router.push(`/account/user/forgot-password/email?acc=${email}`);
		} catch (error: any) {
			const errorMsg = error.response.data.message;

			console.log(errorMsg);
			toast.error(errorMsg);
			setLoading(false);
		}
	};

	return (
		<div className='bg-[#f1f1f1]flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<Image
						priority={true}
						src={logo2.src}
						width={65}
						height={65}
						alt='Habit Mentor'
						className='mx-auto text-center'
					/>
					<h2 className='mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
						Reset Your Password
					</h2>
					<p className='text-center text-sm tracking-tigh text-gray-700 py-3'>
						In order to get instructions to reset your password, please enter
						your email address associated with your Hub account
					</p>
				</div>
				<form className='space-y-6' onSubmit={onSubmitHandler}>
					<div>
						<div className='mt-2'>
							<input
								onChange={(e) => onChangeHandler(e)}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								placeholder='Enter email address'
								className='pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						{loading ? (
							<button
								disabled
								type='button'
								className='w-full cursor-no-drop justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm bg-gray-200 flex items-center'
							>
								<ClipLoader color={'#fff'} loading={loading} size={18} />
								<span className='pl-2'>Please wait...</span>
							</button>
						) : (
							<button
								type='submit'
								className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]'
							>
								Send instructions
							</button>
						)}
					</div>
				</form>

				<p className='mt-2 text-center text-sm text-gray-500'>
					Don't have an account?{' '}
					<Link
						href='/account/signup'
						className='font-semibold leading-6 text-[#52cca5] hover:text-[#49bb97]'
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;

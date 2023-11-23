'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BiError } from 'react-icons/bi';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
	const { data: session } = useSession();
	const searchParams = useSearchParams();
	const router = useRouter();

	const [verifyTokenLoading, setverifyTokenLoading] = useState(true);
	const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);
	const [userIdFromToken, setUserIdFromToken] = useState<false | string>(false);
	const [userInputData, setUserInputData] = useState({
		password: '',
		confirmPassword: '',
	});

	const verifyToken: string | null = searchParams.get('verifyToken');

	const email: string | null = searchParams.get('acc');

	useEffect(() => {
		setverifyTokenLoading(true);

		const validateToken = async () => {
			try {
				const res = await axios.get(
					`/api/auth/account/password-reset?token=${verifyToken}`
				);
				setUserIdFromToken(res.data.id);
				setverifyTokenLoading(false);
				console.log('valid token', res.data);
			} catch (error: any) {
				console.log(error.message);
				setverifyTokenLoading(false);
				setUserIdFromToken(false);
			}
		};
		if (session) {
			router.push('/dashboard');
		}
		validateToken();
		if (!session && !verifyToken && !email) {
			router.push('/account/login');
		}
	}, [verifyToken, email, resetSuccess, session]);

	const { password, confirmPassword } = userInputData;

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		setUserInputData({ ...userInputData, [name]: value });
	};

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (password === confirmPassword) {
			try {
				setResetPasswordLoading(true);

				const { data } = await axios.post('/api/auth/account/password-reset/', {
					password,
					id: userIdFromToken,
				});

				setResetSuccess(true);
				setUserInputData({ password: '', confirmPassword: '' });
				setResetPasswordLoading(false);
			} catch (error: any) {
				setResetPasswordLoading(false);
				setResetSuccess(false);
			}
		} else {
			toast.error('Password do not match!');
		}
	};

	return (
		<div className='bg-[#f1f1f1] flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
			{verifyTokenLoading && <LoadingSpinner loading={verifyTokenLoading} />}
			{!verifyTokenLoading && !resetSuccess && userIdFromToken && !session && (
				<div className='sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md'>
					<h1 className='mb-8 font-bold text-1xl uppercase'>
						Create new password
					</h1>
					<form className='space-y-6' onSubmit={onSubmitHandler}>
						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
							<div className='mt-2'>
								<input
									onChange={onChangeHandler}
									id='password'
									name='password'
									type='password'
									required
									placeholder='Enter password'
									className='pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='confirmPassword'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Confirm password
							</label>
							<div className='mt-2'>
								<input
									onChange={onChangeHandler}
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									required
									placeholder='Confirm password'
									className='pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>

						<div>
							{resetPasswordLoading ? (
								<button
									disabled
									type='button'
									className='w-full cursor-no-drop justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm bg-gray-200 flex items-center'
								>
									<ClipLoader
										color={'#fff'}
										loading={resetPasswordLoading}
										size={18}
									/>
									<span className='pl-2'>Please wait...</span>
								</button>
							) : (
								<button
									type='submit'
									className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]'
								>
									Reset Password
								</button>
							)}
						</div>
					</form>

					<p className='mt-3 text-center text-sm text-gray-500'>
						Don't have an account?{' '}
						<Link
							href='/account/signup'
							className='font-semibold leading-6 text-[#52cca5] hover:text-[#49bb97]'
						>
							Sign Up
						</Link>
					</p>
				</div>
			)}
			{!verifyTokenLoading && !userIdFromToken && !resetSuccess && (
				<div className='sm:mx-auto sm:w-full sm:max-w-sm bg-red-100 p-8 rounded-md'>
					<div className='flex justify-center'>
						<BiError size={80} className='text-red-500' />
					</div>
					<h1 className='mb-4 mt-2 font-medium text-md text-center text-red-700 '>
						This page has expired!
					</h1>

					<div>
						<Link href='/account/login'>
							<button
								type='submit'
								className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]'
							>
								Sign In{' '}
							</button>
						</Link>
					</div>
				</div>
			)}

			{!session && resetSuccess && (
				<div className='sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-md'>
					<p className='text-center text-md tracking-tigh text-gray-700 pt-2 pb-4'>
						You have successfully reset your password. You can sign in to your
						account!
					</p>

					<div>
						<Link href='/account/login'>
							<button
								type='submit'
								className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]'
							>
								Sign In{' '}
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ResetPasswordPage;

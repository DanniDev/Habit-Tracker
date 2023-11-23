'use client';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import logo2 from '../../../public/images/logo2.png';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

export default function LoginPage() {
	const router = useRouter();
	const pathname = usePathname();
	let params = useSearchParams();

	const redirectUrl = params.get('callbackUrl')
		? params
				.get('callbackUrl')
				?.slice(params.get('callbackUrl')?.lastIndexOf('/'))
		: '/dashboard';

	const { data: session, status } = useSession();

	useEffect(() => {
		console.log('sesion', session);
		if (status !== 'loading' && session !== null) {
			router.push(redirectUrl!, { scroll: false });
		}
	}, [status, session, redirectUrl]);

	const [loading, setLoading] = useState(false);
	const [userInput, setUserInput] = useState({
		email: '',
		password: '',
	});

	const { email, password } = userInput;

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;

		const { name, value } = target;

		setUserInput({ ...userInput, [name]: value });
	};

	const onSubmitHandler = async (event: FormEvent) => {
		event.preventDefault();
		setLoading(true);
		const res = await signIn('credentials', {
			redirect: false,
			email,
			password,
			usertype: 'oldUser',
		});

		if (res?.error) {
			setLoading(false);
			if (res.error === 'CredentialsSignin') {
				toast.error('Something went wrong, please try again!');
				router.push(pathname);
			} else {
				toast.error(res.error);
			}
		} else {
			setLoading(false);
			toast.success('You have successfully logged in');
		}

		console.log(res)
	};

	return (
		<div className='bg-[#f1f1f1] flex min-h-screen flex-1 flex-col justify-center px-6 py-8 lg:px-8'>
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
					Log In
				</h2>
				<p className='text-center text-md tracking-tight text-gray-700'>
					Welcome back! Please enter your details.
				</p>
			</div>

			<div className='mt-3 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-md py-4 px-8'>
				<form className='space-y-6' onSubmit={onSubmitHandler}>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email
						</label>
						<div className='mt-2'>
							<input
								onChange={onChangeHandler}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								placeholder='Enter your email'
								className='pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Password
							</label>
							<div className='text-sm'>
								<Link
									href='/account/user/forgot-password'
									className='font-semibold text-[#52cca5] hover:text-[#49bb97]'
								>
									Forgot password?
								</Link>
							</div>
						</div>
						<div className='mt-2'>
							<input
								onChange={onChangeHandler}
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								placeholder='********'
								className='pl-4 block w-full rounded-full border-0 py-2 text-gray-900 shadow-sm ring-[1px] ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

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
						<>
							<div>
								<button
									type='submit'
									className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52cca5] bg-[#52cca5] hover:bg-[#49bb97]'
								>
									Submit
								</button>
							</div>
							<div className='!mt-3'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-full px-3 py-2 text-sm font-medium leading-6 text-gray-700
                      shadow-sm 
                      ring-[1px] ring-inset ring-gray-300 focus:ring-[1px] focus:ring-inset focus:ring-gray-300 bg-white hover:bg-gray-50 align-center'
								>
									<FcGoogle size={26} />
									<span className='pl-2'>Sign in with Google</span>
								</button>
							</div>
						</>
					)}
				</form>
			</div>
			<p className='mt-2 text-center text-sm text-gray-500'>
			Don&apos;t have an account?{' '}
				<Link
					href='/account/signup'
					className='font-semibold leading-6 text-[#52cca5] hover:text-[#49bb97]'
				>
					Sign Up
				</Link>
			</p>
		</div>
	);
}

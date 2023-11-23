import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { connectDB } from '../mongodb/db';
import User from '@/app/model/UserModel';
import { generateToken } from '@/app/util/tokenHandler';
import {
	encryptPassword,
	verifyPassword,
} from '@/app/util/passwordHashHandler';
import { userType } from '@/app/types/user.model';

const authOption: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'your email',
				},
				password: { label: 'Password', type: 'password' },
				usertype: { label: 'usertype', type: 'text' },
			},
			async authorize(credentials, req) {
				if (!credentials) {
					return null;
				}
				try {
					await connectDB();

					const { usertype, email, password, username } = credentials!;

					//check if user exist in DB
					const foundUser = await User.findOne({ email });

					if (usertype === 'newUser') {
						if (foundUser) {
							return { error: 'User already exist!' };
						}
						// save new user
						const hashedPassword = await encryptPassword(password);

						const newUser = new User({
							email,
							password: hashedPassword,
							name: username,
							picture: '',
						});

						newUser.passwordReset.expiryDate = new Date(0);
						newUser.passwordReset.verifyToken = '';

						newUser.emailVerify.expiryDate = new Date(0);
						newUser.emailVerify.verifyToken = '';

						const savedUser: userType = await newUser.save();

						//generate email verification toke
						// then update user & send email
						const tokenData = generateToken(savedUser._id!);

						const { tokenExpiration, token } = await tokenData;

						const updatedUser = await User.findOneAndUpdate(
							{ _id: savedUser._id },
							{
								$set: {
									emailVerify: {
										verifyToken: token,
										expiryDate: tokenExpiration,
									},
								},
							},
							{ new: true }
						);

						// await sendEmail(updatedUser.email, token, 'verifyEmail');
						const user: typeof updatedUser = {
							id: updatedUser._id,
							isVerified: updatedUser.isVerified,
							email: updatedUser.email,
							name: updatedUser.name,
							picture: updatedUser.picture,
						};
						return user;
					} else if (usertype === 'oldUser') {
						if (!foundUser) {
							return { error: 'Invalid email or password!' };
						}

						const correctPassword = await verifyPassword(
							password,
							foundUser.password
						);

						if (correctPassword) {
							return {
								id: foundUser._id,
								email: foundUser.email,
								isVerified: foundUser.isVerified,
								name: foundUser.name,
								picture: foundUser.picture,
							};
						}

						return {
							error: 'Invalid email or password!',
						};
					} else {
						return null;
					}
				} catch (error) {
					return null;
				}
			},
		}),
	],

	callbacks: {
		async signIn({ user, email, profile, account, credentials }) {
			// console.log('profile =>', profile);

			if (account?.provider === 'credentials') {
				if (user?.error) {
					throw Error(user?.error);
				}

				return true;
			}

			return true;
		},
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token, user }) {
			session.user.id = token.id as string;
			session.user.picture = token.picture!;
			session.user.isVerified = token.isVerified as boolean;
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/account/login',
	},
};

export default NextAuth(authOption);
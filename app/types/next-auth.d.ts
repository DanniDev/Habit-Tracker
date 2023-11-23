import { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			error?: string;
			picture: string;
			isVerified: boolean;
		} & DefaultSession['user'];
	}
	interface User extends DefaultUser {
		id: string;
		picture: string;
		isVerified: boolean;
		error?: string;
	}
}

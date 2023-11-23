export { default } from 'next-auth/middleware';
export const config = {
	matcher: ['/dashboard', '/', '/habits', '/account/user/profile'],
};

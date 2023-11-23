export interface userType {
	_id?: string;
	name: string;
	email: string;
	password: string;
	picture?: string;
	isVerified: boolean;
	passwordReset: {
		verifyToken: string;
		expiryDate: Date;
	};
	emailVerify: {
		verifyToken: string;
		expiryDate: Date;
	};
}

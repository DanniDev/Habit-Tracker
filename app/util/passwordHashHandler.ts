import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
	const salt = bcrypt.genSaltSync(10);

	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
};

export const verifyPassword = async (
	password: string,
	hashedPassword: string
) => {
	return bcrypt.compare(password, hashedPassword);
};

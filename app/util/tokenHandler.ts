import * as jwt from 'jsonwebtoken';

export const generateToken = async (_id: string) => {
	const expiresIn = 60 * 60;

	const tokenExpiration = new Date(Date.now() + expiresIn * 1000);

	const token = jwt.sign(
		{
			userId: _id,
		},
		process.env.JWT_SECRET!,
		{ expiresIn }
	);

	return {
		tokenExpiration,
		token,
	};
};

export const verifyToken = async (token: string): Promise<string | false> => {
	try {
		const decoded = await (<jwt.JwtPayload>(
			jwt.verify(token, process.env.JWT_SECRET!)
		));

		return decoded.userId!;
	} catch (error: any) {
		return false;
	}
};

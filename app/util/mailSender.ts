import nodemailer from 'nodemailer';

export const sendEmail = (
	email: string,
	token: string,
	mailType: 'verifyEmail' | 'passwordReset'
) => {
	const mailDescription =
		mailType === 'verifyEmail'
			? 'You can also copy the link below to your browser to verify your email.'
			: 'You can also copy the link below to your browser and follow the instruction to reset your Habit mentor password.';

	const mailUrl =
		mailType === 'verifyEmail'
			? `${process.env.NEXTAUTH_URL}/account/user/verifyAcc?acc=${email}&verifyToken=${token}`
			: `${process.env.NEXTAUTH_URL}/account/user/forgot-password/reset?acc=${email}&verifyToken=${token}`;

	const mailButtonText =
		mailType === 'verifyEmail' ? 'Verify email' : 'Rest your password';

	const transporter = nodemailer.createTransport({
		host: 'server233.web-hosting.com',
		port: 465,
		secure: true,
		auth: {
			user: 'info@merkadobarkada.com',
			pass: 'UPWORK_TEMP',
		},
	});

	async function main() {
		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Habit Mentor" <info@merkadobarkada.com>', // sender address
			to: email, // list of receivers
			subject: 'Habit Mentor password reset email',
			text: 'Hello world?', // plain text body
			html: `<html><body><div style="padding-top:40px; padding-bottom:40px;"><div>
            <a href=${mailUrl} style="text-align:center;  text-decoration: none !important; color:#ffffff; font-family: arial, san-serif;">
			<button type='button' style="text-align:center; display:block; max-width:180px; margin-bottom: 2rem; padding:10px 12px; text-decoration: none; color:#ffffff; background-color:#52cca5 !important; border-radius: 75%; text-center; font-family: arial, san-serif;">${mailButtonText} </button></a>
  <p style="padding-top:20px;"> ${mailDescription}</p>
            </div><div style="padding-bottom:40px;">${mailUrl}</div></div></body></html>`, // html body
		});

		console.log('Message sent: %s', info.messageId);
	}

	main().catch(console.error);
};

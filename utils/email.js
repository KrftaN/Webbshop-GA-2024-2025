const nodemailer = require("nodemailer");

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.name = user.name();
		this.url = url;
		this.from = "Klasskassan UF Kontakt  <kontakt@klasskassan-uf.se>";
	}
	newTransport() {
		if (process.env.NODE_ENV === "production") {
			return nodemailer.createTransport({
				host: process.env.SMTP_SERVER,
				port: Number(process.env.SMTP_PORT),
				secure: true, // or false, depending on your email provider's requirements
				auth: {
					user: process.env.SMTP_USERNAME,
					pass: process.env.SMTP_PASSWORD,
				},
			});
		}

		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	send(templete, subject) {}

	sendConfirmEmail() {
		this.send("emailConfirmation", "Bekräfta din e-post | Klasskassan UF");
	}
};

const sendEmail = async (options) => {
	// 1) Create a transporter
	let transporter = nodemailer.createTransport({
		host: process.env.SMTP_SERVER,
		port: Number(process.env.SMTP_PORT),
		secure: true, // or false, depending on your email provider's requirements
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	if (process.env.NODE_ENV == "development") {
		console.log("Sending mail to mailtrap!");

		transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	// 2) Define the email options
	const mailOptions = {
		from: "Klasskassan UF Kontakt  <kontakt@klasskassan-uf.se>",
		to: options.email,
		subject: options.subject,
		text: options.message,
		// html:
	};

	// 3) Actually send the email
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

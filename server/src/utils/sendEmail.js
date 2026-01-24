const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create transporter
    // For production, use a real SMTP service like SendGrid, Mailgun, or AWS SES
    // For development, we can use Ethereal (https://ethereal.email) or just log it if no creds

    // Using Ethereal for dev if no env vars present, essentially
    let transporter;

    if (process.env.SMTP_HOST) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    } else {
        // Fallback for dev without credentials - Log to console mostly or use test account
        // We'll create a test account for now to ensure it "works" without crashing
        const testAccount = await nodemailer.createTestAccount();

        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        console.log("Using Ethereal Mail (Dev Mode)");
    }

    const message = {
        from: `${process.env.FROM_NAME || 'Medyxra Support'} <${process.env.FROM_EMAIL || 'noreply@medyxra.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html // could add html template later
    };

    const info = await transporter.sendMail(message);

    if (!process.env.SMTP_HOST) {
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};

module.exports = sendEmail;

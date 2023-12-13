const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body; // Replace with your form fields

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service: Gmail, Outlook, etc.
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.EMAIL_PASSWORD, // Your email password
        },
    });

    try {
        await transporter.sendMail({
            from: email, // Sender address
            to: process.env.EMAIL, // Your email
            subject: `New message from ${name}`, // Subject line
            text: message, // Plain text body
        });

        res.send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

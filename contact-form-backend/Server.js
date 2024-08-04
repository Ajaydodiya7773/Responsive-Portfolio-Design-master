const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Add this line

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Add this line

// Handle POST request to /contact
app.post('/contact', (req, res) => {
    const { name, email, subject, description } = req.body;

    // Log form data (for debugging purposes)
    console.log('Form Data:', { name, email, subject, description });

    // Optional: Send an email with the form data
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajputajay54593@gmail.com',
            pass: '@'
        }
    });

    const mailOptions = {
        from: email,
        to: 'rajputajay54593@gmail.com',
        subject: `Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nDescription:\n${description}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send message.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
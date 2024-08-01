// index.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Example list of recipients
const recipients = [
  { name: 'Kaushal', email: 'kaushalshah259@gmail.com' },
  { name: 'Malav', email: 'malavstorage@gmail.com' },
  { name: 'Rohan', email: 'rohanashitshah@gmail.com' },
  { name: 'Bhavya', email: 'shahbhavya110@gmail.com' },
  // Add more recipients as needed
];

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Send emails function
function sendEmails() {
  recipients.forEach(recipient => {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: recipient.email,
      subject: 'Urgent Request to Cancel the Great Nicobar Island Development Project',
      text: `Dear ${recipient.name},\n\nI am writing to express my grave concern regarding...`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending to ${recipient.email}: ${error}`);
      } else {
        console.log(`Email sent to ${recipient.email}: ${info.response}`);
      }
    });
  });
}

// Endpoint to trigger email sending
app.get('/send-emails', (req, res) => {
  sendEmails();
  res.send('Emails are being sent.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

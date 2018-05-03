'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { MAILTO, MAILFROM, USER, PASSWORD, SITENAME } = require('./config');
const PORT = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const { validateMailForm } = require('./validators');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('combined'));

app.get('/api', (req, res) => {
    res.json({ok: true});
});

app.post('/api/sendmail', jsonParser, (req, res) => {
    console.log(req.body);
    const formValid = validateMailForm(req.body);
    if (formValid !== 'ok') {
        return res.status(422).json(formValid);
    }

    const { name, email, org, phone, message } = req.body;

    const mailOptions = {
        from: MAILFROM,
        to: MAILTO,
        subject: `New contact from ${name} through ${SITENAME}`,
        text: `From: ${name} (${email}) ${org ? `\n ${org}` : ''} ${phone ? `\n ${phone}` : ''} ----- \n ${message}`,
        html: `From <strong>${name}</strong> (${email}) ${org ? `<br>${org}</br>` : ''} ${phone ? `<br>${phone}<br>` : ''}<hr><p>${message}</p>`
    };

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: USER,
            pass: PASSWORD
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.status(500).json('We encountered an unexpected error sending your email')
        }

        return res.status(201)
    })

});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};
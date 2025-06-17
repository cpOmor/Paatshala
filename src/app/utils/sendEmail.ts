/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import config from '../config';
import { TEmailInfo } from './utils.interface';
import { forbidden } from './errorfunc';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: config.smtp_mail,
    pass: config.smtp_password,
  },
});

const sendEmail = async (emailData: TEmailInfo) => {
  try {
    const mailOptions = {
      from: `"Paatshala" <${config.smtp_mail}>`,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.body,
    };

    if (!mailOptions.to) {
      throw forbidden('No recipient email address defined');
    }

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    throw forbidden('Failed to send the email.');
  }
};

export default sendEmail;

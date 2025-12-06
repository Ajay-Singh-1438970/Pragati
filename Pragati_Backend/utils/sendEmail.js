import nodemailer from "nodemailer";

const sendEmail = async (to, subject, htmlContent) => {
  try {
    console.log("📨 Preparing to send email...");
    console.log("SMTP host:", process.env.SMTP_HOST);
    console.log("SMTP port:", process.env.SMTP_PORT);
    console.log("SMTP user:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      //  tls: {
      //   rejectUnauthorized: false,
      // },
    });

    // Verify SMTP connection first
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");

    await transporter.sendMail({
      from: `"Pragati" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
};

export default sendEmail;

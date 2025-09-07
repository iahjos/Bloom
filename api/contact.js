import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`, // keeps sender as Bloom but still shows name
      replyTo: email, // 👈 ensures when you hit Reply in Gmail, it goes to the sender
      to: process.env.GMAIL_USER,
      subject: "📩 New Contact Form Submission - Bloom Marketing Agency",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #E6154D, #FF6F61); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🌸 Bloom Marketing Agency</h1>
            <p style="margin: 0;">You’ve got a new message!</p>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p><strong style="color:#E6154D;">Name:</strong> ${name}</p>
            <p><strong style="color:#E6154D;">Email:</strong> ${email}</p>
            <p><strong style="color:#E6154D;">Message:</strong></p>
            <p style="background:#f9f9f9; padding:12px; border-left:4px solid #97BD00; border-radius:4px;">
              ${message}
            </p>
          </div>
          <div style="background:#f4f4f4; text-align:center; padding:15px; font-size:0.9rem; color:#666;">
            <p>© ${new Date().getFullYear()} Bloom Marketing Agency</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
}

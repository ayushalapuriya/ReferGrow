import nodemailer from "nodemailer";
import { env } from "@/lib/env";

function smtpConfigured() {
  return Boolean(env.SMTP_HOST && env.SMTP_PORT && env.SMTP_FROM);
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<{ sent: boolean; error?: string }> {
  if (!smtpConfigured()) {
    console.log("[Email] SMTP not configured");
    return { sent: false, error: "SMTP not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    });

    console.log(`[Email] Sending to ${options.to}...`);
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log(`[Email] Successfully sent to ${options.to}`);
    return { sent: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Email] Failed to send:`, errorMsg);
    return { sent: false, error: errorMsg };
  }
}

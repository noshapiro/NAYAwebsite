import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  organization?: string;
  role?: string;
  email?: string;
  reason?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const organization = body.organization?.trim() || "—";
    const role = body.role?.trim() || "—";
    const reason = body.reason?.trim() || "General inquiry";
    const message = body.message?.trim();

    if (!name || !email || !message || message === "—") {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? "noa@nnearu.com";
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Nearu Website <onboarding@resend.dev>";
    const subject = `Contact: ${reason} — ${organization !== "—" ? organization : name}`;

    const html = `
      <h2>Nearu website contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(organization)}</p>
      <p><strong>Role:</strong> ${escapeHtml(role)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Inquiry type:</strong> ${escapeHtml(reason)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><em>Sent from nnearu.com contact form</em></p>
    `;

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent. We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

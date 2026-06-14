import { NextResponse } from "next/server";

const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL ?? "noa@nnearu.com";

type ContactPayload = {
  name?: string;
  organization?: string;
  role?: string;
  email?: string;
  reason?: string;
  message?: string;
};

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

    if (!name || !email || !message) {
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

    const subject = `Contact: ${reason} — ${organization !== "—" ? organization : name}`;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nnearu.com";

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: `${siteUrl}/contact`,
        Origin: siteUrl,
      },
      body: JSON.stringify({
        name,
        email,
        company: organization,
        role,
        inquiry_type: reason,
        message,
        _subject: subject,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = (await response.json()) as { success?: string | boolean; message?: string };

    if (!response.ok || data.success === false || data.success === "false") {
      console.error("FormSubmit error:", data);
      const needsActivation = data.message?.includes("Activation");
      return NextResponse.json(
        {
          success: false,
          message: needsActivation
            ? "Form is being activated — check noa@nnearu.com for the activation link, then try again."
            : data.message || "Failed to send message. Please try again.",
        },
        { status: needsActivation ? 503 : 500 }
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

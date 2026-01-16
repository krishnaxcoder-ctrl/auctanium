import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  firstName: z.string().min(1).min(2).max(50),
  lastName: z.string().min(1).min(2).max(50),
  email: z.string().min(1).email(),
  phone: z.string().min(1).min(10),
  countryCode: z.string().min(1),
  message: z.string().min(1).min(10).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.issues },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, countryCode, message } = result.data;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Auctanium Contact <onboarding@resend.dev>",
      to: ["auctanium@gmail.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>

          <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
            This email was sent from the Auctanium contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

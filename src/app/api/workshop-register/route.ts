import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, mobile, goals } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"AK Portfolio" <${process.env.GMAIL_USER}>`,
            to: 'atichat.khanma2000@gmail.com',
            subject: `🎓 Workshop Interest — ${name}`,
            html: `
                <div style="font-family: monospace; max-width: 600px; padding: 2rem; background: #f5f5f5;">
                    <h2 style="font-family: sans-serif; margin-bottom: 1.5rem; border-bottom: 2px solid #111; padding-bottom: 0.5rem;">
                        New Workshop Registration
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 0.75rem 0; color: #666; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Name</td>
                            <td style="padding: 0.75rem 0; font-size: 1rem; font-weight: bold;">${name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 0.75rem 0; color: #666; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                            <td style="padding: 0.75rem 0;"><a href="mailto:${email}" style="color: #ff3c00;">${email}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                            <td style="padding: 0.75rem 0; color: #666; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">Mobile</td>
                            <td style="padding: 0.75rem 0;">${mobile || '—'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem 0; color: #666; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Goals</td>
                            <td style="padding: 0.75rem 0; line-height: 1.6;">${goals || '—'}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 2rem; font-size: 0.8rem; color: #999;">Sent from atichat.khanma.com — Workshop Registration Form</p>
                </div>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('[workshop-register]', err);
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }
}

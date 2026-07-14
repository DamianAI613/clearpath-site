import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL || 'ClearPath Automation <noreply@clearpathautomation.io>'
const OWNER_EMAIL = 'damianwroblewski2016@gmail.com'

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send notification to Damian
    await resend.emails.send({
      from: FROM,
      to: OWNER_EMAIL,
      subject: `🔔 New ClearPath Inquiry — ${name}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New ClearPath Inquiry</title></head>
<body style="margin:0;padding:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F172A;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="text-align:center;padding-bottom:24px;">
          <div style="display:inline-block;background:#6366F1;color:white;font-weight:800;font-size:1rem;padding:8px 20px;border-radius:8px;letter-spacing:1px;text-transform:uppercase;">
            ClearPath Automation
          </div>
        </td></tr>
        <tr><td style="background:#1E293B;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
          <div style="background:linear-gradient(135deg,#4F46E5,#6366F1);padding:28px 32px;text-align:center;">
            <div style="font-size:2rem;margin-bottom:8px;">📬</div>
            <h1 style="color:white;margin:0;font-size:1.35rem;font-weight:800;">New Project Inquiry</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:0.875rem;">Someone wants to work with ClearPath</p>
          </div>
          <div style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:20px;">
              <tr><td colspan="2" style="background:rgba(255,255,255,0.04);padding:12px 16px;font-weight:700;font-size:0.72rem;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid rgba(255,255,255,0.06);">CONTACT DETAILS</td></tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="padding:12px 16px;color:#64748B;font-size:0.85rem;">Name</td>
                <td style="padding:12px 16px;color:#E2E8F0;font-size:0.85rem;font-weight:600;text-align:right;">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <td style="padding:12px 16px;color:#64748B;font-size:0.85rem;">Email</td>
                <td style="padding:12px 16px;color:#A5B4FC;font-size:0.85rem;font-weight:600;text-align:right;">${email}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#64748B;font-size:0.85rem;">Service Interest</td>
                <td style="padding:12px 16px;color:#E2E8F0;font-size:0.85rem;font-weight:600;text-align:right;">${service || 'Not specified'}</td>
              </tr>
            </table>
            <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;">
              <div style="font-size:0.72rem;font-weight:700;color:#6366F1;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">MESSAGE</div>
              <p style="font-size:0.9rem;color:#CBD5E1;margin:0;line-height:1.7;">${message}</p>
            </div>
            <div style="margin-top:24px;text-align:center;">
              <a href="mailto:${email}?subject=Re: ClearPath Automation Inquiry" style="display:inline-block;background:#6366F1;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:0.9rem;">
                Reply to ${name} →
              </a>
            </div>
          </div>
        </td></tr>
        <tr><td style="text-align:center;padding-top:20px;">
          <p style="font-size:0.75rem;color:#334155;margin:0;">ClearPath Automation · Chicago, IL</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    // Send confirmation to the person who submitted
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>We got your message</title></head>
<body style="margin:0;padding:0;background:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F172A;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td style="text-align:center;padding-bottom:24px;">
          <div style="display:inline-block;background:#6366F1;color:white;font-weight:800;font-size:1rem;padding:8px 20px;border-radius:8px;letter-spacing:1px;text-transform:uppercase;">
            ClearPath Automation
          </div>
        </td></tr>
        <tr><td style="background:#1E293B;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
          <div style="background:linear-gradient(135deg,#4F46E5,#6366F1);padding:32px;text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:8px;">👋</div>
            <h1 style="color:white;margin:0;font-size:1.4rem;font-weight:800;">Message received!</h1>
            <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:0.9rem;">I'll be in touch within 1 business day.</p>
          </div>
          <div style="padding:28px 32px;">
            <p style="font-size:0.95rem;color:#CBD5E1;margin:0 0 20px;line-height:1.7;">
              Hey ${name.split(' ')[0]}, thanks for reaching out to ClearPath Automation. I've received your message about <strong style="color:#A5B4FC;">${service || 'your project'}</strong> and will get back to you shortly.
            </p>
            <div style="background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
              <div style="font-size:0.72rem;font-weight:700;color:#6366F1;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">YOUR MESSAGE</div>
              <p style="font-size:0.875rem;color:#94A3B8;margin:0;line-height:1.6;">${message}</p>
            </div>
            <p style="font-size:0.85rem;color:#475569;margin:0;line-height:1.6;">
              In the meantime, feel free to check out some of my recent work at <a href="https://clearpathautomation.io" style="color:#6366F1;font-weight:600;">clearpathautomation.io</a>.
            </p>
          </div>
          <div style="padding:0 32px 28px;border-top:1px solid rgba(255,255,255,0.06);padding-top:20px;margin-top:4px;">
            <p style="font-size:0.82rem;color:#334155;margin:0;text-align:center;">
              — Damian Wroblewski · ClearPath Automation · Chicago, IL
            </p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact-clearpath]', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

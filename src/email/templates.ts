import { CHALLENGE_TTL_MS } from "../auth/challenges.js";
import { escapeHtml } from "../views/layout.js";
import type { LoginEmail } from "./mailer.js";

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

const TTL_MINUTES = Math.round(CHALLENGE_TTL_MS / 60_000);
const FOOTER = `This expires in ${TTL_MINUTES} minutes and works once. If you didn't try to sign in, you can ignore this email.`;

function htmlShell(title: string, preheader: string, content: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:24px;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1d2330">
  <div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background:#ffffff;border-radius:10px;padding:32px">
      <tr><td>
        ${content}
        <p style="margin:0;font-size:13px;color:#5b6475">${escapeHtml(FOOTER)}</p>
      </td></tr>
    </table>
  </td></tr></table>
</body>
</html>`;
}

export function renderLoginEmail(email: LoginEmail): RenderedEmail {
  if (email.method === "code") {
    const subject = `${email.code} is your login code`;
    // The code goes on the first line so it shows up in notification previews.
    const text = [email.code, "", "Enter this code to sign in.", "", FOOTER].join("\n");
    const c = escapeHtml(email.code);
    const html = htmlShell(
      subject,
      subject,
      `<p style="margin:0 0 12px;font-size:16px">Your login code is:</p>
        <p style="margin:0 0 24px;font-size:34px;font-weight:700;letter-spacing:6px;font-family:ui-monospace,Menlo,Consolas,monospace">${c}</p>`,
    );
    return { subject, text, html };
  }

  const subject = "Your magic link";
  const text = ["Click the link below to sign in:", email.link, "", FOOTER].join("\n");
  const l = escapeHtml(email.link);
  const html = htmlShell(
    subject,
    "Click to sign in",
    `<p style="margin:0 0 24px;font-size:16px">Click the button below to sign in.</p>
        <p style="margin:0 0 24px"><a href="${l}" style="display:inline-block;background:#2f5bea;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:600">Sign in</a></p>
        <p style="margin:0 0 24px;font-size:13px;color:#5b6475;word-break:break-all">Or paste this link into your browser:<br>${l}</p>`,
  );
  return { subject, text, html };
}

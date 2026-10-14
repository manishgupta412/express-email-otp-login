const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape every user-controlled value before putting it in HTML. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => ESCAPES[ch]!);
}

const STYLES = `
:root{
  color-scheme:light;
  --bg:#f2f4f7;--surface:#fff;--hover:#f6f7f9;
  --ink:#1a2230;--muted:#5d6878;--placeholder:#98a2b3;
  --line:#e1e5eb;--line-strong:#c5ccd6;
  --primary:#2457c5;--primary-hover:#1c47a6;--primary-ink:#fff;--primary-soft:#edf2fc;
  --danger:#b42318;--danger-ink:#912018;--danger-soft:#fef3f2;--danger-line:#f5c6c0;
  --notice-ink:#1f4c9e;--notice-soft:#eff4fc;--notice-line:#cbdaf3;
  --success:#1d7445;--success-soft:#ebf6ef;
  --ring:0 0 0 3px rgba(36,87,197,.28);
  --shadow:0 1px 2px rgba(16,24,40,.04),0 12px 32px -16px rgba(16,24,40,.16);
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 16px;
  background:var(--bg);color:var(--ink);
  font:400 16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
.card{width:100%;max-width:420px;min-width:0;background:var(--surface);border:1px solid var(--line);border-radius:16px;
  padding:36px 32px;box-shadow:var(--shadow)}
@media (max-width:480px){.card{padding:28px 20px;border-radius:14px}}

.badge{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;margin-bottom:20px;
  background:var(--primary-soft);color:var(--primary)}
.badge svg{width:22px;height:22px}
.badge.danger{background:var(--danger-soft);color:var(--danger)}
.badge.success{background:var(--success-soft);color:var(--success)}

h1{font-size:1.5rem;line-height:1.25;font-weight:650;letter-spacing:-.015em;margin:0 0 8px}
h1.spaced{margin-bottom:24px}
p{margin:0 0 16px}
.lead{color:var(--muted);margin-bottom:24px}
.lead strong{color:var(--ink);font-weight:600;overflow-wrap:anywhere}
.small{font-size:.875rem;color:var(--muted)}
.center{text-align:center}
a{color:var(--primary);text-underline-offset:2px}
a:hover{color:var(--primary-hover)}
a:focus-visible{outline:none;box-shadow:var(--ring);border-radius:4px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

label,legend{display:block;font-size:.875rem;font-weight:600;margin-bottom:6px;padding:0}
.field{margin-bottom:20px}
input[type=email],input[type=text]{width:100%;height:46px;padding:0 14px;font:inherit;color:var(--ink);
  background:var(--surface);border:1px solid var(--line-strong);border-radius:8px;
  transition:border-color .15s,box-shadow .15s}
input::placeholder{color:var(--placeholder)}
input:focus{outline:none;border-color:var(--primary);box-shadow:var(--ring)}
fieldset{border:0;padding:0;margin:0 0 24px;min-width:0}

.choices{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media (max-width:360px){.choices{grid-template-columns:1fr}}
.choice{position:relative;display:block;margin:0;padding:14px 14px 13px;border:1px solid var(--line-strong);
  border-radius:10px;cursor:pointer;font-weight:400;transition:border-color .15s,background-color .15s}
.choice:hover{border-color:var(--primary)}
.choice input{position:absolute;opacity:0;pointer-events:none}
.choice-title{display:block;font-weight:600;font-size:.9375rem;padding-right:24px}
.choice-desc{display:block;font-size:.8125rem;color:var(--muted);margin-top:2px}
.choice .dot{position:absolute;top:15px;right:14px;width:16px;height:16px;border-radius:50%;
  border:1.5px solid var(--line-strong);background:var(--surface);transition:all .15s}
.choice:has(input:checked){border-color:var(--primary);background:var(--primary-soft);box-shadow:inset 0 0 0 1px var(--primary)}
.choice:has(input:checked) .dot{border-color:var(--primary);background:var(--primary);box-shadow:inset 0 0 0 3px var(--surface)}
.choice:has(input:focus-visible){box-shadow:inset 0 0 0 1px var(--primary),var(--ring)}

.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:46px;padding:10px 16px;
  font:inherit;font-size:.9375rem;font-weight:600;line-height:1.3;text-align:center;text-decoration:none;
  border:1px solid transparent;border-radius:8px;cursor:pointer;
  transition:background-color .15s,border-color .15s,color .15s,opacity .15s}
.btn:focus-visible{outline:none;box-shadow:var(--ring)}
.btn-primary{background:var(--primary);color:var(--primary-ink)}
.btn-primary:hover{background:var(--primary-hover);color:var(--primary-ink)}
.btn-secondary{background:var(--surface);color:var(--ink);border-color:var(--line-strong)}
.btn-secondary:hover{background:var(--hover);color:var(--ink)}
.btn-quiet{background:none;color:var(--primary);min-height:40px;font-weight:500}
.btn-quiet:hover{text-decoration:underline;color:var(--primary-hover)}
.btn:disabled{cursor:not-allowed;opacity:.55}
.btn-quiet:disabled{color:var(--muted);opacity:1;text-decoration:none}
.btn .timer{font-variant-numeric:tabular-nums;font-weight:500;opacity:.85}
.btn .timer:empty{display:none}
.btn.is-loading{pointer-events:none;opacity:.85}
.btn.is-loading::before{content:"";width:16px;height:16px;flex:none;border-radius:50%;
  border:2px solid currentColor;border-right-color:transparent;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.actions>*+*{margin-top:10px}

.alert{padding:12px 14px;border:1px solid;border-radius:8px;font-size:.9375rem;line-height:1.45;margin:0 0 20px}
.alert.error{background:var(--danger-soft);border-color:var(--danger-line);color:var(--danger-ink)}
.alert.notice{background:var(--notice-soft);border-color:var(--notice-line);color:var(--notice-ink)}

input.code{height:56px;text-align:center;font-size:1.5rem;font-weight:600;letter-spacing:.35em;
  font-variant-numeric:tabular-nums;padding-left:.35em}
input.code.has-error{border-color:var(--danger)}
.otp{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}
.otp input{height:56px;padding:0;text-align:center;font-size:1.375rem;font-weight:600;
  font-variant-numeric:tabular-nums;caret-color:var(--primary)}
.otp.has-error input{border-color:var(--danger)}
.otp.shake{animation:shake .32s ease-in-out}
@keyframes shake{20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
.hint{font-size:.8125rem;color:var(--muted);margin:8px 0 20px}

.rule{border:0;border-top:1px solid var(--line);margin:28px 0 20px}
.links{margin:20px 0 0;text-align:center;font-size:.875rem;color:var(--muted)}

@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;

const ICONS = {
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><path d="M12 16.5v.01"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.4 2.6 2.6 5-5.4"/>',
} as const;

export type Icon = keyof typeof ICONS;

export function icon(name: Icon, tone: "" | "danger" | "success" = ""): string {
  return `<div class="badge${tone ? ` ${tone}` : ""}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg></div>`;
}

export function layout(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<meta name="color-scheme" content="light">
<title>${escapeHtml(title)}</title>
<style>${STYLES}</style>
</head>
<body>
<main class="card">
${body}
</main>
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}

/** `message` is plain text and is escaped here. */
export function alert(kind: "error" | "notice", message: string | undefined): string {
  if (!message) return "";
  const role = kind === "error" ? "alert" : "status";
  return `<p class="alert ${kind}" role="${role}">${escapeHtml(message)}</p>`;
}

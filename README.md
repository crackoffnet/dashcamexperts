# Dashcam Experts Website

Premium landing website for Dashcam Experts, a Los Angeles dash cam installation business. The app is built with Vite, React, TypeScript, and Tailwind CSS using a static-friendly setup that is ready for local development and later Cloudflare Pages deployment.

Included routes:

- `/`
- `/services`
- `/faq`
- `/contact`
- `/privacy-policy`
- `/terms-and-conditions`
- `/refund-cancellation-policy`
- `/cookie-policy` 
- `/disclaimer`

## Local WSL2

Run these exact commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Local URL:

```text
http://localhost:5173
```

## Cloudflare Pages

Use these settings:

```text
Build command: npm run build
Output directory: dist
```

## Domain setup

Primary domain:

```text
www.dashcamexperts.xyz
```

Redirect:

```text
dashcamexperts.xyz -> www.dashcamexperts.xyz
```

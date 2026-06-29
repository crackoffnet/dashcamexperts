# Dashcam Experts Website

Premium landing website for Dashcam Experts, a Los Angeles dash cam installation business. The app is built with Vite, React, TypeScript, and Tailwind CSS and is deployed with Cloudflare Workers Static Assets.

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

## Cloudflare Worker Static Assets Deployment

Run these commands:

```bash
npm run build
npx wrangler deploy
```

## Cloudflare Build Settings

Use these settings:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Production branch: main
```

## Domain setup

Primary domain:

```text
www.dashcamexperts.xyz
```

Root-to-www redirect:

```text
dashcamexperts.xyz -> www.dashcamexperts.xyz
```

This redirect should be handled with Cloudflare Redirect Rules.

DNS:

```text
www.dashcamexperts.xyz should be connected to the Worker custom domain.
dashcamexperts.xyz should have a proxied DNS record for redirect handling.
```

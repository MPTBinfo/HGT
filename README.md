# HGT — Tiranga Boat Rally Proposal & CMS

Next.js application for the Tiranga Boat Rally proposal microsite, event information and role-specific coordinator pages.

## Local development

Requirements: Node.js 22+ and pnpm 9+.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Secure login configuration

Set these values in the deployment provider's server-side environment/secret settings; use unique, strong credentials for each role:

- `HGT_SESSION_SECRET` — random secret, minimum 32 characters
- `HGT_CMS_ID` and `HGT_CMS_PASSWORD`
- `HGT_MPTB_NODAL_ID` and `HGT_MPTB_NODAL_PASSWORD`
- `HGT_SPORTS_NODAL_ID` and `HGT_SPORTS_NODAL_PASSWORD`
- `HGT_PARTICIPANT_ID` and `HGT_PARTICIPANT_PASSWORD`

Copy `.env.example` as a local reference only. Never commit actual values. Old demo credentials were embedded in earlier public source versions; do not reuse them.

Role login now goes through a server endpoint and issues a signed HttpOnly session cookie. Middleware protects the role dashboard routes. The localStorage role values are UI convenience only and are not an authentication boundary.

## Important limitations to address before production

- The event content CMS currently saves content in the browser's localStorage, not a shared database. Changes made in one browser do not automatically appear for other users.
- Participant/task workflows should be reviewed for data persistence and authorization before they are used for real personal data.
- The default event content references 14 August 2025. Verify and update dates/content before reuse for a future event.
- Because the previous hardcoded credentials were in public Git history, treat them as compromised and never reuse them.

## Build

```bash
pnpm build
```
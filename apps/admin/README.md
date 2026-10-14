# Stormy CMS Admin

Your admin app for editing pages, layouts, and media.

## Development

From the workspace root:

```bash
cp apps/admin/.env.example apps/admin/.env
pnpm --filter stormy-admin dev
```

Open `http://localhost:4000`.

- `NEXT_PUBLIC_SITE_URL` is the admin URL used for authentication redirects.
- `NEXT_PUBLIC_PREVIEW_SITE_URL` points to the public site, normally `http://localhost:3000` locally.

Set the `S3_*` variables documented in `.env.example` for media routes. Use a restricted bucket credential in production.

## Verification

```bash
pnpm --filter stormy-admin lint
pnpm --filter stormy-admin typecheck
pnpm --filter stormy-admin build
pnpm --filter stormy-admin test:e2e
```

Playwright builds the admin into an isolated `.next-e2e` directory and runs its production server on port `4010` for stable cross-browser tests. `E2E_ALLOW_COOKIE_BYPASS=true` lets the test server accept the dedicated E2E cookie; all other requests exercise normal authentication.

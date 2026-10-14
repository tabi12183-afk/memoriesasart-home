# Stormy CMS Site

Your public Next.js app. It renders Stormy pages and layouts using the shared component package.

## Development

From the workspace root:

```bash
cp apps/site/.env.example apps/site/.env
pnpm --filter stormy-site dev
```

Open `http://localhost:3000`.

## Components

Add your components to `packages/components` so the site and admin preview share the same implementation and CMS metadata. Avoid adding public-only copies of editable components here.

## Verification

```bash
pnpm --filter stormy-site lint
pnpm --filter stormy-site typecheck
pnpm --filter stormy-site test
pnpm --filter stormy-site build
```

This app uses dynamic rendering for CMS pages. Configure the Stormy client credentials from `.env.example` for each deployment environment.

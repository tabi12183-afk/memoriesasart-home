# Stormy CMS Next.js Boilerplate

A Next.js starter for building and editing a Stormy CMS site.

- [Stormy CMS](https://stormycms.com) — CMS platform
- [Documentation](https://docs.stormycms.com) — setup and API guides
- [Account portal](https://account.stormycms.com) — billing and site settings

## Requirements

- Node.js 20.9 or newer
- pnpm 10
- A Stormy CMS site with client credentials
- S3-compatible object storage for admin media uploads

## Quick start

```bash
pnpm install --frozen-lockfile
cp apps/admin/.env.example apps/admin/.env
cp apps/site/.env.example apps/site/.env
pnpm dev
```

The public site runs at `http://localhost:3000` and the admin runs at `http://localhost:4000`.

## Project structure

- `apps/admin` — authenticated admin, layout, and media editor
- `apps/site` — public CMS-rendered site
- `packages/components` — shared components and CMS configuration
- `packages/types` — ambient declarations shared by workspace packages
- `docs` — feature roadmap and project documentation

Shared components live in `packages/components`. The admin and site import the same export map so editor previews match public rendering. Stormy client and rendering behavior is handled by the `@stormycms/*` libraries; your presentation logic lives here.

## Commands

```bash
pnpm dev                                   # run both applications
pnpm quality:light                         # lint, formatting, and TypeScript checks
pnpm test                                  # unit tests (components run in a real browser via Vitest)
pnpm --filter components test --coverage   # run component tests with coverage
pnpm test:e2e                              # browser tests
pnpm build                                 # production builds
pnpm clean:install                         # clean generated output and reinstall from the lockfile
```

## Components

Add typed React components under `packages/components/src`, then register their editable fields and placement rules in `packages/components/index.ts`. The initial set includes semantic regions and groups, cards, navigation, site information, headings, plain and rich text, images, and link-based calls to action.

The Stormy CLI can infer a starting schema from component props. The current export map was generated as a starting point, then adapted for field controls, defaults, parent/child constraints, and containment. Review it again whenever components are regenerated.

## Spacing

Space is a relationship, not a property. There are two kinds, and they have different owners:

- **Between things** — owned by whatever contains them.
- **Against an edge** — not a relationship between two elements at all, but between content and the boundary holding it, which may be the screen, a card, or a banner. Owned by the boundary.

Four rules, defined in `packages/components/src/lib/flow.ts`:

1. **Nothing sets space around itself.** A component styles its inside only. The moment a component carries its own outer margin, that margin is wrong somewhere else, and the fix is always a negative margin somewhere else again.
2. **Whatever contains things owns the space between them**, and how much is decided by how closely those things relate — `related`, `distinct`, or `separate`. None of them is a measurement; the values live in `packages/theme/theme.css` as `--flow-rhythm-*`, so retuning the whole site's rhythm is one edit.
3. **Whatever forms an edge holds its content clear of it, and says so.** A `Card` marks itself `data-flow="bounded"`; a band clears the screen through its own track. Every boundary zeroes `--flow-inset` for what is inside it, so the clearance lands exactly once no matter how deeply things nest. This is why a `Heading` carries no padding — padding would be right against the screen and wrong inside a card.
4. **A component that is edge-to-edge by nature says so about itself.** A `Section` lays out two columns over the same rows: a readable one capped at `--flow-measure`, and one that runs to the screen edges. A `Hero` marks itself `data-flow="bleed"` and lands in the wide one.

`RegionHeader`, `RegionAside` and `RegionFooter` hold content directly, so each clears the screen edge itself. `RegionMain` deliberately does not: it holds the page's bands, and a band owns its own edges — which is what lets a banner inside one reach them.

The practical consequence: a full-width banner needs no negative margins, no `position: absolute`, and no `100vw` — the author drops a Hero into a Section and it goes edge-to-edge on its own.

There is deliberately **no Spacer component**. A spacer is an instruction with no meaning: it cannot know it is the last child, that the page is narrow, or that the thing above it was deleted, so it goes stale as soon as the page changes — and it doubles the number of things an editor has to manage. Naming the relationship says the same thing once, in a way that stays true.

## Deployment

Deploy `apps/site` and `apps/admin` as separate Next.js applications. Configure each app from its `.env.example` and never commit `.env` files. Run `pnpm quality` before release.

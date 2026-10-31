# Stormy CMS Project

Stormy CMS is a headless CMS that gives you full control of your own editor and admin panel.

## Initial State

This project was initially scaffolded by the `@stormycms/cli` package, using the command `stormy init`. By default, that creates a monorepo with:

- `apps/admin` - An admin panel application with a page builder UI
- `apps/site` - The public-facing website, driven by the page builder
- `packages/components` - The design system which allows you to define the schema once and share it between admin and site
- `packages/theme` - The CSS that targets both the public site and the root of the editor inside the admin shell
- `packages/types` - Common types used across both apps

Some components are pre-made out of the box, but the real goal is to add and modify components to suit the user's own project. There is no guarantee the user has not developed this initial state into something more custom, so treat this structure as a historical record, and a reference for the idiomatic approach.

## Find the right files

Use this map as a starting point. If the project has changed, follow its current structure and the nearest working example.

| Task                                                | Start here                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Add or change a shared component                    | `packages/components/src/lib/`                                                                   |
| Register a component and its editable fields        | `packages/components/src/index.ts`, using `withCMS`                                              |
| Configure component placement                       | The same registration map, including `validChildren`, `validParents`, `noChildren`, and `unique` |
| Change site branding and design tokens              | `packages/theme/theme.css`                                                                       |
| Change spacing and layout relationships             | `packages/components/src/lib/flow.ts`                                                            |
| Fix differences between editor and public rendering | `flow.ts`, `packages/components/src/styles.css`, and `packages/components/postcss.config.js`     |
| Change public page loading and rendering            | `apps/site/src/app/(pages)/[...slug]/page.tsx`; the homepage reuses this route                   |
| Change the editor UI                                | `apps/admin/src/components/page-editor.tsx`, `layout-editor.tsx`, and `editable-component.tsx`   |
| Find component and registration tests               | `packages/components/src/lib/tests/`, especially `cms-exports.test.tsx`                          |
| Find admin browser tests and helpers                | `apps/admin/e2e/` and the root `playwright.config.ts`                                            |

### Work efficiently

- Start with the requested behavior, its owning files, and the nearest relevant tests. Expand the search when you find a specific dependency or failure that requires it.
- Implement small changes directly. Use subagents only when available and when substantial independent work justifies the coordination cost.
- Keep changes within the task. Avoid unrelated refactors, dependency upgrades, and generated output edits.
- If a check fails, identify whether the failure comes from your change, an existing problem, or the environment. Fix failures caused by your change. Report unrelated failures without expanding the task to repair them.
- Retry a failed command only after changing something relevant or finding evidence of a transient failure. If credentials, services, or tooling block verification, report what is blocked and finish any independent work.

### Test and verify changes

The default admin, site, and components test configurations require 100% statement, branch, function, and line coverage. Preserve those thresholds. Do not lower them or add exclusions merely to make a change pass. Use TDD.

1. For behavior changes, add or update tests that assert the intended outcome. For bugs, reproduce the failure with a focused test before fixing it when practical.
2. Run focused tests during implementation for prompt feedback. To run one component test without the package-wide coverage gate, use `pnpm --filter components exec vitest run src/lib/tests/cms-exports.test.tsx --coverage.enabled=false`, substituting the relevant test path.
3. Before finishing, run the full coverage suite for each changed code package, such as `pnpm --filter components test`, `pnpm --filter admin test`, or `pnpm --filter site test`. Coverage includes all configured source files, so a single test file with coverage enabled may fail the threshold for unrelated files.
4. For code changes, run formatting, lint, and type checks for the affected packages. For example, use `pnpm --filter components format:fix`, `pnpm --filter components lint:fix`, and `pnpm --filter components typecheck`. Inspect the diff afterward and keep fixes within the task.
5. Use the relevant Playwright tests for editor interactions. For shared layout or styling changes, also inspect public rendering and editor preview at a narrow and wide viewport. Broaden checks when shared contracts or cross-package behavior change.

For documentation-only changes, check formatting and the accuracy of paths and commands. Read-only reviews and questions do not require formatting, lint fixes, or test runs. Once the relevant checks pass, repeat them only if further changes or new evidence justify it. Report what you verified and any remaining blockers.

## Required for Setup

If the user skipped the prompts to add .env variables during `stormy init`, they will need to run `pnpm init:env` (or otherwise whatever package manager they prefer) and provide real values for `STORMY_CMS_CLIENT_ID` and `STORMY_CMS_CLIENT_SECRET`. They can get this information from their site settings on https://account.stormycms.com:

1. https://account.stormycms.com/dashboard
2. Choose a site from the left-side navigation - OR - click the "View Details" button on the bottom of one of the site cards in the main page area.
3. On the site overview page, the left-side navigation is replaced by standard site management pages. Go to the "Keys" tab near the bottom, above "Settings".
4. The client ID is immediately visible at the top. While this key is technically public, the user may reset the client ID any time if needed, in which case the local `.env` must change with it.
5. The client secret will either be missing or redacted. For fresh setups, click "Generate Client Secret". For existing setups, you will have to click "Reset Client Secret" to get a new one, because the old one is not recoverable. Again, the local `.env` must be updated any time this secret is reset, even if reset by another user. All users with the "owner" or "admin" role can see and change this secret, and there's only one per site, not per user.

The above is the bare minimum set up. If the user wants to set up media uploads out of the box, they have the option to simply fill out extra environment variables, in case they've set up an S3 bucket on their own. The following are default values in the `apps/admin/.env.example` file, available on the initial `stormy init` run:

```
S3_ENDPOINT=https://s3.amazonaws.com
S3_BUCKET=your-media-bucket
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=us-east-2
```

## Rules for Components

As long as the user has kept the standard `packages/components` shared package, along with `apps/admin` and `apps/site`, (or at least a similar structure,) then all the following rules apply.

- The components are not simply functional abstractions; they are presentational units in a design system. That means you should keep their interface semantic, so they can own their OWN design decisions.
  > The goal is to separate the content from the design, because ambiguous ownership of design often leads to situations where mass changes are required. For example, if every warning banner has `size="large"` and `color="yellow"`, then a new design decision to change the size and color of every warning banner might affect 32 instances across the site. Meanwhile, if the component owns the design, you only need to update a single place; `level="warning"` can internally decide whether it's large and yellow, or small and orange. This context is provided in case the user questions your field names.
- If the user requests a visual or design-oriented field, explain the maintenance tradeoff once and recommend a semantic alternative. Respect the user's informed choice.
- If the user requests a new component, consider using `shadcn`. This is what the out-of-the-box components are based on already. If the user's design system seems fundamentally incompatible then there is no reason to continue using `shadcn`; for example, using some other CSS-in-JS solution instead of Tailwind.
  > Remember `shadcn` is intended to serve as a starting point, and the design is expected to deviate from the default to varying degrees.
- When creating new components, always consider how it fits in the flow of the page. Consider the relative spacing and the relationships with other components in different contexts. Things may stack differently when the parent controls the gaps, versus when the component is effectively standalone. By default, there will be a `/packages/components/src/lib/flow.ts` file you can reference (or update) for these cases.
- Most of your edits will likely be made in the components. You should rarely, if ever, design a static page for the public-facing site. Static pages should only be made if there is a legitimate justification, which is not expected to be common.

### Add components without breaking saved content

Follow a similar existing component and its `withCMS` registration. Add the implementation under `packages/components/src/lib/`, then register it in `packages/components/src/index.ts`. Match editable fields to component props, provide usable defaults, and update placement rules so authors can insert it where intended. Add tests for the component and its registration.

### Generate a starting registration map

`stormy generate` infers CMS fields from component props using the framework plugin. Run it through the project's installed CLI from the repository root:

```bash
pnpm exec stormy generate
```

The default input is `packages/components/src/lib` and the default output is `packages/components/src/index.ts`. Use `--components <path>` and `--output <path>` to change them; use `pnpm exec stormy generate --help` to inspect the installed options. Projects can override defaults in `stormy.config.ts`.

Generation writes the output file in full. For an established project, generate to a temporary file with `--output` and merge the relevant registrations into the existing map. Review imports, export names, field controls, defaults, placement rules, and special entries such as `Outlet`. Inference provides a starting point; it does not preserve all hand-authored configuration or guarantee every component is discovered. For a small change to an existing registration, edit it directly.

If generation fails to detect React, check the installed CLI and framework plugin versions before retrying. The CLI `0.0.21` installed when this guidance was written advertises `--framework` but does not use it during generation; the flag alone does not resolve that failure. Continue with manual registration if blocked, and report the CLI issue without upgrading dependencies unless the task calls for it.

### Register components with `withCMS`

Import `withCMS` and `CMSExportsMap` from `@stormycms/react/cms`. `withCMS(metadata, Component)` returns a React component with metadata that the editor uses for fields and placement. Add it to the default export map in `packages/components/src/index.ts`. For example, after implementing a `Notice` component with `message: string` and `level?: 'info' | 'warning'` props:

```tsx
import { withCMS, type CMSExportsMap } from '@stormycms/react/cms';
import { Notice } from './lib/notice';

export default {
	// Keep the project's other registrations here.
	Notice: withCMS(
		{
			export: 'Notice',
			label: 'Notice',
			fields: [
				{
					prop: 'message',
					label: 'Message',
					field: 'textarea',
					required: true,
					defaultValue: 'Add a notice.',
				},
				{
					prop: 'level',
					label: 'Level',
					field: 'select',
					options: ['info', 'warning'],
					defaultValue: 'info',
				},
			],
			noChildren: true,
		},
		Notice,
	),
} satisfies CMSExportsMap;
```

The metadata supports these properties:

| Property        | Meaning                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `export`        | Required stable identifier. Match the map key exactly; saved component names resolve through this key. |
| `label`         | Required display name in the editor. This can change without renaming the saved identifier.            |
| `fields`        | Required array of editable prop definitions. Use `[]` for a component with no editable props.          |
| `noChildren`    | Defaults to `false`. Set `true` for components that cannot contain nested CMS components.              |
| `validChildren` | Allowed child export names. Omit to impose no restriction from this parent; `[]` allows none.          |
| `validParents`  | Allowed parent export names. Omit to impose no restriction from this child.                            |
| `layoutOnly`    | Defaults to `false`. Set `true` to offer the component only in the layout editor.                      |
| `editable`      | Defaults to `true`. Marks whether the component is editable in the CMS.                                |
| `unique`        | Defaults to `false`. Set `true` to allow only one instance among siblings, not one per site.           |

Both the parent's `validChildren` and the child's `validParents` must permit placement. Adding `Notice` to the map will not make it available inside a `Section` whose explicit `validChildren` list omits it. Containers must render their React `children`; metadata alone does not render nested content.

Each field requires `prop`, `label`, and `field`. `prop` must match the React prop exactly; `required` and `defaultValue` are optional. Choose defaults that match the component's expected value type. Defaults initialize editor values; `withCMS` itself forwards props without filling defaults or validating saved content, so handle optional props in the component too.

Common controls are `input` for short text, `textarea` for plain body text, `markdown` for rich text, `checkbox` for booleans, and `image` for an image asset. `select` and `radio` require an `options: string[]`; the current admin renders both as a select. For other field types, check the installed `CMSField` type from `@stormycms/core` and the admin's field renderer in `editable-component.tsx` before relying on editor support. Prefer the installed types over assumptions from a different library version, and verify registration changes in the editor as well as tests.

### Preserve content and shared styling

Both apps consume the same registration map. Component export names, field prop names, and stored field values are contracts with saved CMS content. Preserve them when restyling or refactoring. If a requested change requires renaming or removing them, establish how existing content will be migrated before making the breaking change.

Keep site styling shared through `packages/theme` and `packages/components`. The compiled component stylesheet is scoped to `.site-root__html`, with `.site-root__body` and an editor `.site-root` wrapper providing the embedded baseline. Preserve this isolation so site styles do not alter the admin shell. Use the helpers in `flow.ts` for selectors that must match both direct children on the site and wrapped children in the editor. Rebuild component CSS after changing its sources before inspecting the result; the default `pnpm dev` command builds it on startup.

## Stormy CMS's Core

The core offering Stormy provides is its API. The bare API is based on GraphQL, but the standard way to access it is through `StormyCMSClient` exported by the `@stormycms/core` package. Every API client method call should be server-side, because it requires a client secret to initialize.

This client can be passed to the `<StormyServerProvider>` from `@stormycms/next`, or `<StormyProvider>` from `@stormycms/react`, which will automatically manage the user session for most cases. It should also be the primary way of interacting with Stormy CMS's services in API routes.

See https://docs.stormycms.com for additional details about how Stormy CMS works.

## Guidance for Page Content

Pages are dynamic CMS content, so code alone does not show the user's actual page. For tasks that depend on that content or its appearance, inspect the rendered page with Playwright. The default public site runs on port `3000` and the admin on port `4000`.

When the user asks you to preview, test, or fix the configured app, ordinary browser navigation and observation of its responses are part of that task. Those requests may cause the app to read CMS data using its existing server-side credentials. This does not authorize separate scripts or direct API calls using those credentials, or changes to real CMS content. Obtain consent for those actions unless the user has already authorized them. Do not read the user's `.env` file without their consent, and never expose secrets in output.

For local verification that does not require real content, prefer existing test fixtures. Unit tests supply dummy credentials and mocks. The admin has a mock client at `apps/admin/src/lib/stormy-cms-client.mock.ts`; the Playwright configuration and `apps/admin/e2e/helpers.ts` set up the test server and authentication bypass. Reuse that setup for admin tests, and keep authentication bypasses confined to local testing. The public site has a separate client, so do not assume the admin's mock setup applies to it.

A request to create a reusable component normally means changing its code and registration; populating real pages with that component is a separate content action.

## Authoring Content with the Stormy CMS MCP Server

Stormy CMS has an MCP server for reading and editing a site's pages, layouts, and media directly. The user connects it to their AI client, signs in, and approves one site in the account portal; every tool then acts on that site only, with the user's own role on it. For example, in Claude Code:

```bash
claude mcp add --transport http stormy https://api.stormycms.com/mcp
```

When its tools are available, use them for content work rather than scripts or direct API calls with the project's credentials. If they are not available, say so and suggest connecting the server instead of working around it.

- Read the server's guide with `get_stormy_guide` before the first change. It explains the component format and the rules for pages, layouts, and media.
- There are no drafts or staging content yet: every create, update, or delete is written directly to the live site. Ensure the user understands the consequences of modifying production content before proceeding; only write directly to production with explicit consent.
- Component names and props must match the registration map in `packages/components/src/index.ts`. The API stores whatever it is sent, so a misspelled name or prop shows up broken on the live site.
- The local code may be ahead of what is deployed. Before placing a component that might exist only locally, tell the user: the live site cannot render a component it does not have yet.
- After a change, inspect the rendered page as described above and give the user its address.

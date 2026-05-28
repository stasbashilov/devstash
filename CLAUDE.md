# DevStash

A developer knowledge hubbfor snippets, commands, prompts, notes, files, images, links and custom types.

# Context files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standarts.md
- @context/ai-interaction.md
- @context/current-feature.md

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack, localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # run ESLint (calls eslint CLI directly, not next lint)
```

No test runner is configured yet.

## Architecture

Next.js 16 app using the **App Router** (`src/app/`). All routes, layouts, and API endpoints live under `src/app/`. The root layout is `src/app/layout.tsx`; the home page is `src/app/page.tsx`. Styling via Tailwind CSS v4 configured through `postcss.config.mjs`.

## Next.js 16 Breaking Changes

This project uses **Next.js 16**, which has significant differences from 14/15:

**Async Request APIs are mandatory.** `cookies()`, `headers()`, `draftMode()`, and `params` props in layouts/pages/routes must all be `await`ed. Synchronous access is removed.

```ts
// correct
const cookieStore = await cookies();
const { slug } = await params;
```

**`middleware.ts` is renamed to `proxy.ts`.** The export must be named `proxy`, not `middleware`. The `edge` runtime is not supported in proxy — use `nodejs`. Config flags renamed: e.g. `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.

**`revalidateTag` requires a second `cacheLife` argument.** Single-argument form produces a TypeScript error. Use `updateTag` for immediate expiration.

**`cacheLife` / `cacheTag` are stable** — drop the `unstable_` prefix.

**`next lint` is removed.** Use `eslint` CLI directly (already reflected in `package.json` scripts).

**Turbopack is the default bundler** for both `next dev` and `next build`. No flag needed.

**`next/legacy/image` is deprecated** — use `next/image`. `images.domains` config is deprecated — use `remotePatterns`.

For the full v16 upgrade guide: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`

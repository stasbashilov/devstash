# Current Feature

Prisma + Neon PostgreSQL setup. Introduces the database layer (initial schema, migrations) that the dashboard UI has so far only mocked.

## Status

Completed

## Goals

<!-- Goals and requirements -->

- Set up Prisma ORM with Neon PostgreSQL (serverless)
- Use Prisma 7 (breaking changes vs. earlier versions)
- Create initial schema based on the data models in `project-overview.md` (expected to evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Always create migrations (`prisma migrate dev`) — never `db push` — since we'll have separate development and production database branches

## Notes

- Full spec: @context/features/database-spec.md
- Initial data models: @context/project-overview.md
- Prisma docs: https://prisma.io/docs (Prisma 7 has breaking changes — fetch latest)
- Prisma 7 upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Prisma quickstart: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

## History

<!-- Keep this updated. Earliest to laters -->

### 2026-05-28 — Initial Next.js & Tailwind Setup

- Bootstrapped Next.js 16 app with TypeScript and Tailwind CSS v4
- Configured project structure, CLAUDE.md, and context files
- Removed default Next.js boilerplate (SVGs, placeholder page)
- Pushed initial commit to `stasbashilov/devstash` on GitHub

### 2026-06-16 — Dashboard UI Phase 1

- Initialized ShadCN UI (base-nova style, neutral base color) and installed `button`, `input` components
- Created `(dashboard)` route group with shared layout, and `/dashboard` route
- Added `TopBar` component (search input + "New Item" button, display only)
- Added `Sidebar` placeholder component (`h2` "Sidebar"); `/dashboard` page renders placeholder `h2` "Main"
- Set dark mode as default via `dark` class on `html`
- Fixed circular `--font-sans` token in `globals.css` introduced by ShadCN init so Geist fonts apply correctly
- Verified with `npm run build` and `npm run lint`

### 2026-06-16 — Dashboard UI Phase 2

- Added `DashboardShell` client wrapper holding sidebar state; `collapsed` (desktop) and `mobileOpen` (mobile drawer) are decoupled via a `useIsMobile` (`matchMedia`) hook so the single toggle button never confuses the two
- Sidebar: branded header (gradient icon + "DevStash"), collapsible "Types" section linking to `/items/[type]` with per-type item counts, collapsible "Collections" section with "Favorites" and "Recent" sub-groups (folder icon, item count, star badge for favorites)
- Added user avatar area at the bottom of the sidebar (initials avatar, name, email)
- `TopBar`: added the sidebar toggle button (`PanelLeftClose`/`PanelLeftOpen`) and a ⌘K hint in the search input
- Added `src/lib/constants/item-types.ts` for icon/color lookup by type name
- Verified with `npm run build` and `npm run lint`

### 2026-06-24 — Dashboard UI Phase 3

- Added `StatsCards` (4 cards: items, collections, favorite items, favorite collections)
- Added `CollectionCard` for the recent collections grid and `ItemRow` for the recent items list (10 items)
- Built out pinned items section on `/dashboard`, all sourced from `src/lib/mock-data.js` (no database yet)
- Added base `Card` UI component
- Verified with `npm run build` and `npm run lint`
- Completed all 3 phases of the dashboard UI layout (sidebar, top bar, main content area)

### 2026-07-07 — Prisma + Neon PostgreSQL Setup

- Installed Prisma 7 (`prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`, `dotenv`, `tsx`); driver adapters are now mandatory and env vars are no longer auto-loaded, so `prisma.config.ts` and every standalone script explicitly `import "dotenv/config"`
- Wrote `prisma/schema.prisma` with the full data model from `project-overview.md`: `User`, NextAuth models (`Account`, `Session`, `VerificationToken`), `Item`, `ItemType`, `Collection`, `ItemCollection`, `Tag`, `ContentType` enum — with indexes and cascade deletes
- Generator now outputs the client to `src/generated/prisma` (gitignored) instead of `node_modules`, per Prisma 7's mandatory `output` path
- Added `src/lib/prisma.ts` client singleton using the `@prisma/adapter-pg` driver adapter
- Added `prisma/seed.ts` for system item types; seeding is no longer automatic with migrations in Prisma 7, so it's wired via `migrations.seed` in `prisma.config.ts` and run with `npx prisma db seed`
- Neon dev branch DB already had the schema applied from earlier untracked work (no local migration history); baselined it with a generated `migration.sql` + `prisma migrate resolve --applied` instead of resetting — no data loss, no `db push` used
- Added `scripts/test-db.ts` and `db:test`/`db:migrate`/`db:generate`/`db:seed`/`db:studio` npm scripts
- Verified with `npm run build`, `npm run lint`, and `npm run db:test` against the live Neon dev database

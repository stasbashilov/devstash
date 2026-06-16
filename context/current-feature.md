# Current Feature

<!-- Feature name and short description -->

## Status

<!-- Not started | In Progress | Completed -->

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

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

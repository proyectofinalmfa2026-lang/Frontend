<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-context -->
# CineSphere — Project Context

## Goal
Social network for movies with real-time messaging, admin panel, premium subscriptions, watchlist, and watched movies tracking.

## Key Architectural Facts
- **Stack**: Next.js 15 (App Router) frontend, NestJS backend, PostgreSQL (TypeORM), Socket.IO
- **Backend** lives in sibling directory `../Backend`
- **Auth**: JWT stored in zustand (persist), login via credentials or Google OAuth
- **API URL**: dev `http://localhost:3001`, set via `NEXT_PUBLIC_API_URL`
- **Socket.IO**: connect via `NEXT_PUBLIC_API_URL` with websocket+polling transports
- **Styling**: Tailwind CSS v4 with utility classes, custom dark palette (`#02010F` bg, `#0E0A2B` cards, `#22194A` borders, `#C13A82` accent, `#8C63C9` secondary)
- **State**: Zustand v5 with persist middleware (async hydration — use `hasHydrated()`/`onFinishHydration()` to avoid premature redirects)
- **Toasts**: `sonner` with custom dark themed toasts in `lib/toasts/`

## Features Built
### Real-time Message Notifications
- Floating blue toast (`lib/toasts/messages.tsx`) — bottom-right, clickable to conversation
- Socket `join` + `newMessage` listener in `components/navbar/navbar.tsx` (single source, avoids double toasts)
- Skips toast if currently viewing that conversation

### Auth & Premium Sync
- `isPremium` in both `authStore.user.isPremium` and `userStore.profile.isPremium`
- Edit page (`app/profile/edit/page.tsx`) uses chain `profile?.isPremium ?? user?.isPremium ?? false`
- Auth store refreshed from `GET /auth/profile` on own profile visit and edit page mount

### Admin Panel
- Routes under `/admin/` with JwtAuthGuard + RolesGuard (ADMIN role)
- Admin sidebar with nav items including Comentarios
- `components/admin/commentsTable.tsx` — admin comments management with delete

### Watched Movies Feature (mirrors watchlist pattern)
- **Backend**: `Watched` entity, `WatchedModule`, `WatchedController` (`GET /watched/me`, `GET /watched/check/:movieId`, `POST /watched`, `DELETE /watched/:movieId`)
- **Frontend**: `services/watched.service.ts`, `store/watchedStore.ts`, `hooks/useWatched.ts` (with `useWatchedToggle`)
- **Pages**: `/watched` (guest view with CTA, authenticated view with grid)
- **Components**: `watchedGrid`, `watchedCard`, `watchedFilters`, `addToWatchedButton` (eye icon, emerald green accent)
- **Profile**: `watchedTab` component in profile stats, `useWatchedTab` hook, `miniWatchedCard`
- **Navbar**: link "Vistas" added, `useWatched()` called for store initialization
- **Toasts**: `showWatchedToast`/`showWatchedErrorToast` in `lib/toasts/actions.tsx`

## Known Issues / Blockers
- Avatar icons not connected to backend — `PUT /auth/profile` does NOT handle `avatar` field
- AI/Ollama only works locally (`localhost:11434`)
- Several endpoints missing JWT guards (followers, likes, comments, notifications, conversations)
- No dedicated `GET /comments/review/:reviewId` endpoint
- `MessagesModule` imported twice in `app.module.ts`

## Reusable Patterns
- New CRUD feature: create entity → DTO → service → controller → module → register in AppModule → add relation to User entity → create frontend service → store (zustand) → hook → page → view → components → profile tab → navbar link → toasts
- Zustand stores: `movieIds: Set<string>`, optimistic updates with rollback, clear on logout
<!-- END:project-context -->

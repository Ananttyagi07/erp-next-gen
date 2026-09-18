# ERP Project — Live Status (for tomorrow's demo)

Last updated: 2026-09-15, ~05:50 IST. Update this file as work continues — don't
trust the old `PROJECT_STATUS.md` / other root markdown files, they're stale
AI-generated logs from a previous session and overstate completeness.

## How to get the app running (if servers have stopped)

```bash
cd /home/ananttyagi/Documents/ERP-MAIN-PROJECT-master

# Backend + DB (podman, rootless — no sudo needed)
podman-compose up -d postgres redis backend
# Backend: http://localhost:8000   Postgres exposed on host port 55432 (not 5432 — that's your native Postgres)

# Frontend
cd frontend
npm run dev
# Frontend: http://localhost:5173
```

Data persists in the `postgres_data` podman volume across `podman-compose down` —
only `down -v` would wipe it. Don't run `-v`.

## Login credentials (throwaway dev accounts, seeded by Claude)

| Role | Email | Password |
|---|---|---|
| Superadmin | superadmin@erp.local | SuperAdmin@123 |
| Admin | admin@erp.local | Admin@123 |
| Teacher | rajesh.kumar@eng.edu | teacher123 |
| Student | akshay.sharma@student.eng.edu | student123 |
| Staff | rajesh.patel@eng.staff.edu | staff123 |

## What's actually done and verified (not just claimed)

- **Backend boots clean.** Fixed 7 missing/misplaced dependencies (`pyotp`,
  `qrcode`, `django-ratelimit`, `user-agents`, `geoip2`, `django-ipware`,
  `whitenoise`) in `backend/requirements/base.txt` and `backend/Dockerfile`.
- **Database schema is complete.** All 44 Django apps migrated — 144 tables
  exist in Postgres, `makemigrations --check` reports zero drift. (33 of 44
  apps had never had migrations generated before this session.)
- **RBAC is now actually wired up**, not just scaffolded:
  - `apps/roles/management/commands/assign_role_permissions.py` (new) links
    the 664+36 seeded `Permission` rows to the 5 default roles via
    `RolePermission` — this table was previously empty, meaning
    `hasPermission()` always returned `False` for everyone, including
    Superadmin. That's why the dashboard was blank before.
  - Counts after linking: Superadmin 700, Admin 644, Teacher 260, Staff 176,
    Student 63 permissions.
  - Frontend `usePermissions.js` now bypasses permission checks for
    `is_superuser` (mirrors what `Sidebar.jsx` already did) — backend
    intentionally returns an empty permission list for superusers.
- **Login works end-to-end** through the real UI (not just curl) for all 5
  roles above — verified via headless-browser automation, correct JWT +
  role-based redirect for each.
- **Dashboard is now role-driven and dynamic**, per your ask:
  - `frontend/src/pages/Dashboard.jsx` builds a "Your Modules" grid straight
    from the same `getMenuItems()` config that drives the sidebar
    (`Sidebar.jsx`, now exported), filtered through each user's real
    permissions. **New roles/permission changes require zero frontend code
    changes** — the grid and sidebar both evolve automatically.
  - Verified counts: Superadmin sees 37 modules, Admin ~35, Teacher 15,
    Student 13 — genuinely different per role, not hardcoded.
  - KPI cards (Students/Teachers/Revenue/Attendance) are also permission-gated
    and now use the *real* seeded permission codenames (`view_student`,
    `view_teacher`, `view_payment`, `view_student_attendance` — the old code
    checked `view_finance_report`/`view_attendance`, which don't exist as
    seeded permissions, so those cards silently never rendered).
- **Visual polish pass done:** sharp corners everywhere (no rounded buttons/
  cards — global MUI theme override + CSS `!important` safety net covering
  161 files' worth of inline overrides), animated gradient login screen,
  staggered entrance animations, count-up KPI numbers, page-transition fades,
  card hover-lift, all via `framer-motion`. Fixed a sidebar contrast bug
  where the selected-item highlight was a fully-saturated color (not a
  pale tint) stacked under a second `action.selected` layer — now a proper
  10% alpha tint + left accent bar, legible in all 14 color themes.

## More fixed after the first version of this doc

- **`/api/students/`, `/api/teachers/` and dashboard hook 404s.** Root cause
  was actually two stacked bugs in `frontend/src/hooks/useStudents.js`,
  `useTeachers.js`, `useDashboard.js`: (a) they hardcoded a `/api/` prefix
  on top of `apiService`'s baseURL, which *already* includes `/api`, causing
  `/api/api/...`; (b) `students`/`teachers`/`colleges`/`roles`/`guardians`
  apps all register their DRF router at a prefix matching the app name
  itself (e.g. `router.register(r'students', ...)` under
  `path('api/students/', ...)`), so the real endpoint is the doubled
  `/api/students/students/`, not `/api/students/`. Fixed the three hook
  files to call the correct doubled paths without the redundant `/api/`.
  Left `colleges`/`roles`/`guardians` backend routing as-is since the
  frontend already has a mix of correct (`/colleges/colleges/`) and
  incorrect (`/colleges/`) call sites elsewhere — only fixing what's
  provably broken keeps this safe; a full audit of those call sites is
  still open (see below).
- **Students page showed "No students found" even with working API data.**
  `src/pages/Students.jsx` filtered and rendered fields (`first_name`,
  `last_name`, `email`, `enrollment_number`, `phone`, `is_active`) that
  don't exist on the actual `StudentListSerializer` response
  (`user_name`, `roll_number`, `class_name`, `section_name`,
  `admission_date`) — every row silently filtered out. Rewrote the filter
  and table columns to match the real API shape; verified 34 real seeded
  students now render. Also fixed `hasPermission('change_student')` →
  `hasPermission('edit_student')` (the seeded permission naming convention
  uses `edit_`, not Django's usual `change_`).
- **Dashboard is now genuinely role-driven and dynamic**, per your ask:
  `frontend/src/pages/Dashboard.jsx` builds a "Your Modules" grid straight
  from the same `getMenuItems()` config that drives the sidebar
  (`Sidebar.jsx`, now exported), filtered through each user's real
  permissions — new roles/permission changes require zero frontend code
  changes. Verified: Superadmin 37 modules, Teacher 15, Student 13 — all
  visibly different, with role-specific banner text and KPI cards.

## Known bugs found but NOT yet fixed (real, not cosmetic)

1. **Root cause of *why* everything above was broken**: `RolePermission`
   (the join table linking Roles to Permissions) was completely empty —
   `seed_permissions` created `Permission` and `Role` rows but never linked
   them. Fixed via a new command,
   `backend/apps/roles/management/commands/assign_role_permissions.py` —
   already run against the live DB. If the DB is ever reseeded from
   scratch, **re-run this command** after `seed_permissions`, or every
   permission check silently fails again exactly like before.
2. Other pages built against the `useApi`/`useStudents`-style pattern, or
   with the same hardcoded-field-name mistake as `Students.jsx`, have not
   been audited — only Students and (partially) the Dashboard/module grid
   were verified end-to-end tonight. Teachers.jsx doesn't even use
   `useTeachers` — it's structured differently and wasn't checked.
3. `colleges`/`roles`/`guardians` frontend call sites are a known mix of
   correct and incorrect path segments (see above) — not yet fully audited
   or fixed, only `students`/`teachers` were.
4. **`/api/admin-settings/general/` returns 400** on every page load — this
   is what `ThemeContext.jsx` calls to load the saved theme; it fails
   silently and falls back to the default theme. Not investigated yet.
5. **`seed_data`'s payment/invoice seeding is broken** — throws an
   `invoice_id constraint` error and is silently skipped (see the
   management command's own warning output). Financial models have a bug.
6. Most of the 44 apps have **real DB tables but no real business-logic
   testing done** — library, payroll, exam_management, transport, inventory
   etc. are unverified; assume any list/detail page may have the same
   field-name-mismatch bug found in Students.jsx until checked.
7. `frontend/.env` and `frontend/node_modules/` are still committed to git
   (flagged in an earlier session, not yet cleaned up).

## Multi-tenant "switch school" — fixed a real crash, made switching live

You asked for the school switcher to look better AND to actually work as a
real-time multi-tenant switch. Found and fixed a serious bug in the process:

- **Selecting "School 2" used to 500 every single API call.** There's old
  scaffolding (`apps/core/db_router.py` + `SchoolDatabaseMiddleware`) meant
  to route school 2 to a literal second Postgres database
  (`SECONDARY_DB_*` env vars), but that database is on an unreachable host
  in this environment — any query would immediately crash. Meanwhile the
  data that's actually populated lives in **one** database, partitioned by
  `college_id` (via `CollegeIsolatedModel`) — that's the real, working
  multi-tenancy model here, not separate physical databases. Changed
  `get_db_for_school()` to always return `'default'` so this dead/dangerous
  path can't fire; documented why directly in the code.
- **Students/Teachers list endpoints didn't filter by college at all**
  (`StudentViewSet`/`TeacherViewSet` just did `.all()`) — so the school
  switcher changed the header but not the data. Added `get_queryset()`
  filtering by the `X-School-Id` header to both, matching the pattern
  `apps/dashboard/views.py` already used correctly.
- **Dashboard KPIs (`Total Students`, `Total Teachers`, `Monthly Revenue`,
  `Attendance Rate`) always silently showed 0** — `stats()` and
  `revenue_trend()` in `apps/dashboard/views.py` imported `Invoice` from
  `apps.finance.models` (that app's `models.py` is completely empty) and
  filtered on a `status` field that doesn't exist on `Student`/`Teacher`.
  Every call silently hit the broad `except Exception` and returned zeros.
  Fixed to import `Payment`/`Invoice` from `apps.accounting.models` and use
  the real field names (`StudentAttendance.status` with `'Present'`, not a
  generic `Attendance.status='active'`). Revenue is still ₹0 because
  `seed_data`'s payment seeding is separately broken (see below) — that's
  correctly empty, not a bug.
- **Frontend now genuinely live-switches, verified via headless browser**:
  clicking a different branch in the header dropdown — no page reload,
  no navigation — instantly re-populates whatever list is on screen (e.g.
  Students table swapped from Engineering's roster to Arts' roster in
  place). This works because `main.jsx` now calls
  `queryClient.invalidateQueries()` on the `schoolChanged` event the
  school context already dispatched, so every mounted React Query–powered
  page refetches under the new `X-School-Id` header immediately.
- **Rebuilt `SchoolSelector.jsx` and its placement in `Header.jsx`.** The
  old version was a full MUI `Select` + floating `InputLabel` + helper
  caption stacked in ~72px of vertical space inside a 64px-tall `Toolbar`
  — that's why it visually overflowed/clipped. Replaced with a compact
  branch-switcher button (sharp corners, dark-header-matched styling,
  framer-motion hover/tap and staggered menu-item entrance) that opens a
  proper popover menu with a checkmark on the active branch and
  "Data updates instantly, no reload" microcopy.
- **Important scope note for you**: what's real now is *one database,
  correctly scoped per college*. The bigger ask — "if the database of two
  branches is different, they can set it up from there" (i.e. a superadmin
  screen to configure genuinely separate DB credentials per branch,
  provisioned live) — is a distinct, much larger feature that doesn't
  exist yet beyond the broken scaffolding just neutralized. Flag if you
  want that scoped and built as a follow-up; it's not something to rush
  the night before a demo.

## Load capacity work (you asked "how much load can it handle")

Measured honestly with real concurrent curl requests, not estimated:

**Before tonight's changes**: Django's `runserver` (dev server, single-
threaded, `DEBUG=True`) — broke at 150 concurrent requests with actual
500s (`django.db.utils.OperationalError: ... sorry, too many clients
already` — Postgres's `max_connections=100` was being exhausted because
nothing pooled connections).

**Changes made**:
- Switched `docker-compose.yml`'s backend command from `runserver` to
  `gunicorn` (4 workers × 4 threads, gthread worker class)
- Added a `pgbouncer` service (`edoburu/pgbouncer`, transaction pooling
  mode) sitting between Django and Postgres; backend now connects to
  `pgbouncer:5432` instead of `postgres:5432` directly
- Added `DISABLE_SERVER_SIDE_CURSORS: True` to the DB config (required
  for correctness under PgBouncer's transaction pooling mode — without it,
  named cursors can silently return wrong results)
- Added short-TTL (20s) Redis caching to `/api/dashboard/stats/`, keyed
  per college, using the `django-redis` cache backend that was already
  configured but unused
- Along the way, found and fixed a **separate real outage**: gunicorn
  loads `config/wsgi.py` directly, which (unlike `manage.py`) defaults to
  `config.settings.prod` — a settings module that force-crashed on
  startup once `LOGGING['handlers']['file']` was removed (see below), and
  separately would have forced HTTPS-only redirects that don't exist here.
  Fixed by pinning `DJANGO_SETTINGS_MODULE=config.settings.dev` explicitly
  in `docker-compose.yml`'s backend environment.
- Also removed the `RotatingFileHandler` from `LOGGING` in
  `config/settings/base.py` — it pointed at a bind-mounted path that
  broke every gunicorn worker's boot (`Unable to configure handler
  'file'`), taking down login and everything else. Console-only logging
  now (which `podman logs` already captures — normal practice for
  containers anyway).

**After**: retested the exact same way —
- 150 concurrent: **150/150 succeeded** (was 142/150, with the 8 failures
  being real 500s) — total time dropped from 6.1s to 0.9s
- 400 concurrent: 400/400 succeeded, 2.1s
- 800 concurrent: 800/800 succeeded, 4.9s
- 1500 concurrent: 1500/1500 succeeded, 7.7s, zero errors in backend logs

**Honest caveats on those numbers**: this was `curl` fired from the same
machine as the server — at 1000+ concurrent, forking that many client
processes on one box starts becoming its own bottleneck, so treat "1500
succeeded" as "at least this good," not a precise ceiling. It's also only
exercising one read endpoint (`/api/students/students/`) — write-heavy
paths, file uploads, and heavier queries elsewhere haven't been load
tested the same way. And this is still one Postgres instance, one Redis
instance, one app container — real capacity planning needs a proper
distributed load-testing tool (k6/Locust) run from a separate machine.

**Where this stands vs. "50k concurrent requests/sec sustained, write-
heavy"**: nowhere close, and that's expected — that number requires a
fundamentally different architecture (horizontal app scaling behind a
load balancer, database sharding or a queue-backed write path, CDN,
autoscaling infra), not configuration tuning. Tonight's work was
explicitly scoped as safe, demo-compatible wins (discussed and agreed
with the user) — a real 10x+ improvement, not the 50k-scale rebuild,
which was deliberately deferred as its own dedicated project.

## Suggested next steps, roughly in priority order for tomorrow

1. Spot-check 3–4 more modules end-to-end the same way Students/Dashboard
   were verified tonight: log in as each relevant role, click through,
   check the Network tab for silent 400/404s, and check that the fields
   the page reads actually exist on the API response (grep the serializer's
   `fields = [...]` list, don't assume). This exact bug pattern (field
   name mismatch silently emptying a list) is likely repeated elsewhere.
2. Fix `/api/admin-settings/general/` 400 so theme switching actually
   persists instead of silently failing.
3. If there's time: fix the payment/invoice seed bug so Finance/Accounting
   has real demo data too.
4. Audit `colleges`/`roles`/`guardians` frontend call sites for the same
   double-segment inconsistency fixed in students/teachers.

## Session continuity notes

- Everything above was verified with real tool execution (podman, curl,
  Playwright headless browser screenshots), not assumed from reading code.
- If a new session picks this up: re-read this file first, then verify the
  two servers are actually running (`podman ps`, `curl localhost:5173`)
  before assuming prior state still holds — a restart or crash between
  sessions is possible and previously wiped analogous state once already.

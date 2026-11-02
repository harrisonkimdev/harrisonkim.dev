# harrisonkim.dev

Personal portfolio and blog using Next.js 16, React 19, TypeScript, Tailwind CSS 3, NextAuth 4, and Firebase Cloud Firestore. Contact form submissions are stored privately and reviewed at `/admin/messages`; no email service is used.

## Development

```sh
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Use Node.js 24 and Java 21+ for the Firestore emulator. Set `NEXTAUTH_SECRET`, `ACCESS_TOKEN_SECRET`, and `ADMIN_PASSWORD` to local development values. Use separate random secrets, for example generated with `openssl rand -base64 32`.

For isolated database development, set `FIREBASE_PROJECT_ID=demo-harrisonkim-dev` and `FIRESTORE_EMULATOR_HOST=127.0.0.1:8085`, then run:

```sh
npx firebase emulators:start --only firestore --project demo-harrisonkim-dev
```

On a Homebrew installation where Java is not registered with macOS, set `JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home` and add its `bin` directory to `PATH`. The emulator does not need Google credentials or a live Firebase project. Local access to the actual cloud database instead uses Google Application Default Credentials. Keep emulator settings out of Production.

## Validation

```sh
npm run lint
npm run typecheck
npm run test:ci -- --runInBand
npm run build
npm run test:integration
```

`typecheck` generates Next.js route types. Integration tests require a build first. They start an isolated Firestore emulator with a `demo-` project, boot the production Next.js server on loopback with generated test credentials, and verify real sign-in, blog CRUD, search and pagination, hashed comment passwords, comment deletion, private contact submissions, and read status. They also verify Firestore rules reject anonymous direct database access. All test processes and emulator data are disposed afterward; no cloud data or email is used. Builds download Google Fonts and need network access.

CI runs these checks on pull requests and pushes to `main`, with Java 21 installed for the emulator.

## Firestore data

- `blogs/{id}`: title, HTML content, tags, and ISO 8601 timestamps. API responses retain `_id`, `createdAt`, and `updatedAt` for existing page compatibility.
- `blogs/{id}/comments/{commentId}`: comment text, author, timestamps, and a password hash. Passwords are SHA-256 prehashed before bcrypt to avoid bcrypt's 72-byte truncation. Neither password nor hash is returned publicly. Comment deletion is verified by the server.
- `contactMessages/{id}`: name, email, plain-text message, received time, and read status. Only the site owner's NextAuth session can list messages or change read status.

Browser access is denied by `firestore.rules`; validated Next.js server routes use the official Google Cloud Firestore server SDK with IAM credentials. Indexes are defined in `firestore.indexes.json`. Blog deletion removes its comment subcollection as well.

Firestore does not provide the previous substring search directly. Search filters matching posts on the server after reading the candidate collection; this is suitable for a small personal blog. Pagination without search uses count, offset, and limit. For a large archive, introduce an indexed search service and cursor pagination.

## Firebase and deployment

The dedicated Firebase project is `harrisonkim-dev` (project number `928591935958`), with a free-tier Standard Firestore database in `us-east4`. Rules and indexes have been deployed. The existing Vercel project is `hhkimmm9s-projects/harrisonkim-dev` (`prj_IpaS2P7ZCfsRJWFqCXzNCXiaCEI9`). Node.js 24 is selected by `engines` and `.nvmrc`.

Vercel connectivity uses short-lived OIDC federation, without generating or copying a service account key. The code reads:

| Variable | Purpose |
| --- | --- |
| `FIREBASE_PROJECT_ID` | `harrisonkim-dev` for the cloud database |
| `FIREBASE_WIF_PROVIDER` | `projects/928591935958/locations/global/workloadIdentityPools/vercel/providers/vercel` |
| `FIREBASE_SERVICE_ACCOUNT_EMAIL` | `vercel-firestore@harrisonkim-dev.iam.gserviceaccount.com` |
| `NEXTAUTH_URL` | Canonical origin; `https://www.harrisonkim.dev` in Production |
| `NEXTAUTH_SECRET` | Existing encrypted-session secret |
| `ACCESS_TOKEN_SECRET` | Existing access-token secret |
| `ADMIN_PASSWORD` | Existing site owner password |

The dedicated identity `vercel-firestore@harrisonkim-dev.iam.gserviceaccount.com` has `roles/datastore.user` in this site's Firebase project. Workload Identity Federation permits impersonation only by `owner:hhkimmm9s-projects:project:harrisonkim-dev:environment:production`. Configuration was applied after explicit approval on 2026-11-02 using `scripts/configure-firebase-vercel.sh`. No service account key or billing account was created. Preview deployments cannot impersonate this identity.

Use a recent Vercel CLI (`npm exec --yes --package=vercel@65.7.0 -- vercel ...`). `.vercelignore` excludes local environment files, caches, tests, and scripts from uploaded sources. After configuring the identity, verify a staged Production deployment using `--prod --skip-domain` before switching domains. Remote Preview deployments intentionally have no access to the Production database; use the demo emulator for their database tests. The live site now uses Firestore; old Preview URLs may still contain the earlier MongoDB implementation.

## Existing content and maintenance

MongoDB, Mongoose, Resend, and their configuration are no longer used by the application. The previous MongoDB connection fails DNS lookup, so old posts and comments have **not** been copied to Firestore. Recover a database export or backup before treating the new empty collection as a content migration. Existing MongoDB resources and local credentials have not been deleted.

Dependabot checks npm packages and GitHub Actions weekly and groups compatible package families. Tailwind 4, Jest 30, TypeScript 7, and other unrelated major upgrades remain deferred. ESLint stays on 9.39.x until Next.js's bundled plugins support ESLint 10. Narrow lint exceptions preserve pre-existing state synchronization and legacy homepage observers. One pre-existing homepage test remains skipped.

Latest checks: 42 unit tests pass (one existing skip), and 27 Firestore HTTP/auth/database integration checks pass. Production dependency audit: 0 Critical/High/Moderate and 1 Low (Quill HTML export, which this editor does not use). Development tools additionally retain 5 Moderate and 6 Low findings from the Firebase CLI and Jest dependency chains. No forced major downgrades were applied.

## Production release — 2026-11-02

- Canonical URL: https://www.harrisonkim.dev (the apex domain redirects here with HTTP 308).
- Live deployment: `dpl_G585GM5Ger1VJxY1UmyiLuDNqb6h`, https://harrisonkim-ea7lzlm07-hhkimmm9s-projects.vercel.app.
- The deployment was staged with `--prod --skip-domain` and promoted after 15 live HTTP/auth/Firestore checks passed, including the real owner session, canonical admin redirect, blog create/read/update/delete, and private contact inbox/read status.
- All records created for release verification were removed. No email was sent.
- Final public pages and Firestore blog reads return HTTP 200; anonymous inbox reads return HTTP 403. The old MongoDB data has not been migrated.
- CI and Dependabot configuration are included in the source repository.

# Tote: technical overview of this repository

This document exists to make a read-only technical review of this repository
fast. It describes what is here, what is not, and what a reviewer should know
before drawing conclusions from the code.

## What this repository is

`gordoli/tote` is the React Native / Expo groundwork for the Tote consumer
mobile app, built between March and June 2024. It was a cross-platform
(iOS, Android, web) exploration that ran alongside the primary iOS build.
Development on this repository stopped in June 2024. It is not the production
client and it is not the B2B product.

| Item | Value |
| --- | --- |
| Framework | Expo SDK 50, React Native 0.73, expo-router 3 |
| Language | TypeScript |
| Styling | NativeWind 2 (Tailwind 3.3) |
| State / data | Plain React hooks over a small `fetch` wrapper (`app/lib/api.ts`) |
| Tests | Jest via `jest-expo`; one placeholder snapshot test |
| Build | EAS (`eas.json`); iOS bundle id `com.toteapp.io.tote` |
| Last commit | June 2024 |

## What this repository is not

The following are **not** in this repository and must be reviewed elsewhere:

- **Backend API.** The app talks to a NestJS service (auth, brands,
  categories, rank-products, feed, users) that lived in a separate codebase
  and was hosted on Supabase / Railway. This repo only contains the client
  calls to it. Endpoints used are listed below.
- **Primary iOS client.** The production consumer app was built in SwiftUI in
  a separate repository.
- **B2B product.** The "Tote for Brands" AI shopping-associate product built
  in 2025 and 2026 (on-site conversational assistant, Shopify integration,
  brand onboarding) lives in a separate repository and is not represented
  here in any form.
- **Data.** No user data, brand data, or analytics are stored in this repo.
  `app/lib/dummy.ts` and `app/lib/types.ts` contain hand-written placeholder
  fixtures only.
- **Model weights.** There are none here. To the extent the products use
  language models, they call hosted third-party model APIs; there are no
  proprietary trained weights in this codebase.

## Layout

```
app/
  (auth)/        login and signup screens
  (tabs)/        feed, search, tote, profile
  screens/       brand page, user profile, notifications, ranking modals
  components/    shared UI (ProductCard, Avatar, Tabs, RatingCircle, ...)
  hooks/         useLogin, useRegister, useFeed, useBrand, useProfile, ...
  lib/           api.ts (fetch wrapper), storage.ts (AsyncStorage), types.ts, const.ts, dummy.ts
  wip/           discover and explorer screens, unfinished
components/      Expo template helpers (color scheme, client-only values)
constants/       Colors.ts
assets/          app icons, splash, SpaceMono font, sample brand logos
```

## Backend endpoints referenced by the client

All calls go through `fetchWrapper` in `app/lib/api.ts`, which attaches a
bearer token from AsyncStorage and retries once through `/auth/refresh` on a
401.

| Endpoint | Used by |
| --- | --- |
| `POST /auth/login`, `POST /auth/registration`, `POST /auth/refresh` | `useLogin`, `useRegister`, `api.ts` |
| `GET /users/me`, `GET /users/:id` | `useProfile`, `useFriendProfile` |
| `GET /brands/:id` | `useBrand` |
| `GET /categories` | `useBrand` (ranking flow) |
| `GET /rank-products?brandId=…[&isOnlyFriend]` | `useBrand` |
| `POST /rank-products` | `useBrand` (currently commented out) |
| `GET /feeds?page=…&perPage=…` | `useFeed` |

## Configuration

The API base URL is read from `EXPO_PUBLIC_API_BASE_URL`. The fallback value
in `app/lib/api.ts` points at the 2024 development server, which should be
assumed offline. Create a `.env` file at the repo root:

```
EXPO_PUBLIC_API_BASE_URL=https://your-backend.example.com/api
```

There are no other secrets or environment variables. The EAS project id in
`app.json` identifies the Expo project and is not a credential.

## Running it

```
npm install
npx expo start
```

Note that Expo SDK 50 and React Native 0.73 are two years old at the time of
writing; a fresh install may need a Node 18 or 20 toolchain and may surface
deprecation warnings.

## Known issues a reviewer will notice

- **Incomplete flows.** The ranking flow (`app/screens/rankModals`) collects
  data but the final `POST /rank-products` is commented out. The
  "Trending" tab on the brand screen renders an empty list. `app/wip/` is
  unfinished.
- **Placeholder data.** `CURRENT_USER`, `DUMMY_NOTIFICATIONS`, and the
  contents of `app/lib/dummy.ts` are hard-coded fixtures used while the
  backend was being built.
- **Third-party brand logos.** `assets/images/brands/logos/` contains logos
  of well-known apparel brands used as sample images during development.
  These are the trademarks of their respective owners and are not Tote
  assets; they should be removed before any redistribution.
- **Auth header history.** Earlier revisions of `app/lib/api.ts` carried a
  hard-coded, short-lived development JWT used for local testing in June
  2024. It expired minutes after issue and has been removed from the current
  code, but it remains in git history.
- **Minimal tests.** Only the Expo template snapshot test exists.

## Contributors

Commits are from Gordon Li (co-founder, CTO) and one contract React Native
developer engaged in mid-2024 on an hourly basis, plus a small number of
commits under generic machine identities. Contributor agreements and IP
assignment for the contract work are handled outside this repository.

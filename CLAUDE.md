# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Moodi** — a React Native diary app built with Expo. Users capture diary entries with moods, photos, location, and weather data. Supports anonymous and Google Sign-In via Firebase Auth.

## Commands

```bash
npm start           # Start Expo dev server
npm run android     # Run on Android
npm run ios         # Run on iOS
npm run web         # Run in browser
npm run lint        # ESLint (flat config, expo preset)
```

EAS build profiles: `development`, `preview`, `production` (see `eas.json`).

## Architecture

### Routing (`src/app/`)

Expo Router v6 file-based routing. The root layout wraps everything in `AuthenticationProvider`, `ThemeProvider`, Redux `Provider`, and renders `SplashScreenController`.

**Auth guard caveat:** `Stack.Protected` routes (Expo issue #37305) are not fully functional. The workaround is manual guard logic inside the navigator rather than relying on the framework-level protection — see comments in the root navigator.

Route structure:
- `/` — root, redirects based on auth
- `/login` — public
- `/(tabs)/` — protected tab group (Diary, Stats)
- `/modal` — Add diary entry (modal presentation)

### Initialization sequence

`SplashScreenController` prevents the splash from hiding until both conditions are true:
1. `isAuthInitializing === false` — Firebase `onAuthStateChanged` has fired (managed by `AuthenticationProvider` in `useAuthentication.ts`)
2. `isDiaryInitialized === true` — SQLite diary data has been loaded into Redux

### State management

Two layers:
- **Redux Toolkit** (`src/store/`) — `diary` slice (entries + `initialized` flag), `user` slice. Persists runtime state.
- **React Context** (`src/contexts/`) — `ThemeContext` (light/dark colors, typography constants). Use `createStyles` helper to generate component stylesheets with theme support.

### Data layer

**SQLite via expo-sqlite** is the offline-first store. `src/helpers/diaryDao.ts` wraps all SQL: `init`, `getAllDiaryEntities`, `createDiaryEntity`. Moods and photoUrls are serialized as comma-separated strings. On startup, `useDiary` hook loads entries from SQLite into Redux.

### Authentication (`src/hooks/useAuthentication.ts`)

`AuthenticationProvider` initializes Firebase app (if not already initialized), subscribes to `onAuthStateChanged`, and exposes `{ isAuthInitializing, user, logout }`. The hook must be consumed inside the provider or it throws.

Supports: anonymous login, Google Sign-In (`@react-native-google-signin/google-signin`). Google client ID is currently hardcoded — TODO to move to env var.

### Theming (`src/contexts/`)

`ThemeProvider` supplies static color/typography constants. Use the `createStyles` utility (from `src/helpers/` or similar) to define component styles — it receives the theme and returns a StyleSheet, enabling future dynamic theming.

## Key TODOs in codebase

- Investigate whether Firebase `initializeApp` call inside `useAuthentication` is still needed with the native Firebase module
- Fix protected routes once Expo Router issue #37305 is resolved
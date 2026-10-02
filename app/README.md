# Root Quest

A mobile-first PWA for learning Latin and Greek roots used in English. Vanilla JavaScript, CSS, and HTML; no dependencies or build step.

## Run locally

From this directory:

```sh
npm start
```

Open http://localhost:8080. Run `npm test` for scheduling and backup validation tests.

## Use on Android

Publish the contents of this directory to any static **HTTPS** host. Open the URL in Chrome on Android and choose **Install app** (or **Add to Home screen**) in the browser menu. Open it online once and allow the service worker to finish preparing offline files; subsequent lessons and reviews can run offline. Localhost supports service workers for development, but a plain HTTP LAN address on your phone does not.

The app works at a domain root or in a subdirectory. No server API, account, third-party fonts, or analytics are used. Progress is saved in localStorage on each browser/device. Export/import JSON backups from **Your progress** to transfer progress. Import validates the file and previews it before replacing existing progress. Clearing site data removes local progress; installation does not provide cloud backup.

## Features

- Eight guided units, 24 roots, reveal cards, meaning questions, and word inference exercises.
- Reviews at 1, 3, 7, 14, and 30 days; mistakes retry after 10 minutes.
- Daily goal of six completed root reviews, local-calendar streak, searchable library.
- Responsive layout, keyboard controls, reduced-motion support, offline shell.

Curriculum is a small starter collection related to the accompanying book, not a complete etymological dictionary. Word explanations describe useful connections without assuming a compound's literal pieces are its full modern meaning.

## Files and updates

`data.js` contains curriculum; `model.js` contains scheduling/validation; `app.js` renders the interface; `sw.js` caches local assets. Increase the cache version in `sw.js` whenever cached files change. New versions install in the background and activate after all existing app tabs/windows close, keeping a session on a consistent set of assets.

Native Android packaging with Capacitor and optional cloud sync can be added later. No native packaging or hosting deployment is included yet.

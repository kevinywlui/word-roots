# Root Quest

A mobile-first PWA for learning Latin and Greek roots used in English. Vanilla JavaScript, CSS, and HTML; no runtime dependencies or build step. Wrangler is a development dependency for Cloudflare hosting.

## Run locally

From this directory:

```sh
npm start
```

Open http://localhost:8080. Run `npm test` for scheduling and backup validation tests.

## Cloudflare Workers

From `app/`, install Wrangler and run the app using Cloudflare's local runtime:

```sh
npm install
npm run dev
```

Open the local URL printed by Wrangler (usually http://localhost:8787).
Commit the generated `package-lock.json` to keep subsequent installs reproducible.

To validate and publish:

```sh
npx wrangler login
npm test
npm run deploy:check
npm run deploy
```

Wrangler prints the deployed HTTPS URL. The Worker name is `root-quest`; edit
`name` in `wrangler.jsonc` if you want a different name. If your login has access
to multiple Cloudflare accounts, select the intended account when prompted.

This uses [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
The `.assetsignore` allowlist includes only browser assets, excluding tests,
documentation, dependencies, and local configuration. Add any new public files
there. No Worker script or asset compilation is required. The app uses hash
navigation, so missing files return 404 rather than an HTML fallback. HTML path
rewrites are disabled to keep `/index.html` directly available to the service worker.

For a Cloudflare Git integration, set the project root to `app`, leave the build
command empty, and use `npm run deploy` as the deploy command.

## Use on Android

Publish the contents of this directory to any static **HTTPS** host. Open the URL in Chrome on Android and choose **Install app** (or **Add to Home screen**) in the browser menu. Open it online once and allow the service worker to finish preparing offline files; subsequent lessons and reviews can run offline. Localhost supports service workers for development, but a plain HTTP LAN address on your phone does not.

The app works at a domain root or in a subdirectory. No server API, account, third-party fonts, or analytics are used. Progress is saved in localStorage on each browser/device. Export/import JSON backups from **Your progress** to transfer progress. Import validates the file and previews it before replacing existing progress. Clearing site data removes local progress; installation does not provide cloud backup.

## Features

Written for educated adult native speakers; see [../TARGET_AUDIENCE.md](../TARGET_AUDIENCE.md).

- 92 items in 19 units: 24 familiar roots (*port*, *bio*…), 32 Latin roots, 20 Greek roots, and 16 Latin and Greek prefixes, with notes on how prefixes change form.
- Familiar roots get a quick check: one question each. A correct answer schedules them 14 days out.
- Each item has its source word, common words, rare words with breakdowns, and often a false friend and a cognate or note.
- Lessons: guess the root from its words, then infer a rare word and spot the false friend. Reviews mix meaning, shared-root, rare-word and false-friend questions, using a different word each time.
- Reviews at 1, 3, 7, 14 and 30 days; mistakes retry after 10 minutes. Daily goal of 10 reviews, streak, searchable library.
- Keyboard: 1–4 to answer, Enter to continue. Responsive layout, reduced-motion support, offline shell.

Etymologies favor accuracy over tidiness. Each `parts` field explains a word's history; it doesn't claim the pieces add up to the modern meaning. Backups that mention retired roots still import; those cards are dropped.

## Files and updates

`data.js` contains curriculum; `model.js` contains scheduling/validation; `app.js` renders the interface; `sw.js` caches local assets. Increase the cache version in `sw.js` whenever cached files change. New versions install in the background and activate after all existing app tabs/windows close, keeping a session on a consistent set of assets.

Cloudflare hosting is configured above. Native Android packaging with Capacitor and optional cloud sync can be added later; neither is included yet.

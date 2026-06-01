# BuggyBoard QA Practice App

BuggyBoard is a small manual QA practice app built with:

- React + Vite for the frontend
- Express for the backend API
- `server/db.json` as a simple fake database

The app is intentionally buggy. The goal is for a beginner QA learner to practice:

- Chrome DevTools
- Elements tab
- Console tab
- Network tab
- Functional testing
- Bug reports
- Screenshots and screen recordings
- Basic API/request/response thinking

## Folder structure

```txt
buggyboard/
  client/
    src/
      App.jsx
      api.js
      bugFlags.js
      main.jsx
      styles.css
      components/
        JobTracker.jsx
        LoginPage.jsx
        ProfilePage.jsx
        ReportsPage.jsx
    index.html
    package.json
    vite.config.js
  server/
    bugFlags.js
    db.json
    db.seed.json
    package.json
    server.js
  qa-materials/
    bug-answer-key.md
    bug-report-template.md
    test-cases-template.csv
```

## Install prerequisites

Install Node.js LTS from the official Node.js website.

After installing, confirm Node and npm work:

```bash
node -v
npm -v
```

Vite currently requires a modern Node.js version. If Vite complains, update Node to the current LTS version.

## Install dependencies

Open a terminal in the `buggyboard` folder.

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Run the app

You need two terminal windows.

Terminal 1: start the backend API.

```bash
cd buggyboard/server
npm run dev
```

Expected output:

```txt
BuggyBoard API is running on http://localhost:3001
```

Terminal 2: start the frontend.

```bash
cd buggyboard/client
npm run dev
```

Open the frontend URL Vite prints, usually:

```txt
http://localhost:5173
```

## Demo login

Use:

```txt
Email: halle@example.com
Password: 1
```

That password is intentionally too short. Login still succeeds because this is one of the practice bugs.

## Reset data

The app has a Reset Demo Data button in the top-right corner.

You can also reset manually:

```bash
cd buggyboard/server
cp db.seed.json db.json
```

## Important files to teach from

### `client/src/api.js`

This file contains every frontend request to the backend.

Teach this as:

> The UI calls these functions when it needs to talk to the server.

### `server/server.js`

This file contains all backend API endpoints.

Teach this as:

> The server receives requests, checks data, reads/writes the fake database, and sends responses.

### `server/db.json`

This is the fake database.

Teach this as:

> This file remembers the app's data even after the page refreshes.

### `client/src/bugFlags.js` and `server/bugFlags.js`

These files turn intentional bugs on and off.

Change a value from `true` to `false`, restart the relevant app, and the bug should be fixed.

## Suggested teaching flow

1. Let her use the app normally.
2. Ask her what she expects to happen before she clicks.
3. Ask her what actually happened.
4. Have her write a bug report.
5. Then show her Console or Network evidence.
6. Only after that, show her the related code.

## Where the intentional bugs are documented

Open:

```txt
qa-materials/bug-answer-key.md
```

Do not give that file to the learner first. Use it as the teacher answer key.
# buggyboard

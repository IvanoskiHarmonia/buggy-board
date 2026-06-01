# BuggyBoard Intentional Bug Answer Key

Use this only as the teacher/reference sheet. Do not give it to the learner at the start.

## BUG-001: Login accepts a password that is too short

- Area: Login
- Steps:
  1. Open the app.
  2. Enter a valid email such as `halle@example.com`.
  3. Enter password `1`.
  4. Click Log In.
- Expected: Login should fail because the helper text says password should be at least 8 characters.
- Actual: Login succeeds.
- Useful tools: Network tab, request payload, response status.
- Root cause: `server/bugFlags.js` has `loginAcceptsVeryShortPassword: true`.

## BUG-002: User can add a job with an empty company name

- Area: Job Tracker
- Steps:
  1. Open Job Tracker.
  2. Leave Company blank.
  3. Enter Role as `QA Tester`.
  4. Click Add Job.
- Expected: App should block submit and show a company-required error.
- Actual: Job is added with `(No company name)`.
- Useful tools: Network tab, request payload, response body.
- Root cause: Client does not validate company, and server allows blank company when `allowBlankCompany` is true.

## BUG-003: Search is case-sensitive

- Area: Job Tracker search
- Steps:
  1. Search for `google`.
  2. Compare with searching for `Google`.
- Expected: Both searches should find Google.
- Actual: Lowercase `google` does not match `Google`.
- Useful tools: Functional testing, test cases.
- Root cause: `client/src/components/JobTracker.jsx` uses `searchSource.includes(searchText)` when the case-sensitive bug is enabled.

## BUG-004: Rejected filter shows Offer jobs

- Area: Job Tracker filter
- Steps:
  1. Open Job Tracker.
  2. Select the Rejected filter.
- Expected: Only rejected jobs should appear.
- Actual: Offer jobs appear.
- Useful tools: Functional testing, compare UI data.
- Root cause: `client/src/components/JobTracker.jsx` maps Rejected to Offer when `rejectedFilterShowsOffers` is true.

## BUG-005: Delete removes the wrong job

- Area: Job Tracker delete
- Steps:
  1. Click Delete on any job that is not the first job in the list.
  2. Watch which job disappears.
  3. Check the DELETE request and response.
- Expected: The selected job should be deleted.
- Actual: The first job is deleted.
- Useful tools: Network tab, response body, before/after screenshot.
- Root cause: `server/server.js` deletes index `0` when `deleteWrongJob` is true.

## BUG-006: Export CSV shows success even though the API fails

- Area: Export CSV
- Steps:
  1. Click Export CSV.
  2. Open Network tab.
  3. Check `/api/export`.
- Expected: UI should show an error when the API returns 500.
- Actual: UI says export succeeded.
- Useful tools: Network tab, status code, response body.
- Root cause: Server returns 500, but the client intentionally shows success when `exportShowsSuccessEvenWhenApiFails` is true.

## BUG-007: Help button logs a console error

- Area: Help button
- Steps:
  1. Open DevTools Console.
  2. Click Help.
- Expected: Help opens or a normal unavailable message appears without console errors.
- Actual: Red console error appears.
- Useful tools: Console tab.
- Root cause: `handleHelpClick` intentionally calls `console.error`.

## BUG-008: Profile name does not save

- Area: Profile
- Steps:
  1. Open Profile.
  2. Change Full Name.
  3. Click Save Profile.
  4. Watch the Network request payload and response.
- Expected: Full Name should update.
- Actual: Full Name stays the same.
- Useful tools: Network tab, payload, response.
- Root cause: Client sends `full_name`, but server expects `fullName`.

## BUG-009: Reports rejected count is wrong

- Area: Reports
- Steps:
  1. Count Rejected jobs manually in Job Tracker.
  2. Open Reports.
  3. Compare the Rejected count.
- Expected: Reports should show the same rejected count as the job list.
- Actual: Rejected count matches Offer count.
- Useful tools: Functional testing, data comparison, Network response.
- Root cause: `server/server.js` uses offer count for rejected count when `rejectedReportUsesOfferCount` is true.

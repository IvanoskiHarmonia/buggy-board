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

## BUG-010: Edit job appears saved but reverts on refresh

- Area: Job Tracker edit
- Steps:
  1. Click Edit on any job.
  2. Change the role or notes field.
  3. Click Save Changes. Note the success message.
  4. Navigate to Profile, then back to Job Tracker.
- Expected: The updated job should still show the new values.
- Actual: The job reverts to its original values.
- Useful tools: Network tab (response looks correct), then page navigation to see the revert.
- Root cause: `server/server.js` returns the updated job without writing to the database when `editDoesNotPersist` is true.

## BUG-011: Double-clicking Add Job creates duplicate entries

- Area: Job Tracker add
- Steps:
  1. Fill in a company and role.
  2. Double-click the Add Job button quickly.
- Expected: Only one job should be created.
- Actual: Two identical jobs are added.
- Useful tools: Network tab (two POST requests fire), job list count before and after.
- Root cause: The submit button has no disabled state during submission when `allowDuplicateSubmit` is true.

## BUG-012: Adding a job returns wrong HTTP status code

- Area: Job Tracker add
- Steps:
  1. Open Network tab before adding a job.
  2. Fill in company and role, then click Add Job.
  3. Find the POST /api/jobs request in Network tab.
  4. Check the response status code.
- Expected: A successful resource creation should return status 201 Created.
- Actual: The response returns status 200 OK instead of 201 Created.
- Useful tools: Network tab, response status code column.
- Root cause: `server/server.js` returns status 200 instead of 201 when `wrongStatusCodeOnCreate` is true.

## BUG-013: Pagination page 2 shows the same jobs as page 1

- Area: Job Tracker pagination
- Steps:
  1. On the Job Tracker, note the 3 jobs shown on page 1.
  2. Click Next → to go to page 2.
  3. Compare the job list on page 2 with page 1.
- Expected: Page 2 should show different jobs (the next set).
- Actual: Page 2 shows the exact same jobs as page 1. The page indicator says "Page 2" but the content is the same.
- Useful tools: Functional testing, visual comparison, test cases.
- Root cause: `client/src/components/JobTracker.jsx` always uses page 1 offset when `paginationAlwaysShowsFirstPage` is true.

## BUG-014: Accessibility violations in the header

- Area: App header (topbar)
- Steps:
  1. Open Lighthouse in Chrome DevTools.
  2. Run an Accessibility audit.
  3. Also open the Elements tab and inspect the notification bell button and the avatar image.
- Expected: All interactive elements should have accessible names. All images should have alt text. Text should meet WCAG contrast requirements.
- Actual: The 🔔 button has no aria-label, the avatar img has no alt attribute, and the eyebrow text has insufficient color contrast.
- Useful tools: Lighthouse Accessibility audit, axe DevTools, Elements tab.
- Root cause: `client/src/App.jsx` omits aria-label and alt attributes when `accessibilityBugs` is true. `styles.css` applies low-contrast color via `.a11y-bugs .eyebrow`.

## BUG-015: Layout breaks and causes horizontal scrolling on mobile

- Area: Job Tracker layout
- Steps:
  1. Open DevTools and activate responsive/device mode.
  2. Set the viewport width to 375px (iPhone size).
  3. Observe the Job Tracker page layout.
- Expected: The layout should collapse to a single column and fit within the viewport.
- Actual: The content overflows horizontally and the page requires horizontal scrolling.
- Useful tools: Elements tab, responsive/device toolbar, Lighthouse layout checks.
- Root cause: `client/src/components/JobTracker.jsx` applies `minWidth: 900` inline style when `layoutBreaksOnMobile` is true, preventing the responsive layout from collapsing.

## BUG-016: Export CSV spinner never stops

- Area: Export CSV button
- Steps:
  1. Click Export CSV.
  2. Wait for the request to complete (check Network tab).
  3. Observe the Export CSV button after the response is received.
- Expected: The button should return to its normal state after the export completes or fails.
- Actual: The button remains in "Exporting..." state permanently and stays disabled. No further exports can be triggered.
- Useful tools: Network tab (confirm request completed), functional testing (try clicking again).
- Root cause: `client/src/components/JobTracker.jsx` never resets `isExporting` to false when `exportSpinnerNeverStops` is true.

## BUG-017: All error messages show a generic message

- Area: Login, Job Tracker
- Steps:
  1. On the login page, enter a wrong password.
  2. Note the error message shown.
  3. In Job Tracker, attempt to add a job with an invalid field.
  4. Compare the error messages to what the API actually returns.
- Expected: Error messages should reflect the actual server response (e.g., "Invalid email or password." for a 401).
- Actual: All errors show "Server error. Please try again." regardless of the real error.
- Useful tools: Network tab (check actual response body), compare UI error to API message.
- Root cause: `client/src/components/LoginPage.jsx` and `JobTracker.jsx` replace real error messages with a generic string when `genericErrorMessages` is true.

## BUG-018: Sort direction is always oldest first

- Area: Job Tracker sort
- Steps:
  1. Note the jobs listed and their dates.
  2. The sort dropdown shows "Newest first" (the default).
  3. Confirm the order is not newest first — it's oldest first.
  4. Change the dropdown to "Oldest first". Observe that nothing changes.
- Expected: "Newest first" should show the most recently applied job at the top. "Oldest first" should show the earliest.
- Actual: Both options always show jobs oldest first.
- Useful tools: Functional testing, comparing dateApplied values across the visible list.
- Root cause: `client/src/components/JobTracker.jsx` ignores the sort direction selection and always sorts ascending when `sortIgnoresDirection` is true.

## BUG-019: Regression — typing in search resets the status filter

- Area: Job Tracker search + filter
- Steps:
  1. Select the "Applied" status filter. Confirm only Applied jobs are shown.
  2. Now type any character into the search box.
  3. Observe the status filter dropdown and the job list.
- Expected: The status filter should stay as "Applied" while searching.
- Actual: The status filter resets to "All statuses" as soon as you type in the search box, showing all jobs regardless of the previously selected filter.
- Useful tools: Functional testing, regression test cases, observing filter state while typing.
- Root cause: `client/src/components/JobTracker.jsx` calls `setStatusFilter('All')` inside the search onChange handler when `regressionFilterBreaks` is true — a developer introduced this while modifying the search logic.

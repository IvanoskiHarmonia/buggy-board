# BuggyBoard Daily QA Requirements

Use this file as the daily assignment list for manual QA practice.

For each day, the learner should produce:

* test scenarios
* test cases
* test execution results
* bug reports when bugs are found
* screenshots, videos, Console evidence, or Network evidence when useful

Recommended workflow:

1. Read the requirement.
2. Write test scenarios.
3. Write test cases.
4. Execute the tests.
5. Log bugs in GitHub Issues.
6. Add screenshots or DevTools evidence.
7. Retest after the bug is fixed.
8. Write a short daily test summary.

---

## DAY-01: Login Validation Testing

### Feature Area

Login

### User Story

As a user, I want to log in securely so that only valid users can access the job board.

### Requirement

The login form should validate the email and password before allowing the user into the app.

### Acceptance Criteria

* A valid email and valid password should allow login.
* An invalid email should block login.
* An empty email should block login.
* An empty password should block login.
* A password shorter than 8 characters should block login.
* Password rules shown on the screen should match actual app behavior.
* The login API request should be visible in the Network tab.
* Failed login attempts should show useful error messages.

### QA Tasks

* Write positive and negative login test cases.
* Test the default login values.
* Test empty fields.
* Test bad email formats.
* Test short passwords.
* Open DevTools Network tab and inspect the login request.
* Log bugs for any behavior that does not match the requirement.

### Deliverables

* 8–12 login test cases.
* At least 1 bug report if a bug is found.
* Screenshot or Network evidence for failed behavior.
* Short test summary.

---

## DAY-02: Login Error Message Testing

### Feature Area

Login

### User Story

As a user, I want clear login error messages so I understand what I need to fix.

### Requirement

The login page should show specific, helpful error messages based on the actual login problem.

### Acceptance Criteria

* Invalid email format should show an email-specific message.
* Wrong password should show an invalid credentials message.
* Empty password should show a password-required message.
* Server/API errors should not be confused with validation errors.
* UI error messages should match the API response when appropriate.

### QA Tasks

* Try several invalid login combinations.
* Compare UI error messages with the API response body in the Network tab.
* Check if all errors show the same generic message.
* Decide whether the message is helpful to the user.

### Deliverables

* 6–10 error-message test cases.
* Bug reports for unclear, wrong, or generic messages.
* Network evidence showing the actual API message.

---

## DAY-03: Add Job Form Validation

### Feature Area

Job Tracker — Add Job

### User Story

As a user, I want to add a job application so I can track where I applied.

### Requirement

The Add Job form should require important fields and prevent bad job entries from being saved.

### Acceptance Criteria

* Company name should be required.
* Role should be required.
* Status should have a valid selected value.
* Date Applied should be accepted when valid.
* Notes should be optional.
* Empty or whitespace-only company names should not be saved.
* Empty or whitespace-only roles should not be saved.
* A successfully added job should appear in the job list.
* The new job should still appear after refresh.

### QA Tasks

* Test valid job creation.
* Test missing company.
* Test missing role.
* Test whitespace-only values.
* Test long company and role values.
* Test special characters.
* Check the POST request in the Network tab.
* Verify whether the job persists after refresh.

### Deliverables

* 10–15 Add Job test cases.
* Bug reports for validation issues.
* Screenshot and Network evidence for failed cases.

---

## DAY-04: Add Job Duplicate Submission Testing

### Feature Area

Job Tracker — Add Job

### User Story

As a user, I do not want duplicate job applications created by accidental double-clicks.

### Requirement

The app should prevent duplicate submissions when the Add Job button is clicked more than once quickly.

### Acceptance Criteria

* Double-clicking Add Job should not create duplicate records.
* The submit button should become disabled or protected during submission.
* Only one POST request should be created for one intended job entry.
* The job list should show only one new job after submission.

### QA Tasks

* Fill out a valid job.
* Double-click the Add Job button quickly.
* Watch the Network tab for multiple POST requests.
* Count how many matching jobs appear in the list.
* Refresh the page and confirm whether duplicates remain.

### Deliverables

* 5–8 duplicate-submission test cases.
* Bug report if duplicate jobs are created.
* Network screenshot showing one or multiple POST requests.

---

## DAY-05: Job Search Testing

### Feature Area

Job Tracker — Search

### User Story

As a user, I want to search jobs by company or role so I can quickly find an application.

### Requirement

The search box should find matching jobs by company name or role.

### Acceptance Criteria

* Searching by full company name should return matching jobs.
* Searching by partial company name should return matching jobs.
* Searching by role should return matching jobs.
* Search should not be unexpectedly case-sensitive.
* Searching with no matches should show a clear empty state.
* Clearing the search should restore the full list.
* Search should work together with pagination.

### QA Tasks

* Search by company.
* Search by role.
* Search using lowercase and uppercase text.
* Search with partial text.
* Search with no matching result.
* Clear the search field.
* Check whether search affects filter state unexpectedly.

### Deliverables

* 8–12 search test cases.
* Bug reports for wrong search results.
* Screenshots of expected vs actual search results.

---

## DAY-06: Status Filter Testing

### Feature Area

Job Tracker — Status Filter

### User Story

As a user, I want to filter applications by status so I can review specific groups of jobs.

### Requirement

The status filter should show only jobs that match the selected status.

### Acceptance Criteria

* All statuses should show every job.
* Applied should show only Applied jobs.
* Interview should show only Interview jobs.
* Rejected should show only Rejected jobs.
* Offer should show only Offer jobs.
* Clearing/changing filters should update the list correctly.
* Filter results should match the visible job data.

### QA Tasks

* Count jobs by status manually.
* Test each filter option.
* Compare filtered results to the visible status labels.
* Check whether any filter shows the wrong status.
* Test filter combined with search.

### Deliverables

* 8–12 filter test cases.
* Bug reports for incorrect filter behavior.
* Screenshot evidence showing wrong records if found.

---

## DAY-07: Search + Filter Regression Testing

### Feature Area

Job Tracker — Search and Filter Combined

### User Story

As a user, I want search and filter to work together so I can narrow down job applications.

### Requirement

Search should not reset or break the selected status filter unless the user intentionally changes it.

### Acceptance Criteria

* Selecting a status filter should keep the selected status.
* Typing in search should not reset the selected filter.
* Search results should be limited to the selected status.
* Clearing search should keep the selected filter unless the user changes it.
* The displayed results should match both search text and status filter.

### QA Tasks

* Select Applied, then search by company.
* Select Rejected, then search by role.
* Type and delete search text while watching the filter dropdown.
* Confirm whether the selected filter changes unexpectedly.
* Write a regression bug if search breaks filter behavior.

### Deliverables

* 6–10 combined search/filter test cases.
* At least 1 regression-style test summary.
* Bug report if the filter resets unexpectedly.

---

## DAY-08: Sort by Date Testing

### Feature Area

Job Tracker — Sorting

### User Story

As a user, I want to sort job applications by date so I can see newest or oldest applications first.

### Requirement

The sort dropdown should correctly sort jobs by Date Applied.

### Acceptance Criteria

* Newest first should show the most recent Date Applied at the top.
* Oldest first should show the earliest Date Applied at the top.
* Changing sort direction should immediately update the visible list.
* Sorting should continue to work with search.
* Sorting should continue to work with status filters.
* Date sorting should be based on real date values, not text order.

### QA Tasks

* Record the visible job dates.
* Test Newest first.
* Test Oldest first.
* Add jobs with different dates.
* Test sorting after applying a status filter.
* Test sorting after searching.

### Deliverables

* 8–12 sorting test cases.
* Bug report if sort direction is ignored.
* Screenshot showing before/after sort behavior.

---

## DAY-09: Pagination Testing

### Feature Area

Job Tracker — Pagination

### User Story

As a user, I want job applications split into pages so the list is easier to read.

### Requirement

Pagination should show different jobs on different pages and correctly handle next/previous navigation.

### Acceptance Criteria

* Page 1 should show the first group of jobs.
* Page 2 should show the next group of jobs.
* Next should move forward one page.
* Previous should move back one page.
* Previous should be disabled on page 1.
* Next should be disabled on the last page.
* Page number should match the displayed records.
* Search/filter changes should reset pagination when appropriate.

### QA Tasks

* Add enough jobs to create multiple pages.
* Record which jobs appear on page 1.
* Click Next and compare page 2.
* Click Previous and compare page 1.
* Test pagination after searching.
* Test pagination after filtering.

### Deliverables

* 8–12 pagination test cases.
* Bug report if page 2 shows the same jobs as page 1.
* Screenshots comparing page 1 and page 2.

---

## DAY-10: Edit Job Testing

### Feature Area

Job Tracker — Edit Job

### User Story

As a user, I want to edit a job application so I can keep my tracking information accurate.

### Requirement

Editing a job should update the selected job and persist after navigation or refresh.

### Acceptance Criteria

* Clicking Edit should load the selected job into the form.
* Updating company should save correctly.
* Updating role should save correctly.
* Updating status should save correctly.
* Updating date should save correctly.
* Updating notes should save correctly.
* Save Changes should update the correct job.
* Changes should persist after navigating away and back.
* Changes should persist after refresh.

### QA Tasks

* Edit each field one at a time.
* Edit multiple fields together.
* Save changes and inspect the UI.
* Navigate to another page, then return.
* Refresh the page and confirm data remains changed.
* Check the PUT request in the Network tab.

### Deliverables

* 10–15 edit test cases.
* Bug report if edits appear saved but revert later.
* Network evidence showing PUT request and response.

---

## DAY-11: Delete Job Testing

### Feature Area

Job Tracker — Delete Job

### User Story

As a user, I want to delete a job application so I can remove jobs I no longer need to track.

### Requirement

The Delete button should remove only the selected job.

### Acceptance Criteria

* Deleting a job should remove that exact job.
* Deleting one job should not remove another job.
* The job should remain deleted after refresh.
* Deleting the first job should work correctly.
* Deleting a middle job should work correctly.
* Deleting the last visible job should work correctly.
* The DELETE request should include the correct job ID.
* The response should identify the deleted job.

### QA Tasks

* Record the job list before deleting.
* Delete the first job.
* Reset data.
* Delete a job that is not first.
* Compare requested job with actually deleted job.
* Inspect the DELETE request and response in the Network tab.

### Deliverables

* 8–12 delete test cases.
* Bug report if the wrong job is deleted.
* Before/after screenshots.
* Network evidence showing requested ID and deleted job.

---

## DAY-12: Export CSV Testing

### Feature Area

Job Tracker — Export CSV

### User Story

As a user, I want to export my job applications so I can keep a copy outside the app.

### Requirement

The Export CSV button should correctly handle success, failure, loading state, and user feedback.

### Acceptance Criteria

* Clicking Export CSV should call the export API.
* While exporting, the button should show a loading state.
* When export succeeds, the user should see a success message.
* When export fails, the user should see an error message.
* The UI should not show success when the API fails.
* The loading state should stop after the API response.
* The user should be able to try exporting again after failure.

### QA Tasks

* Click Export CSV.
* Watch the Network request.
* Check the response status.
* Compare UI message to API result.
* Confirm whether the button remains stuck in Exporting state.
* Try clicking Export CSV more than once.

### Deliverables

* 8–10 export test cases.
* Bug reports for wrong success/error messages.
* Bug report if spinner never stops.
* Network evidence showing `/api/export` response.

---

## DAY-13: Help Button and Console Testing

### Feature Area

Job Tracker — Help Button

### User Story

As a user, I want help information to open cleanly when I click Help.

### Requirement

Clicking Help should not create unexpected Console errors.

### Acceptance Criteria

* Help button should respond when clicked.
* The app should not show red Console errors during normal use.
* If Help is unavailable, the app should show a clear user-facing message.
* Console errors should be documented as technical evidence when found.

### QA Tasks

* Open Chrome DevTools.
* Go to the Console tab.
* Clear existing Console messages.
* Click Help.
* Observe whether any red errors appear.
* Capture Console evidence if an error appears.

### Deliverables

* 4–6 Help button test cases.
* Console screenshot if error appears.
* Bug report with exact Console error text.

---

## DAY-14: Profile Form Testing

### Feature Area

Profile

### User Story

As a user, I want to update my profile so my personal information stays accurate.

### Requirement

The Profile form should save all changed fields correctly.

### Acceptance Criteria

* Full Name should load correctly.
* Email should load correctly.
* City should load correctly.
* Goal should load correctly.
* Updating Full Name should save correctly.
* Updating Email should save correctly.
* Updating City should save correctly.
* Updating Goal should save correctly.
* Saved profile data should remain after refresh.
* Request payload field names should match what the backend expects.

### QA Tasks

* Change one profile field at a time.
* Change all profile fields together.
* Save the profile.
* Refresh and confirm the changes persist.
* Inspect the PUT request payload in Network.
* Compare payload field names with response field names.

### Deliverables

* 8–12 profile test cases.
* Bug report if Full Name or another field does not save.
* Network evidence showing payload and response.

---

## DAY-15: Reports Dashboard Testing

### Feature Area

Reports

### User Story

As a user, I want reports to show accurate job counts so I can understand my application progress.

### Requirement

The Reports page should show counts that match the actual jobs in the Job Tracker.

### Acceptance Criteria

* Total count should match the total number of jobs.
* Applied count should match Applied jobs.
* Interview count should match Interview jobs.
* Rejected count should match Rejected jobs.
* Offer count should match Offer jobs.
* Counts should update after adding a job.
* Counts should update after editing a job status.
* Counts should update after deleting a job.
* Counts should match API response data.

### QA Tasks

* Count jobs manually by status.
* Open Reports and compare counts.
* Add a new job and check Reports again.
* Edit a job status and check Reports again.
* Delete a job and check Reports again.
* Inspect the `/api/reports` response in Network.

### Deliverables

* 10–12 reports test cases.
* Bug report if any count is wrong.
* Screenshot comparing Job Tracker data to Reports data.
* Network evidence from `/api/reports`.

---

## DAY-16: Mobile Layout Testing

### Feature Area

Responsive Layout

### User Story

As a mobile user, I want the job board to fit my screen without horizontal scrolling.

### Requirement

The app should work on common mobile screen widths.

### Acceptance Criteria

* App should fit at 375px width.
* App should fit at 390px width.
* App should not require horizontal scrolling.
* Buttons should remain visible.
* Form fields should fit the screen.
* Job cards should fit the screen.
* Text should wrap cleanly.
* Search/filter/sort controls should remain usable.

### QA Tasks

* Open Chrome DevTools.
* Enable device toolbar.
* Test iPhone-size widths.
* Test Android-size widths.
* Try adding, editing, searching, filtering, and deleting jobs on mobile width.
* Check for horizontal scrolling.

### Deliverables

* 8–10 mobile layout test cases.
* Screenshots of broken layouts.
* Bug report if horizontal scrolling appears.

---

## DAY-17: Accessibility Smoke Testing

### Feature Area

Accessibility

### User Story

As a keyboard or screen-reader user, I want the app to be understandable and usable.

### Requirement

Basic accessibility issues should be identified and reported.

### Acceptance Criteria

* Buttons should have understandable accessible names.
* Images should have alt text when meaningful.
* Text should have readable contrast.
* Form fields should have labels.
* Keyboard navigation should be possible.
* Lighthouse Accessibility audit should not show obvious critical issues.

### QA Tasks

* Run Lighthouse Accessibility audit.
* Inspect buttons in Elements tab.
* Check whether images have alt text.
* Try using Tab to move through the page.
* Check whether form fields have labels.
* Record accessibility findings clearly.

### Deliverables

* 6–10 accessibility test cases.
* Lighthouse screenshot.
* Bug reports for missing labels, missing alt text, or contrast issues.

---

## DAY-18: API Testing — Jobs Endpoints

### Feature Area

API Testing

### User Story

As a QA tester, I want to test job APIs directly so I can verify behavior without relying only on the UI.

### Requirement

The jobs API should correctly support creating, reading, updating, and deleting jobs.

### Acceptance Criteria

* GET `/api/jobs` should return all jobs.
* POST `/api/jobs` should create a valid job.
* POST `/api/jobs` should reject invalid jobs.
* PUT `/api/jobs/:id` should update the selected job.
* DELETE `/api/jobs/:id` should delete the selected job.
* Creating a job should return the correct HTTP status.
* Error responses should include useful messages.

### QA Tasks

* Use Postman or DevTools Network.
* Test GET jobs.
* Test POST valid job.
* Test POST invalid job.
* Test PUT job.
* Test DELETE job.
* Test non-existing job ID.
* Record status codes and response bodies.

### Deliverables

* 10–15 API test cases.
* Postman collection or screenshots.
* Bug reports for wrong status codes, wrong validation, or wrong deleted records.

---

## DAY-19: Reset Demo Data Testing

### Feature Area

Reset Demo Data

### User Story

As a tester, I want to reset demo data so each test session can start from a known state.

### Requirement

Reset Demo Data should restore the app to the original seed state.

### Acceptance Criteria

* Reset should restore original jobs.
* Reset should remove jobs added during testing.
* Reset should restore edited jobs.
* Reset should restore deleted jobs.
* Reset should not break login.
* Reset should show a clear success message.
* Reset should update visible UI data correctly.

### QA Tasks

* Add a new job.
* Edit an existing job.
* Delete a job.
* Click Reset Demo Data.
* Confirm original data is restored.
* Check whether the page needs refresh to show correct data.
* Inspect the reset API request.

### Deliverables

* 6–10 reset test cases.
* Bug report if reset does not restore data correctly.
* Before/after screenshots.

---

## DAY-20: End-to-End Regression Test

### Feature Area

Full App Regression

### User Story

As a QA tester, I want to verify the main app flows still work after fixes.

### Requirement

The main app workflows should work together without breaking existing behavior.

### Acceptance Criteria

* User can log in.
* User can add a job.
* User can search jobs.
* User can filter jobs.
* User can sort jobs.
* User can edit a job.
* User can delete a job.
* User can export jobs.
* User can update profile.
* Reports show accurate counts.
* App works on mobile width.
* No unexpected Console errors appear during the main flow.

### QA Tasks

* Create a regression checklist.
* Execute the checklist.
* Mark each item Pass, Fail, or Blocked.
* Log any bugs found.
* Retest any fixed bugs.
* Write a final test summary.

### Deliverables

* Regression checklist.
* Test execution report.
* Bug reports.
* Retest notes.
* Final QA summary.

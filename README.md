# Demoblaze QA Automation Project

End-to-end test automation project for `https://demoblaze.com/` built with Playwright.

The goal of this project is to present a small but realistic QA portfolio example:
- user stories
- manual test cases
- automated smoke, regression, and negative scenarios
- reusable test data in JSON

## Project Scope

This project covers the main Demoblaze flows:
- product browsing
- category filtering
- product detail
- add to cart
- cart management
- checkout
- authentication modals
- selected negative scenarios

## Tech Stack

- Playwright
- JavaScript
- Node.js

## Project Structure

```text
docs/
  user-stories.md
  test-cases.md

features/
  testData.json

tests/
  smoke/
  regression/
  negative/

.github/workflows/
  playwright.yml
```

## Documentation

Project documentation is stored here:
- `docs/user-stories.md`
- `docs/test-cases.md`

Shared test data is stored here:
- `features/testData.json`

## Automated Test Suites

### Smoke
- `TC-SM-01` Home page categories and products list
- `TC-SM-02` Filter by laptops
- `TC-SM-03` Open product detail
- `TC-SM-04` Add product to cart
- `TC-SM-05` Place order with valid data

### Regression
- `TC-RG-01` Add two different products to cart
- `TC-RG-02` Delete one item and verify total update
- `TC-RG-03` Cart state after browser refresh
- `TC-RG-04` Category switching updates grid
- `TC-RG-05` Open and close account modals

### Negative
- `TC-NG-01` Checkout with empty Name
- `TC-NG-02` Checkout with empty Card
- `TC-NG-03` Login with invalid credentials
- `TC-NG-04` Sign up with already existing username
- `TC-NG-05` Repeated Add to cart clicks

## Setup

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install chromium
```

## Running Tests

Run the full suite:

```bash
npx playwright test
```

By default, the suite runs only on Chromium because the Playwright config contains a single browser project.

Run the suite explicitly on Chromium:

```bash
npx playwright test --project=chromium
```

Run a specific suite:

```bash
npx playwright test tests/smoke --project=chromium
npx playwright test tests/regression --project=chromium
npx playwright test tests/negative --project=chromium
```

Run a specific file:

```bash
npx playwright test tests/smoke/browse.smoke.spec.js --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

## Browser Strategy

This project runs on `Chromium` only.

Reason:
- Demoblaze is a public demo application and some scenarios are not stable across all browsers
- the main goal of this project is stable functional coverage, not full cross-browser certification
- the Playwright config is intentionally limited to a single browser project for more predictable local and CI runs

## Notes About Demoblaze

This application uses several native browser dialogs such as:
- add to cart alerts
- login and sign-up validation alerts
- checkout validation alerts

Because of that, multiple tests use Playwright dialog handling instead of DOM-based message assertions.

## CI

GitHub Actions workflow is available in:
- `.github/workflows/playwright.yml`

## Current Status

Current repository state:
- documentation is prepared
- test data is centralized in JSON
- smoke and regression suites are implemented
- negative suite is included, with some scenarios requiring stabilization because of demo-site behavior

## Possible Next Steps

- refactor repeated flows into Page Object Model
- add bug reports document
- add npm scripts for common Playwright commands
- stabilize remaining flaky scenarios

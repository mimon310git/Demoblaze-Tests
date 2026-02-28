# Demoblaze QA Automation Project

QA portfolio project for `https://demoblaze.com/` built with Playwright and JavaScript.

The project combines manual QA documentation with automated UI coverage for the main Demoblaze flows. The goal is to show a practical testing workflow: define scope, write scenarios, automate core paths, and keep test data centralized.

## What Is Included

- user stories for main store flows
- manual test cases in table format
- automated smoke tests
- automated regression tests
- selected negative scenarios
- shared test data in JSON
- GitHub Actions workflow for Playwright

## Application Scope

Covered business areas:
- product browsing
- category filtering
- product detail
- add to cart
- cart management
- checkout
- authentication modals
- selected validation and negative flows

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

Manual QA artifacts:
- `docs/user-stories.md`
- `docs/test-cases.md`

Shared test data:
- `features/testData.json`

## Automated Coverage

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

Install Playwright browser:

```bash
npx playwright install chromium
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run only smoke tests:

```bash
npx playwright test tests/smoke
```

Run only regression tests:

```bash
npx playwright test tests/regression
```

Run only negative tests:

```bash
npx playwright test tests/negative
```

Run a specific file:

```bash
npx playwright test tests/smoke/browse.smoke.spec.js
```

Open the HTML report:

```bash
npx playwright show-report
```

## Browser Strategy

This project is configured to run on `Chromium` only.

Reason:
- Demoblaze is a public demo application and some flows are unstable across browsers
- the goal of this project is stable functional coverage, not cross-browser certification
- keeping one browser in config makes local runs and CI results more predictable

## Notes About Demoblaze

Demoblaze uses native browser dialogs for several actions, for example:
- add to cart
- login and sign-up validation
- checkout validation

Because of that, multiple tests use Playwright dialog handling instead of DOM-based message assertions.

## CI

GitHub Actions workflow:
- `.github/workflows/playwright.yml`

The workflow installs dependencies, installs Playwright browser binaries, and runs the Playwright suite.

## Current State

Current repository status:
- manual documentation is prepared
- test data is centralized in JSON
- smoke and regression suites are implemented
- negative coverage is included and can be extended further if needed

## Next Improvements

Possible next steps for this project:
- refactor repeated flows into Page Object Model
- add dedicated bug reports document
- add `npm` scripts for common Playwright commands
- improve flaky scenario handling on demo-site edge cases

![CI](https://github.com/mimon310git/Demoblaze-Tests/actions/workflows/playwright.yml/badge.svg)

# Demoblaze QA Automation Project

QA portfolio project for `https://demoblaze.com/` built with Playwright and JavaScript.

The project combines manual QA documentation with automated UI coverage for the main Demoblaze flows. The goal is to show a practical testing workflow: define scope, write scenarios, automate core paths, and keep test data centralized.

## What Is Included

- user stories for main store flows
- manual test cases in table format
- automated smoke tests
- automated regression tests
- selected negative scenarios
- additive Page Object Model examples
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
  negative/
  pages/
  pom/
  regression/
  smoke/

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

### POM Examples
- `TC-POM-01` Home page categories and grid
- `TC-POM-02` Open product detail
- `TC-POM-03` Add product to cart dialog
- `TC-POM-04` Open and close account modals
- `TC-POM-05` Open place order modal

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
npm test
```

Run only smoke tests:

```bash
npm run test:smoke
```

Run only regression tests:

```bash
npm run test:regression
```

Run only negative tests:

```bash
npm run test:negative
```

Run only POM tests:

```bash
npm run test:pom
```

Run a specific file:

```bash
npx playwright test tests/smoke/browse.smoke.spec.js
```

Open the HTML report:

```bash
npm run report
```

## POM Structure

The project keeps the original smoke, regression, and negative suites unchanged.

Additive POM coverage lives in:
- `tests/pages/` for reusable page objects
- `tests/pom/` for example tests that use those page objects

This keeps the original suites readable while also showing a Page Object Model implementation.

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
- additive Page Object Model examples are included in `tests/pages/` and `tests/pom/`
- npm scripts are available for the main suites and POM examples

## Next Improvements

Possible next steps for this project:
- add dedicated bug reports document
- improve flaky scenario handling on demo-site edge cases
- expand POM coverage if needed without replacing the original suites
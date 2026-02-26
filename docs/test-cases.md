# Demoblaze Test Cases

## Shared Test Data
- Product A: `Sony vaio i5`
- Product B: `Nokia lumia 1520`
- Valid order: Name `John QA`, Country `USA`, City `Boston`, Card `4111111111111111`, Month `12`, Year `2028`
- Invalid login: Username `invalid_user`, Password `invalid_pass`

## Smoke

### TC-SM-01 Home page loads categories and products
- Related US: `US-01`
- Priority: `High`

**Preconditions**
- Clean browser session.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open home page | URL: `https://demoblaze.com/` | Home page is displayed. |
| 2 | Check category menu | Categories: `Phones`, `Laptops`, `Monitors` | All three categories are visible. |
| 3 | Check product cards | N/A | Product cards show name, price, and image. |

### TC-SM-02 Filter by laptops
- Related US: `US-02`
- Priority: `High`

**Preconditions**
- Home page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Click `Laptops` category | Category: `Laptops` | Product grid refresh is triggered. |
| 2 | Validate visible products | Expected samples: `Sony vaio i5`, `MacBook air` | Laptop products are displayed. |
| 3 | Validate excluded products | Non-laptop sample: `Nokia lumia 1520` | Non-laptop products are not shown. |

### TC-SM-03 Open product detail
- Related US: `US-03`
- Priority: `High`

**Preconditions**
- Home page or laptops list page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open product detail | Product: `Sony vaio i5` | Product detail page opens. |
| 2 | Verify detail content | N/A | Name, price, description, image are visible. |
| 3 | Verify action button | N/A | `Add to cart` button is visible and enabled. |

### TC-SM-04 Add product to cart
- Related US: `US-04`
- Priority: `High`

**Preconditions**
- Product detail page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Click `Add to cart` | Product: `Sony vaio i5` | Confirmation alert appears. |
| 2 | Accept alert | Alert text from app | Action is accepted without error. |
| 3 | Open cart page | Navigation: `Cart` | Added product appears in cart table. |

### TC-SM-05 Place order with valid data
- Related US: `US-06`
- Priority: `High`

**Preconditions**
- At least one item is in cart.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open `Cart` and click `Place Order` | N/A | Order modal opens. |
| 2 | Fill checkout form | Name `John QA`, Country `USA`, City `Boston`, Card `4111111111111111`, Month `12`, Year `2028` | All fields accept input. |
| 3 | Click `Purchase` | N/A | Success confirmation popup is shown with order details. |

## Regression

### TC-RG-01 Add two different products to cart
- Related US: `US-04`, `US-05`
- Priority: `High`

**Preconditions**
- Clean browser session.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Add first product to cart | Product A: `Sony vaio i5` | First product is added successfully. |
| 2 | Return to home page and add second product | Product B: `Nokia lumia 1520` | Second product is added successfully. |
| 3 | Open cart | N/A | Both products are visible with correct names and prices. |

### TC-RG-02 Delete one item and verify total update
- Related US: `US-05`
- Priority: `High`

**Preconditions**
- Cart contains at least two products.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Capture initial total | Current cart total value | Initial total is visible. |
| 2 | Delete one item | Any one cart item | Selected item is removed from cart. |
| 3 | Re-check total | Updated cart total value | Total is recalculated based on remaining items. |

### TC-RG-03 Cart state after browser refresh
- Related US: `US-05`
- Priority: `Medium`

**Preconditions**
- Cart contains at least one item.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open cart page | N/A | Cart page loads correctly. |
| 2 | Refresh page | Keyboard `F5` or browser refresh | Page reloads without error. |
| 3 | Verify cart content | Existing cart item | Item remains visible after refresh. |

### TC-RG-04 Category switching updates grid
- Related US: `US-01`, `US-02`
- Priority: `Medium`

**Preconditions**
- Home page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Click `Phones` | Category: `Phones` | Grid updates to phone products. |
| 2 | Click `Monitors` | Category: `Monitors` | Grid updates to monitor products. |
| 3 | Click `Laptops` | Category: `Laptops` | Grid updates to laptop products. |

### TC-RG-05 Open and close account modals
- Related US: `US-07`, `US-08`
- Priority: `Medium`

**Preconditions**
- Home page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open `Sign up` modal | N/A | Sign up modal appears. |
| 2 | Close `Sign up` modal | Close button (`X`) | Modal closes correctly. |
| 3 | Open `Log in` modal | N/A | Log in modal appears. |
| 4 | Close `Log in` modal | Close button (`X`) | Modal closes correctly. |

## Negative

### TC-NG-01 Checkout with empty Name
- Related US: `US-06`
- Priority: `High`

**Preconditions**
- At least one item in cart and order modal is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Leave `Name` field empty | Name: empty | Empty input is kept for validation. |
| 2 | Fill remaining fields | Card `4111111111111111`, other fields valid | Remaining fields are accepted. |
| 3 | Click `Purchase` | N/A | Order should be blocked with validation feedback and no success popup. |

### TC-NG-02 Checkout with empty Card
- Related US: `US-06`
- Priority: `High`

**Preconditions**
- At least one item in cart and order modal is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Fill all fields except `Card` | Card: empty | Empty card field is kept for validation. |
| 2 | Click `Purchase` | N/A | Order should be blocked with validation feedback and no success popup. |

### TC-NG-03 Login with invalid credentials
- Related US: `US-08`
- Priority: `High`

**Preconditions**
- Home page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open `Log in` modal | N/A | Log in modal appears. |
| 2 | Enter invalid credentials | Username `invalid_user`, Password `invalid_pass` | Credentials are entered. |
| 3 | Submit login | N/A | Login is rejected and error message/alert is shown. |

### TC-NG-04 Sign up with already existing username
- Related US: `US-07`
- Priority: `Medium`

**Preconditions**
- Existing username is known.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Open `Sign up` modal | N/A | Sign up modal appears. |
| 2 | Enter existing username and password | Username: existing value, Password: `Test1234` | Values are entered. |
| 3 | Submit registration | N/A | Registration is rejected and error message/alert is shown. |

### TC-NG-05 Repeated Add to cart clicks
- Related US: `US-04`, `US-05`
- Priority: `Medium`

**Preconditions**
- Product detail page is open.

| # | Test Step | Test Data | Expected Result |
| --- | --- | --- | --- |
| 1 | Click `Add to cart` twice quickly | Product: `Sony vaio i5` | App remains stable and no crash occurs. |
| 2 | Open cart page | Navigation: `Cart` | Cart state is consistent with accepted add operations. |

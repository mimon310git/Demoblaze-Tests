# Demoblaze Test Scenarios

## Scope
Manual test scenarios for core Demoblaze e-commerce flows:
- product browsing
- product detail
- cart management
- checkout
- account modals

## Test Data
- Product A: `Sony vaio i5`
- Product B: `Nokia lumia 1520`
- Valid order data: Name `John QA`, Country `USA`, City `Boston`, Card `4111111111111111`, Month `12`, Year `2028`
- Invalid login data: Username `invalid_user`, Password `invalid_pass`

## Smoke

### TC-SM-01 Home page loads categories and products
- Type: Smoke
- Priority: High
- Related User Story: US-01
- Preconditions: User is on a clean session.
- Steps:
1. Open `https://demoblaze.com/`.
2. Observe the category list and product grid.
- Expected Result:
1. Categories `Phones`, `Laptops`, and `Monitors` are visible.
2. Product cards are visible with name, price, and image.

### TC-SM-02 Filter by laptops
- Type: Smoke
- Priority: High
- Related User Story: US-02
- Preconditions: Home page is open.
- Steps:
1. Click category `Laptops`.
2. Wait for product list refresh.
- Expected Result:
1. Laptop products are displayed (for example `Sony vaio i5`, `MacBook air`).
2. Non-laptop products are not displayed in the refreshed list.

### TC-SM-03 Open product detail
- Type: Smoke
- Priority: High
- Related User Story: US-03
- Preconditions: User is on home page or laptop category page.
- Steps:
1. Click product `Sony vaio i5`.
2. Verify product detail content.
- Expected Result:
1. Detail page opens for selected product.
2. Product name, price, description, image, and `Add to cart` button are visible.

### TC-SM-04 Add product to cart
- Type: Smoke
- Priority: High
- Related User Story: US-04
- Preconditions: Product detail page is open.
- Steps:
1. Click `Add to cart`.
2. Accept confirmation alert.
3. Open `Cart`.
- Expected Result:
1. Confirmation alert appears after add action.
2. Selected product is visible in the cart table.

### TC-SM-05 Place order with valid data
- Type: Smoke
- Priority: High
- Related User Story: US-06
- Preconditions: At least one product is already in cart.
- Steps:
1. Open `Cart`.
2. Click `Place Order`.
3. Fill all order fields with valid data.
4. Click `Purchase`.
- Expected Result:
1. Order confirmation popup is displayed.
2. Popup includes success message and order details.

## Regression

### TC-RG-01 Add two different products to cart
- Type: Regression
- Priority: High
- Related User Story: US-04, US-05
- Preconditions: Clean session.
- Steps:
1. Add `Sony vaio i5` to cart.
2. Return to home page.
3. Add `Nokia lumia 1520` to cart.
4. Open `Cart`.
- Expected Result:
1. Both products are present in cart.
2. Each row shows correct product name and price.

### TC-RG-02 Delete one item and verify total update
- Type: Regression
- Priority: High
- Related User Story: US-05
- Preconditions: Cart has at least two products.
- Steps:
1. Capture initial cart total.
2. Delete one product row.
3. Wait for cart table refresh.
- Expected Result:
1. Deleted product is removed from cart.
2. Cart total is updated and matches remaining items.

### TC-RG-03 Cart state after browser refresh
- Type: Regression
- Priority: Medium
- Related User Story: US-05
- Preconditions: Cart contains at least one item.
- Steps:
1. Open `Cart`.
2. Refresh the page.
- Expected Result:
1. Cart page loads successfully after refresh.
2. Existing cart items remain visible.

### TC-RG-04 Category switching updates grid
- Type: Regression
- Priority: Medium
- Related User Story: US-01, US-02
- Preconditions: Home page is open.
- Steps:
1. Click `Phones`.
2. Click `Monitors`.
3. Click `Laptops`.
- Expected Result:
1. Product grid updates after each category click.
2. Final grid content corresponds to laptops.

### TC-RG-05 Open and close account modals
- Type: Regression
- Priority: Medium
- Related User Story: US-07, US-08
- Preconditions: Home page is open.
- Steps:
1. Click `Sign up`.
2. Verify modal content and close modal.
3. Click `Log in`.
4. Verify modal content and close modal.
- Expected Result:
1. Both modals open correctly.
2. Both modals can be closed without UI issues.

## Negative

### TC-NG-01 Checkout with empty Name
- Type: Negative
- Priority: High
- Related User Story: US-06
- Preconditions: At least one item in cart, order modal open.
- Steps:
1. Keep `Name` field empty.
2. Fill other fields.
3. Click `Purchase`.
- Expected Result:
1. Order is blocked with validation feedback.
2. No success confirmation should be shown.

### TC-NG-02 Checkout with empty Card
- Type: Negative
- Priority: High
- Related User Story: US-06
- Preconditions: At least one item in cart, order modal open.
- Steps:
1. Fill all fields except `Card`.
2. Click `Purchase`.
- Expected Result:
1. Order is blocked with validation feedback.
2. No success confirmation should be shown.

### TC-NG-03 Login with invalid credentials
- Type: Negative
- Priority: High
- Related User Story: US-08
- Preconditions: Home page is open.
- Steps:
1. Open `Log in` modal.
2. Enter invalid username and password.
3. Submit login.
- Expected Result:
1. Login is rejected.
2. Error alert or message is displayed.

### TC-NG-04 Sign up with already existing username
- Type: Negative
- Priority: Medium
- Related User Story: US-07
- Preconditions: Existing username is known.
- Steps:
1. Open `Sign up` modal.
2. Enter existing username and any password.
3. Submit sign-up request.
- Expected Result:
1. Registration is rejected.
2. Error alert or message is displayed.

### TC-NG-05 Repeated Add to cart clicks
- Type: Negative
- Priority: Medium
- Related User Story: US-04, US-05
- Preconditions: Product detail page is open.
- Steps:
1. Click `Add to cart` two times quickly.
2. Open `Cart`.
- Expected Result:
1. Application stays stable (no crash, no broken page state).
2. Cart reflects accepted add operations consistently.

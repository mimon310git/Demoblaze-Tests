# Demoblaze Test Cases (Table Format)

## Shared Test Data
- Product A: `Sony vaio i5`
- Product B: `Nokia lumia 1520`
- Valid order: Name `John QA`, Country `USA`, City `Boston`, Card `4111111111111111`, Month `12`, Year `2028`
- Invalid login: Username `invalid_user`, Password `invalid_pass`

## Smoke

| TC ID | Related US | Priority | Preconditions | Test Steps | Test Data | Expected Result |
| --- | --- | --- | --- | --- | --- | --- |
| TC-SM-01 | US-01 | High | Clean browser session. | 1. Open `https://demoblaze.com/`.<br>2. Check categories and product cards. | N/A | `Phones`, `Laptops`, `Monitors` are visible.<br>Product cards show name, price, image. |
| TC-SM-02 | US-02 | High | Home page is open. | 1. Click `Laptops` category.<br>2. Wait for product grid refresh. | Category: `Laptops` | Laptop list is displayed (for example `Sony vaio i5`, `MacBook air`).<br>Non-laptop items are not visible. |
| TC-SM-03 | US-03 | High | Home page or laptop list page is open. | 1. Click `Sony vaio i5`.<br>2. Check product detail page content. | Product: `Sony vaio i5` | Product detail page opens with name, price, description, image, and `Add to cart` button. |
| TC-SM-04 | US-04 | High | Product detail page is open. | 1. Click `Add to cart`.<br>2. Accept alert.<br>3. Open `Cart`. | Product: `Sony vaio i5` | Confirmation alert appears.<br>Selected product exists in cart table. |
| TC-SM-05 | US-06 | High | At least one item in cart. | 1. Open `Cart`.<br>2. Click `Place Order`.<br>3. Fill form and click `Purchase`. | Name: `John QA`<br>Country: `USA`<br>City: `Boston`<br>Card: `4111111111111111`<br>Month: `12`<br>Year: `2028` | Success confirmation popup appears with order details. |

## Regression

| TC ID | Related US | Priority | Preconditions | Test Steps | Test Data | Expected Result |
| --- | --- | --- | --- | --- | --- | --- |
| TC-RG-01 | US-04, US-05 | High | Clean browser session. | 1. Add `Sony vaio i5` to cart.<br>2. Return to home page.<br>3. Add `Nokia lumia 1520`.<br>4. Open `Cart`. | Product A: `Sony vaio i5`<br>Product B: `Nokia lumia 1520` | Both products are present in cart with correct names and prices. |
| TC-RG-02 | US-05 | High | Cart contains at least two products. | 1. Capture initial total.<br>2. Delete one cart row.<br>3. Wait for refresh. | Product to delete: one of cart items | Deleted item is removed.<br>Total is recalculated to match remaining items. |
| TC-RG-03 | US-05 | Medium | Cart contains at least one item. | 1. Open `Cart`.<br>2. Refresh page (`F5`). | Existing cart item | Cart loads after refresh and previously added item remains visible. |
| TC-RG-04 | US-01, US-02 | Medium | Home page is open. | 1. Click `Phones`.<br>2. Click `Monitors`.<br>3. Click `Laptops`. | Categories: `Phones`, `Monitors`, `Laptops` | Product grid updates after each click and final state shows laptop products. |
| TC-RG-05 | US-07, US-08 | Medium | Home page is open. | 1. Open `Sign up` modal and close it.<br>2. Open `Log in` modal and close it. | N/A | Both modals open and close correctly without UI issues. |

## Negative

| TC ID | Related US | Priority | Preconditions | Test Steps | Test Data | Expected Result |
| --- | --- | --- | --- | --- | --- | --- |
| TC-NG-01 | US-06 | High | At least one item in cart and order modal open. | 1. Leave `Name` empty.<br>2. Fill remaining fields.<br>3. Click `Purchase`. | Name: empty<br>Card: `4111111111111111`<br>Other fields valid | Order should be blocked with validation feedback.<br>No success confirmation should appear. |
| TC-NG-02 | US-06 | High | At least one item in cart and order modal open. | 1. Fill all fields except `Card`.<br>2. Click `Purchase`. | Card: empty<br>Other fields valid | Order should be blocked with validation feedback.<br>No success confirmation should appear. |
| TC-NG-03 | US-08 | High | Home page is open. | 1. Open `Log in` modal.<br>2. Enter invalid credentials.<br>3. Submit login. | Username: `invalid_user`<br>Password: `invalid_pass` | Login is rejected and error message/alert is shown. |
| TC-NG-04 | US-07 | Medium | Existing username is known. | 1. Open `Sign up` modal.<br>2. Enter existing username.<br>3. Submit sign-up. | Username: existing value<br>Password: `Test1234` | Registration is rejected and error message/alert is shown. |
| TC-NG-05 | US-04, US-05 | Medium | Product detail page is open. | 1. Double-click or quickly click `Add to cart` twice.<br>2. Open `Cart`. | Product: `Sony vaio i5` | App remains stable.<br>Cart state is consistent with accepted add operations. |

# Demoblaze User Stories

## US-01 Browse products
As a guest, I want to see product categories and product cards so that I can quickly browse what the store offers.

### Acceptance Criteria
1. The categories `Phones`, `Laptops`, and `Monitors` are visible on the home page.
2. Product cards are visible in the product grid.
3. Each product card shows product name, price, and image.

## US-02 Filter laptops
As a guest, I want to filter products by `Laptops` so that I can see laptop brands and models only.

### Acceptance Criteria
1. After clicking `Laptops`, only laptop products are displayed.
2. The list contains laptop names (for example `Sony vaio i5`, `Sony vaio i7`, `MacBook air`, `Dell i7 8gb`).
3. No phone-only products are shown in the laptop list.

## US-03 View product detail
As a guest, I want to open a product detail page so that I can decide if the product matches my needs.

### Acceptance Criteria
1. Clicking a product card opens its detail page.
2. The detail page shows name, price, description, and image.
3. The page has an `Add to cart` action.

## US-04 Add product to cart
As a guest, I want to add a product to the cart so that I can buy it later in checkout.

### Acceptance Criteria
1. Clicking `Add to cart` triggers a confirmation alert.
2. The alert confirms the product was added successfully.
3. The added product appears in the cart page.

## US-05 Manage cart
As a guest, I want to review and remove cart items so that I can keep only products I want to buy.

### Acceptance Criteria
1. The cart displays added product names and prices.
2. Clicking `Delete` removes the selected item.
3. Cart total updates after item deletion.

## US-06 Place order
As a guest, I want to place an order from the cart so that I can complete my purchase.

### Acceptance Criteria
1. Clicking `Place Order` opens the checkout modal.
2. User can fill required checkout fields and submit.
3. Success confirmation is displayed after a valid order.

## US-07 Sign up
As a guest, I want to create an account so that I can log in as a registered user.

### Acceptance Criteria
1. `Sign up` modal opens from the top navigation.
2. User can enter username and password and submit registration.
3. The system returns a clear success or error message.

## US-08 Log in
As a registered user, I want to log in so that I can access my account session.

### Acceptance Criteria
1. `Log in` modal opens from the top navigation.
2. User can submit valid credentials.
3. Logged-in state is visible in navigation (for example welcome text or account actions).

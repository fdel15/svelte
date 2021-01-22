const baseUrl = 'http://localhost:5000/';

export function login() {
    cy.visit(baseUrl);
    cy.contains('Username')
        .children('input')
        .type('username');
    cy.contains('Password')
        .children('input')
        .type('password');
    cy.get('button')
        .contains('Login')
        .click();
}

export function addCategories() {
    login();
    cy.get('[data-testid=category-name-input]')
        .as('nameInput')
        .type('Clothes');
    cy.get('button')
        .contains('Add Category')
        .click();
    cy.get('@nameInput').type('Toiletries{enter}'); // {enter} simulates pressing the enter key
}

export function addItems() {
    addCategories();
    cy.get('[data-testid=item-input]')
        .first()
        .as('item-input-1')
        .type('socks');
    cy.get('button')
        .contains('Add Item')
        .first()
        .click();
    cy.get('@item-input-1').type('shoes{enter}');
    verifyStatus('Clothes', '2 of 2 remaining');
    cy.get('[data-testid=item-input]')
        .last()
        .type('razor{enter}');
    verifyStatus('Toiletries', '1 of 1 remaining');
}

export function deleteCategory(categoryName) {
    cy.contains(new RegExp(`^${categoryName}$`))
        .siblings('button')
        .click();
}

export function deleteItem(itemName) {
    cy.contains(new RegExp(`^${itemName}$`))
        .siblings('button')
        .click();
}

export function togglePacked(itemName) {
    cy.contains(new RegExp(`^${itemName}$`))
        .siblings('input[type="checkbox"]')
        .click();
}

export function verifyStatus(categoryName, expectedStatus) {
    cy.contains(new RegExp(`^${categoryName}$`))
        // This is useful to verify that the correct element is found.
        // It draws a red outline around all the matching elements.
        .then(el => el.css('outline', 'solid red'))
        .siblings('span')
        .contains(expectedStatus);
}
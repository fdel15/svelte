import { login, addCategories, addItems, verifyStatus, togglePacked, deleteItem, deleteCategory } from '../helpers/ChecklistHelpers'

describe('Travel Packing app', () => {
    it('should login', login);
    it('should add categories', addCategories);
    it('should add items', addItems);

    it('should toggle packed', () => {
        addItems();
        verifyStatus('Clothes', '2 of 2 remaining');
        togglePacked('shoes');
        verifyStatus('Clothes', '1 of 2 remaining');

        togglePacked('shoes');
        verifyStatus('Clothes', '2 of 2 remaining');
    });

    it('should delete item', () => {
        addItems();
        verifyStatus('Clothes', '2 of 2 remaining');
        deleteItem('shoes');
        verifyStatus('Clothes', '1 of 1 remaining');
    });

    it('should delete category', () => {
        addItems();
        verifyStatus('Toiletries', '1 of 1 remaining');
        deleteItem('razor');
        verifyStatus('Toiletries', '0 of 0 remaining');
        const categoryName = 'Toiletries';
        // Verify that the category exists.
        cy.get('.categories h2 > span').contains(categoryName);
        deleteCategory(categoryName);
        // Verify that the category no longer exists.
        cy.get('.categories h2 > span')
            .contains(categoryName)
            .should('not.exist');
    });

    it('should logout', () => {
        login();
        cy.get('button')
            .contains('Log Out')
            .click();
        cy.contains('Login');
    });
});
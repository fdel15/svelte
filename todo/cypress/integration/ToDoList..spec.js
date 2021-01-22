const baseUrl = 'http://localhost:5000/';

describe('Todo app', () => {
    it('should add todo', () => {
        cy.visit(baseUrl);
        cy.contains('1 of 2 remaining');
        cy.contains('Add')
            .as('addBtn') // saves a reference to the button for later use
            .should('be.disabled');
        const todoText = 'buy milk';
        cy.get('[data-testid=todo-input]')
            .as('todoInput')
            .type(todoText);
        const addBtn = cy.get('@addBtn');
        addBtn.should('not.be.disabled');
        addBtn.click();
        cy.get('@todoInput').should('have.value', '');
        cy.get('@addBtn').should('be.disabled');
        cy.contains(todoText);
        cy.contains('2 of 3 remaining');
    });

    it('should toggle done', () => {
        cy.visit(baseUrl);

        cy.contains('1 of 2 remaining');

        cy.get('input[type="checkbox"]')
            .first()
            .as('checkBox')
            .click();

        cy.contains('2 of 2 remaining');

        cy.get('@checkBox').check()

        cy.contains('1 of 2 remaining');

    });

    it('should delete todo', () => {
        cy.visit(baseUrl);
        cy.contains('1 of 2 remaining');

        const todoText = 'learn Svelte'; // first todo based on hard coded default values
        cy.contains('ul', todoText);

        cy.contains('Delete').click();
        cy.contains('ul', todoText).should('not.exist');
        cy.contains('1 of 1 remaining');
    });

    it('should archive completed', () => {
        cy.visit(baseUrl);
        cy.contains('1 of 2 remaining');

        cy.contains('Archive Completed')
            .as('archiveButton')

        const todoText = 'learn Svelte'; // first todo based on hard coded default values
        cy.contains('ul', todoText);

        const archiveButton = cy.get('@archiveButton');
        archiveButton.click();

        cy.contains('ul', todoText).should('not.exist');
        cy.contains('1 of 1 remaining');
    });
});
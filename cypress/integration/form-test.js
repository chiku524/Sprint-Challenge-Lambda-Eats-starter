describe('Testing our form inputs', function() {

    beforeEach(() => {
        cy.visit("localhost:3000/pizza")
    })


    it("add test to inputs and submit form", function () {
        cy.get('[data-cy="name"]')
        .type("Nico")
        .should('have.value', "Nico")

        cy.get('[data-cy="size"]').select('Medium')

       cy.get('[type="checkbox"]').check().should('be.checked')

       cy.get('[data-cy="special_instructions"]')
       .type("Use Mozarella")
       .should('have.value', "Use Mozarella")

       cy.get('[data-cy="submit"').click();


    });
}); 
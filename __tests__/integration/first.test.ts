describe('primeiro teste', () => {
  it('alooo', () => {
    cy.visit('/');

    cy.get('#emailLogin').type('matheus@gmail.com');
    cy.get('#passwordLogin').type('12345678');
    cy.contains('Login').click();

    cy.url().should('include', 'workspace');
  });
});

export default true;

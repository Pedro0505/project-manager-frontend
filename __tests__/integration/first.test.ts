describe('E2E tests', () => {
  before(() => {
    cy.visit('/');

    cy.fixture('login').then(({ matheus }) => {
      cy.get('#emailLogin').type(matheus.email);
      cy.get('#passwordLogin').type(matheus.password);

      cy.contains('Login').click();

      cy.saveLocalStorage();

      cy.contains(/store manager/i).click();
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Same column card DnD', () => {
    cy.dragAndDrop(/fazer req 2/i, /fazer req 3/i);
  });

  it('Card DnD between columns', () => {
    cy.dragAndDrop(/fazer req 1/i, /fazer req 6/i);
  });

  it('Columns DnD', () => {
    cy.dragAndDrop(/fazendo/i, /finalizado/i);
  });

  it('Create a new card', () => {
    cy.get('button')
      .contains('Adicionar card')
      .then((jQueryButtons) => {
        const firstButton = jQueryButtons.end()[0];

        cy.wrap(firstButton).click();

        cy.get('textarea').type('New Card');
        cy.get('button').contains('Confirmar').click();

        cy.get('li').contains('New Card').should('exist');
      });
  });
});

export default true;

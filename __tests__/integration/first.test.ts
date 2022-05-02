describe('E2E tests', () => {
  before(() => {
    cy.visit('/');

    cy.fixture('login').then(({ matheus }) => {
      cy.get('#emailLogin').type(matheus.email);
      cy.get('#passwordLogin').type(matheus.password);

      cy.intercept('GET', '/workspace').as('alias');

      cy.contains('Login')
        .click()
        .wait('@alias')
        .then(() => {
          cy.saveLocalStorage().then(() => {
            cy.contains(/store manager/i).click();
          });
        });
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage().then(() => {
      cy.getLocalStorage('@project-manager/token').then((token) => cy.log(token!));
    });
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
        cy.get('button')
          .contains('Confirmar')
          .click()
          .then(() => {
            cy.contains('New Card').should('exist');
          });
      });
  });

  it('Edit a card', () => {
    cy.contains(/new card/i)
      .parent()
      .getByTestId('edit-card-new-card')
      .should('be.hidden')
      .invoke('show')
      .should('be.visible')
      .click();

    cy.get('textarea').type('The ').type('{enter}');

    cy.contains(/the new card/i).should('exist');
  });

  it('Delete a card', () => {
    cy.contains(/the new card/i)
      .parent()
      .getByTestId('delete-card-the-new-card')
      .should('be.hidden')
      .invoke('show')
      .should('be.visible')
      .click()
      .click();

    cy.contains(/the new card/i).should('not.exist');
  });
});

export default true;

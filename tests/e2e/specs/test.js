// https://docs.cypress.io/api/introduction/api.html

describe('Home', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('a', 'Divisor');
  });
});

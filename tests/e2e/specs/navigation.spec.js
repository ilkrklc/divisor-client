describe('Navigation', () => {
  it('Should navigate into about page', () => {
    // visit home
    cy.visit('/');

    // navigate into about
    cy.get('a')
      .contains('About')
      .click();

    // try to find about page wrapper class
    cy.get('div.about');
  });

  it('Should navigate into homepage via navbar link', () => {
    // visit about
    cy.visit('/about');

    // navigate into home
    cy.get('a')
      .contains('Home')
      .click();

    // try to find home page wrapper class
    cy.get('div.home');
  });

  it('Should navigate into homepage via app name', () => {
    // visit about
    cy.visit('/about');

    // navigate into home
    cy.get('a')
      .contains('Divisor')
      .click();

    // try to find home page wrapper class
    cy.get('div.home');
  });
});

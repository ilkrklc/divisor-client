describe('Calculator tab change', () => {
  it('Should change into common divisors tab', () => {
    // visit home
    cy.visit('/');

    // click common divisors tab navigation item
    cy.get('button.calculator-tab-item:last-child').click();

    // try to find respective form
    cy.get('form#common-divisors-form');
  });

  it('Should change back into divisors tab', () => {
    // click divisors tab navigation item
    cy.get('button.calculator-tab-item:first-child').click();

    // try to find respective form
    cy.get('form#divisors-form');
  });
});

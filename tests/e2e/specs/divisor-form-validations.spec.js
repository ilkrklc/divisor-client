describe('Divisor form validations', () => {
  it('Should load form errorless', () => {
    // visit home
    cy.visit('/');

    // try to find form elements with error
    cy.get('form#divisors-form form-label.error').should('not.exist');
  });

  it('Should display error when non number input value typed', () => {
    // visit home
    cy.visit('/');

    // type non number input
    cy.get('input#number').type('non_number');

    // should display error
    cy.get('label.form-label.error[for="number"]').should('exist');
  });

  it('Should display error when number input empty', () => {
    // visit home
    cy.visit('/');

    const numberInput = cy.get('input#number');

    // type number input
    numberInput.type('123');

    // clear input
    numberInput.clear();

    // should display error
    cy.get('label.form-label.error[for="number"]').should('exist');
  });

  it('Should prevent value change when non numbers typed into number input', () => {
    // visit home
    cy.visit('/');

    const numberInput = cy.get('input#number');

    // type number input
    numberInput.type('123');

    // type non number input
    numberInput.type('abc');

    numberInput.should('have.value', '123');
  });

  it('Should prevent form submit when inputs untouched', () => {
    // visit home
    cy.visit('/');

    // submit form
    cy.get('#divisors-form button[type="submit"]').click();

    // try to find form elements with error
    cy.get('form#divisors-form .form-label.error').should('exist');
  });
});

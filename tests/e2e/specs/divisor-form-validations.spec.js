describe('Divisor form validations', () => {
  beforeEach(() => {
    // visit home
    cy.visit('/');
  });

  it('Should load form errorless', () => {
    // try to find form elements with error
    cy.get('form#divisors-form .form-label.error').should('not.exist');
  });

  it('Should display error when non number input value typed', () => {
    // type non number input
    cy.get('input#number').type('non_number');

    // should display error
    cy.get('label.form-label.error[for="number"]').should('exist');
  });

  it('Should display error when number input empty', () => {
    const numberInput = cy.get('input#number');

    // type number input
    numberInput.type('123');

    // clear input
    numberInput.clear();

    // should display error
    cy.get('label.form-label.error[for="number"]').should('exist');
  });

  it('Should prevent value change when non numbers typed into number input', () => {
    const numberInput = cy.get('input#number');

    // type number input
    numberInput.type('123');

    // type non number input
    numberInput.type('abc');

    numberInput.should('have.value', '123');
  });

  it('Should prevent form submit when inputs untouched', () => {
    // submit form
    cy.get('#divisors-form button[type="submit"]').click();

    // try to find form elements with error
    cy.get('form#divisors-form .form-label.error').should('exist');
  });
});

describe('Common divisor form validations', () => {
  beforeEach(() => {
    // visit home
    cy.visit('/');

    // navigate into common divisors tab
    cy.get('button.calculator-tab-item:last-child').click();
  });

  it('Should load form errorless', () => {
    // try to find form elements with error
    cy.get('form#common-divisors-form .form-label.error').should('not.exist');
  });

  it('Should display error when non number input value typed into number one', () => {
    // type non number input
    cy.get('input#number1').type('non_number');

    // should display error
    cy.get('label.form-label.error[for="number1"]').should('exist');
  });

  it('Should display error when non number input value typed into number two', () => {
    // type non number input
    cy.get('input#number2').type('non_number');

    // should display error
    cy.get('label.form-label.error[for="number2"]').should('exist');
  });

  it('Should display error when number one input empty', () => {
    const numberInput = cy.get('input#number1');

    // type number input
    numberInput.type('123');

    // clear input
    numberInput.clear();

    // should display error
    cy.get('label.form-label.error[for="number1"]').should('exist');
  });

  it('Should display error when number two input empty', () => {
    const numberInput = cy.get('input#number2');

    // type number input
    numberInput.type('123');

    // clear input
    numberInput.clear();

    // should display error
    cy.get('label.form-label.error[for="number2"]').should('exist');
  });

  it('Should prevent value change when non numbers typed into number input one', () => {
    const numberInput = cy.get('input#number1');

    // type number input
    numberInput.type('123');

    // type non number input
    numberInput.type('abc');

    numberInput.should('have.value', '123');
  });

  it('Should prevent value change when non numbers typed into number input two', () => {
    const numberInput = cy.get('input#number2');

    // type number input
    numberInput.type('123');

    // type non number input
    numberInput.type('abc');

    numberInput.should('have.value', '123');
  });

  it('Should prevent form submit when inputs untouched', () => {
    // submit form
    cy.get('#common-divisors-form button[type="submit"]').click();

    // try to find form elements with error
    cy.get('form#common-divisors-form .form-label.error').should('exist');
  });
});

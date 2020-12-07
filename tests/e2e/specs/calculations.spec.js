describe('Divisor calculations', () => {
  beforeEach(() => {
    // visit home
    cy.visit('/');
  });

  it('Should calculate divisors and add new recent item to list', () => {
    // type number input
    cy.get('input#number').type('123');

    // submit form
    cy.get('#divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item');
  });

  it('Should calculate sorted divisors and add new recent item to list', () => {
    // type number input
    cy.get('input#number').type('123');

    // select sort option
    cy.get('select#sort').select('asc');

    // submit form
    cy.get('#divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item .recent-item-badge').contains('Ascending');

    // type number input
    cy.get('input#number').type('123');

    // select sort option
    cy.get('select#sort').select('desc');

    // submit form
    cy.get('#divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item .recent-item-badge').contains('Descending');
  });

  it('Should calculate proper divisors and add new recent item to list', () => {
    // type number input
    cy.get('input#number').type('123');

    // select proper option
    cy.get('input#proper').check();

    // submit form
    cy.get('#divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item .recent-item-badge').contains('Proper');
  });
});

describe('Common divisor calculations', () => {
  beforeEach(() => {
    // visit home
    cy.visit('/');

    // navigate into common divisors tab
    cy.get('button.calculator-tab-item:last-child').click();
  });

  it('Should calculate divisors and add new recent item to list', () => {
    // type number input 1
    cy.get('input#number1').type('63');

    // type number input 2
    cy.get('input#number2').type('30');

    // submit form
    cy.get('#common-divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item');
  });

  it('Should calculate sorted divisors and add new recent item to list', () => {
    // type number input 1
    cy.get('input#number1').type('63');

    // type number input 2
    cy.get('input#number2').type('30');

    // select sort option
    cy.get('select#sort').select('asc');

    // submit form
    cy.get('#common-divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item .recent-item-badge').contains('Ascending');

    // type number input 1
    cy.get('input#number1').type('63');

    // type number input 2
    cy.get('input#number2').type('30');

    // select sort option
    cy.get('select#sort').select('desc');

    // submit form
    cy.get('#common-divisors-form button[type="submit"]').click();

    // try to find added recent item
    cy.get('.recent-item .recent-item-badge').contains('Descending');
  });
});

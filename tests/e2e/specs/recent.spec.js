function getItems(limit = 4) {
  const list = [];

  for (let i = 1; i <= limit; i++) {
    list.push({
      id: `'${i}'`,
      number1: 1,
      divisors: [1],
      count: 1,
      sum: 1,
      multiplication: 1,
      onlyProperDivisors: false,
      sort: undefined,
      createdOn: new Date().toLocaleString(),
    });
  }

  return list;
}

describe('Recent list', () => {
  it('Should display no recent calculation message when no previous calculation found', () => {
    // visit home
    cy.visit('/');

    // no results message should be displayed
    cy.get('.recent .no-results').should('exist');

    // recent item element should not be found
    cy.get('.recent-item').should('not.exist');
  });

  it('Should display recent items without pagination when items length is below threshold', () => {
    // get recent calculation items
    const items = getItems(4);

    // set items to local storage to mimic recent calculations
    localStorage.setItem('VUEX_RECENT_ITEMS', JSON.stringify(items));

    // visit home
    cy.visit('/');

    // no results message should not be displayed
    cy.get('.recent .no-results').should('not.exist');

    // recent item length should be equal to recent items length
    cy.get('.recent')
      .find('.recent-item')
      .should('have.length', items.length);
  });

  it('Should display recent items with pagination when items length is above threshold', () => {
    // get recent calculation items
    const items = getItems(8);

    // set items to local storage to mimic recent calculations
    localStorage.setItem('VUEX_RECENT_ITEMS', JSON.stringify(items));

    // visit home
    cy.visit('/');

    // no results message should not be displayed
    cy.get('.recent .no-results').should('not.exist');

    // recent item length should be at the threshold
    cy.get('.recent')
      .find('.recent-item')
      .should('have.length', 5);
  });

  it('Should display more items when scrolled into the bottom of the page', () => {
    // scroll to the bottom of the page
    cy.scrollTo(0, 2000);

    // recent item length should be at the threshold
    cy.get('.recent')
      .find('.recent-item')
      .should('have.length', 8);
  });

  it('Should remove item when remove item button clicked', () => {
    // get remove button and trigger click
    cy.get(
      '.recent .recent-item:nth-child(2) .recent-item-remove-button',
    ).click({ force: true });

    // recent item length should be minus one from previous test
    cy.get('.recent')
      .find('.recent-item')
      .should('have.length', 7);
  });

  it('Should make remove button visible when recent item hovered', () => {
    const item = cy.get('.recent .recent-item:nth-child(2)');

    item.trigger('mouseenter');

    cy.get(
      '.recent .recent-item:nth-child(2) .recent-item-remove-button',
    ).should('be.visible');
  });

  it('Should remove all recent items when clear items button clicked', () => {
    // get remove button and trigger click
    cy.get('button.recent-action.danger').click({ force: true });

    // recent item element should not be found
    cy.get('.recent-item').should('not.exist');
  });
});

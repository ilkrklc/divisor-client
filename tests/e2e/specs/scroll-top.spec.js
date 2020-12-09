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

describe('Scroll top', () => {
  it('Should display scroll top component when scrolled down', () => {
    // set items to local storage for extending page height
    localStorage.setItem('VUEX_RECENT_ITEMS', JSON.stringify(getItems(20)));

    // visit home
    cy.visit('/');

    // scroll down
    cy.scrollTo(0, 1000);

    // scroll top button should be displayed
    cy.get('button.scroll-top');

    // scroll top button should be visible
    cy.get('button.scroll-top').should('be.visible');
  });

  it('Should scroll to top when scroll top element clicked', () => {
    // click to scroll top button
    cy.get('button.scroll-top').click();

    // scroll position should be zero
    cy.window()
      .its('scrollY')
      .should($scrollY => {
        // expect($scrollY).to.have.value(0);
        expect($scrollY).to.be.closeTo(0, 0);
      });

    // button should not be found
    cy.get('button.scroll-top').should('not.exist');
  });
});

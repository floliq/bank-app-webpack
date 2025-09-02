describe('Currencies Page', () => {
  it('Показывает скелетон и данные о валютах и курсах валют', () => {
    cy.visit('/currencies');
    cy.get('.ssc').should('exist');
    cy.wait('@getCurrencies');
    cy.contains('Валютный обмен').should('be.visible');
  });

  it('Формируем обмен валют и обновляем информацию', () => {
    cy.visit('/currencies');
    cy.wait('@getCurrencies');

    cy.get('.exchange__select-from').click();
    cy.get('#exchange-from-opt-1').click();

    cy.get('.exchange__select-to').click();
    cy.get('#exchange-to-opt-2').click();

    cy.get('#exchange-amount').type('10.00');
    cy.contains('Обменять').click();

    cy.wait('@buyCurrency');
    cy.get('.profile-currencies__currency').first().should('contain', '120');
    cy.get('.profile-currencies__currency').eq(1).should('contain', '40');
  });
});

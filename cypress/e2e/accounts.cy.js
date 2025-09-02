describe('Страница кошельков', () => {
  it('Показывает скелетон и генерирует кошельки', () => {
    cy.visit('/accounts');
    cy.get('.ssc').should('exist');
    cy.wait('@getAccounts');
    cy.get('.accounts__content .accounts__account').should(
      'have.length.at.least',
      2
    );
    cy.contains('Ваши счета').should('be.visible');
  });

  it('Сортирует кошельки по номеру', () => {
    cy.visit('/accounts');
    cy.wait('@getAccounts');
    cy.get('.select-container').click();
    cy.get('#accounts-select-opt-1').click();
    cy.get('.accounts__content .accounts__account h3')
      .first()
      .should('contain', '0001');
  });

  it('Сортирует кошельки по балансу', () => {
    cy.visit('/accounts');
    cy.wait('@getAccounts');
    cy.get('.select-container').click();
    cy.get('#accounts-select-opt-2').click();
    cy.get('.accounts__content .accounts__account h3')
      .first()
      .should('contain', '0002');
  });

  it('Сортирует кошельки по последней транзакции', () => {
    cy.visit('/accounts');
    cy.wait('@getAccounts');
    cy.get('.select-container').click();
    cy.get('#accounts-select-opt-3').click();
    cy.get('.accounts__content .accounts__account h3')
      .first()
      .should('contain', '0001');
  });

  it('Создает новый кошелек', () => {
    cy.visit('/accounts');
    cy.wait('@getAccounts');
    cy.contains('Создать новый счет').click();
    cy.wait('@createAccount');
    cy.get('.accounts__content .accounts__account').should(
      'have.length.greaterThan',
      1
    );
  });
});

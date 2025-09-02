describe('Детальная страница кошелька', () => {
  it('Показывает скелетон и загружает информацию о кошельке', () => {
    cy.visit('/accounts/0001');
    cy.get('.ssc').should('exist');
    cy.wait('@getAccount0001');
    cy.contains('Просмотр счёта').should('be.visible');
    cy.contains('Баланс').should('be.visible');
  });

  it('Создает перевод и добавляет в историю операций', () => {
    cy.visit('/accounts/0001');
    cy.wait('@getAccount0001');

    cy.get('.select-container').click();
    cy.get('#transfer-form-account-opt-1').click();

    cy.get('#amount').type('100.00');
    cy.contains('Отправить').click();

    cy.wait('@transferFunds');
    cy.get('.transfer-history__table tbody tr').first().should('contain','- 100 ₽');
  });

  it('Возвращается назад в список кошельков', () => {
    cy.visit('/accounts/0001');
    cy.wait('@getAccount0001');
    cy.contains('Вернуться назад').click();
    cy.url().should('include', '/accounts');
  });


  it('Переход в историю переводов', () => {
    cy.visit('/accounts/0001');
    cy.wait('@getAccount0001');
    cy.get('.transfer-history__table tbody tr').first().click();
    cy.url().should('include', '/accounts/0001/history')
  })
}); 
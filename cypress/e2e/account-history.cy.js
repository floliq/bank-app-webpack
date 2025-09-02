describe('Страница истории кошелька', () => {
  it('Переходит в детальную страницу кошелька', () => {
    cy.visit('/accounts/0001/history');
    cy.wait('@getAccount0001');
    cy.contains('История переводов').should('be.visible');
    cy.get('.transfer-history__table tbody tr').should('exist');
  });

  it('Возвращается назад на страницу кошелька', () => {
    cy.visit('/accounts/0001/history');
    cy.wait('@getAccount0001');
    cy.contains('Вернуться назад').click();
    cy.url().should('include', '/accounts/0001');
  });
});

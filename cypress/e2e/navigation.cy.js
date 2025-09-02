describe('Навигация меню', () => {
  it('Переходит по ссылка и выходит из аккаунта', () => {
    cy.visit('/accounts');

    cy.contains('Банкоматы').click();
    cy.url().should('include', '/atms');

    cy.contains('Счета').click();
    cy.url().should('include', '/accounts');

    cy.contains('Валюта').click();
    cy.url().should('include', '/currencies');

    cy.contains('Выйти').click();
    cy.url().should('include', '/login');
  });
}); 
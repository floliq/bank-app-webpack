describe('Страница авторизации', () => {
  beforeEach(() => {
    window.localStorage.removeItem('token');
  });

  it('Перенаправляет на адрес /login когда не авторизован', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.contains('Вход в аккаунт').should('be.visible');
  });

  it('Успешная авторизация', () => {
    cy.visit('/login');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.contains('Войти').click();
    cy.url().should('include', '/accounts');
  });

  it('Безуспешная авторизация', () => {
    cy.visit('/login');
    cy.get('#login').type('developer');
    cy.get('#password').type('abcdedef');
    cy.contains('Войти').click();
    cy.contains('Неправильный пароль').should('be.visible');
  });
});

// Custom commands and global hooks

Cypress.Commands.add('login', () => {
  // Simulate login by setting token directly
  window.localStorage.setItem('token', 'test-token');
});

Cypress.Commands.add('stubApi', () => {
  cy.intercept('GET', /\/accounts$/, (req) => {
    if (req.headers && req.headers.accept && req.headers.accept.includes('text/html')) {
      req.continue();
      return;
    }
    req.reply({ fixture: 'accounts.json' });
  }).as('getAccounts');
  cy.intercept('GET', /\/account\/0001$/, (req) => {
    if (req.headers && req.headers.accept && req.headers.accept.includes('text/html')) {
      req.continue();
      return;
    }
    req.reply({ fixture: 'account_0001.json' });
  }).as('getAccount0001');
  cy.intercept('POST', /\/create-account$/, (req) => {
    req.reply({
      payload: {
        account: '0009',
        balance: 0,
        transactions: []
      }
    });
  }).as('createAccount');

  cy.intercept('POST', /\/transfer-funds$/, (req) => {
    req.reply({
      payload: {
        balance: 124500.5,
        transactions: [
          {"date": "2024-10-13T10:00:00.000Z","from": "0001","to": req.body.to,"amount": Number(req.body.amount) }
        ]
      }
    });
  }).as('transferFunds');

  cy.intercept('GET', /\/currencies$/, (req) => {
    if (req.headers && req.headers.accept && req.headers.accept.includes('text/html')) {
      req.continue();
      return;
    }
    req.reply({ fixture: 'currencies.json' });
  }).as('getCurrencies');
  cy.intercept('GET', /\/all-currencies$/, (req) => {
    if (req.headers && req.headers.accept && req.headers.accept.includes('text/html')) {
      req.continue();
      return;
    }
    req.reply({ fixture: 'all-currencies.json' });
  }).as('getAllCurrencies');
  cy.intercept('POST', /\/currency-buy$/, (req) => {
    req.reply({
      payload: {
        USD: { code: 'USD', amount: 120.00 },
        EUR: { code: 'EUR', amount: 40.00 },
        RUB: { code: 'RUB', amount: 9000.00 },
      }
    });
  }).as('buyCurrency');

  cy.intercept('GET', /\/banks$/, (req) => {
    if (req.headers && req.headers.accept && req.headers.accept.includes('text/html')) {
      req.continue();
      return;
    }
    req.reply({ fixture: 'banks.json' });
  }).as('getBanks');
});

// Overwrite select to avoid "covered by another element" due to Tom Select wrapping
Cypress.Commands.overwrite('select', (originalFn, subject, value, options = {}) => {
  const forcedOptions = { force: true, ...options };
  return originalFn(subject, value, forcedOptions);
});

beforeEach(() => {
  cy.login();
  cy.stubApi();
}); 
import { getToken } from './Auth';

export const getAccounts = async () => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/accounts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Ошибка получения данных');
    error.status = response.status;
    throw error;
  }

  return data;
};

export const createAccount = async () => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Ошибка создания аккаунта');
    error.status = response.status;
    throw error;
  }

  return data;
};

export const getAccount = async (id) => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/account/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Ошибка получения данных');
    error.status = response.status;
    throw error;
  }

  return data;
};

export const transferToAccount = async (from, to, amount) => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/transfer-funds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || 'Ошибка перевода на другой кошелек'
    );
    error.status = response.status;
    throw error;
  }

  return data;
};

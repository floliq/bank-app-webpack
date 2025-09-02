import { getToken } from './Auth';

export const getCurrencies = async () => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/currencies`, {
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
}

export const getAllCurrencies = async () => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/all-currencies`, {
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
}


export const buyCurrency = async (from, to, amount) => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/currency-buy`, {
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
      data.message || 'Ошибка перевода на другой валютный кошелек'
    );
    error.status = response.status;
    throw error;
  }

  return data;
};
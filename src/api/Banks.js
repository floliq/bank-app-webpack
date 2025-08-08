import { getToken } from './Auth';

export const getBanks = async () => {
  const token = getToken();

  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/banks`, {
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

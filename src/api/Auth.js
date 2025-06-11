export const auth = async (login, password) => {
  // eslint-disable-next-line no-undef
  const response = await fetch(`${process.env.API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Ошибка авторизации');
    error.status = response.status;
    throw error;
  }

  return data;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

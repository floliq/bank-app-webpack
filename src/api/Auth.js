export const auth = async (login, password) => {
  const response = await fetch('http://localhost:3000/login', {
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

const flatApiUrl = 'http://127.0.0.1:8000';

export default {
  logIn(credentials) {
    fetch(`${flatApiUrl}/session/create`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
    }).then(res => res.json());
  },
  fetchExpenses() {
    return fetch(`${flatApiUrl}/charge/expenses/2018/2`, {
      credentials: 'include',
    }).then(res => res.json());
  },
};

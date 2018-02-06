const flatApiUrl = 'http://dev.api.flat.kubernetes.tobiasz.memleak.pl/';

export default {
  logIn(credentials) {
    fetch(`${flatApiUrl}/session/create`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json());
  },
};

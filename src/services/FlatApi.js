import Router from '../router';

const flatApiUrl = 'http://dev.api.flat.kubernetes.tobiasz.memleak.pl/';

export default {
  logIn(credentials, showErrorMessage) {
    fetch(`${flatApiUrl}/session/create`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => {
      if (response.status === 200) {
        Router.push('/');
      } else {
        showErrorMessage();
      }
    });
  },
};

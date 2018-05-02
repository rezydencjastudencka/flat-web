import Router from '../router';

const flatApiUrl = 'http://dev.api.flat.kubernetes.tobiasz.memleak.pl/';

export default {
  WrongCredentialsException() {
  },
  SomethingWentWrongException() {
  },

  async logIn(credentials) {
    let response;
    try {
      response = await fetch(`${flatApiUrl}/session/create`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      });
    } catch (error) {
      throw new this.SomethingWentWrongException();
    }

    if (response.status === 200) {
      Router.push('/');
    } else {
      throw new this.WrongCredentialsException();
    }
  },
};

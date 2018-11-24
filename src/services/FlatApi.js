import Router from '../router';
import { getApiUrl } from '../constants';

export default {
  WrongCredentialsException() {
  },
  SomethingWentWrongException() {
  },

  async logIn(credentials, next) {
    let response;
    try {
      response = await fetch(`${getApiUrl()}/session/create`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        credentials: 'include',
      });
    } catch (error) {
      throw new this.SomethingWentWrongException();
    }

    if (response.status === 200) {
      Router.push(next);
    } else {
      throw new this.WrongCredentialsException();
    }
  },
};

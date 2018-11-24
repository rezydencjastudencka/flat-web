import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { getGraphQLUrl } from './constants';
import router from './router';

export default {
  createApolloProvider() {
    const httpLink = new HttpLink({
      // You should use an absolute URL here
      uri: getGraphQLUrl(),
      credentials: 'include',
    });

    const onUnauthorized = onError(({ graphQLErrors }) => {
      const isUnauthorizedError = graphQLErrors && graphQLErrors.some(e => e.code === 401);
      if (isUnauthorizedError) {
        const loginRoute = router.resolve({
          name: 'Sign In',
          query: { next: router.currentRoute.fullPath },
        });
        router.replace(loginRoute.href);
        return true;
      }

      return false;
    });

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: onUnauthorized.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

    // Install the vue plugin
    Vue.use(VueApollo);

    return new VueApollo({
      defaultClient: apolloClient,
    }).provide();
  },
};

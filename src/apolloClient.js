import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { getGraphQLUrl } from './constants';

export default {
  createApolloProvider() {
    const httpLink = new HttpLink({
      // You should use an absolute URL here
      uri: getGraphQLUrl(),
      credentials: 'include',
    });

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: httpLink,
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

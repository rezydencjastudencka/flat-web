const apiUrl = 'http://dev.api.flat.kubernetes.tobiasz.memleak.pl';

export function getApiUrl() {
  return apiUrl;
}

export function getGraphQLUrl() {
  return `${apiUrl}/graphql`;
}

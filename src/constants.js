const apiUrl = 'https://api.flat.memleak.pl';

export function getApiUrl() {
  return apiUrl;
}

export function getGraphQLUrl() {
  return `${apiUrl}/graphql`;
}

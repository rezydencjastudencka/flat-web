const apiUrl = 'https://api.flat.memleak.pl';
export const pollInterval = 5000;

export function getApiUrl() {
  return apiUrl;
}

export function getGraphQLUrl() {
  return `${apiUrl}/graphql`;
}

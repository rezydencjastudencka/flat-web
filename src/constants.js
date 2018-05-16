const apiUrl = 'http://localhost:8000';

export function getApiUrl() {
  return apiUrl;
}

export function getGraphQLUrl() {
  return `${apiUrl}/graphql`;
}

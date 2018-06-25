const API_URL_BASE = 'http://localhost:3000/api';

export const API_URLS = {
  auth: () => `${API_URL_BASE}/auth`,
  fetchUser: name => `${API_URL_BASE}/users/${name}`,
  updateUser: name => `${API_URL_BASE}/users/${name}`,
  destroyUser: name => `${API_URL_BASE}/users/${name}`,
  fetchArticleList: () => `${API_URL_BASE}/articles`,
  fetchArticle: identifier => `${API_URL_BASE}/articles/${identifier}`,
  createArticle: () => `${API_URL_BASE}/articles`,
  updateArticle: identifier => `${API_URL_BASE}/articles/${identifier}`,
  destroyArticle: identifier => `${API_URL_BASE}/articles/${identifier}`,
  createComment: articleIdentifier => `${API_URL_BASE}/articles/${articleIdentifier}/comments`,
  updateComment: (articleIdentifier, commentIdentifier) => `${API_URL_BASE}/articles/${articleIdentifier}/comments/${commentIdentifier}`,
  destroyComment: (articleIdentifier, commentIdentifier) => `${API_URL_BASE}/articles/${articleIdentifier}/comments/${commentIdentifier}`,
};

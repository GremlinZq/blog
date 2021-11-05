import * as axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api/',
});

export const articlesApi = {
  getArticles: currentPage => instance.get(`articles?limit=5&offset=${currentPage * 5 - 5}`, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
      'Content-Type': 'application/json',
    },
  }),
  getCurrentArticle: title => instance.get(`articles/${title}`, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
      'Content-Type': 'application/json',
    },
  }),
  createArticle: (title, description, body, tagList) => instance.post('articles', {
    article: {
      title,
      description,
      body,
      tagList,
    },
  }, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
      'Content-Type': 'application/json',
    },
  }),
  editArticle: (slug, title, description, body, tagList) => instance.put(`/articles/${slug}`, {
    article: {
      title,
      description,
      body,
      tagList,
    },
  }, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
      'Content-Type': 'application/json',
    },
  }),
  deleteArticle: slug => instance.delete(`/articles/${slug}`, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
    },
  }),
  favoriteArticle: slug => instance.post(`/articles/${slug}/favorite`, null, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
    },
  }),
  unfavoredArticle: slug => instance.delete(`/articles/${slug}/favorite`, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
    },
  }),
};

export const authApi = {
  registerUser: (username, email, password) => instance.post('users', {
    user: {
      username,
      email,
      password,
    },
  }),
  login: (email, password) => instance.post('users/login', {
    user: {
      email,
      password,
    },
  }),
  authMe: () => instance.get('user', {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
      'Content-Type': 'application/json',
    },
  }),
  updateProfile: (username, email, password, image) => instance.put('user', {
    user: {
      username,
      email,
      password,
      image,
    },
  }, {
    headers: {
      'Authorization': `Token ${cookies.get('authToken')}`,
      'Content-Type': 'application/json',
    },
  }),
};
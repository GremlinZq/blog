import * as axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: 'https://conduit.productionready.io/api/',
  headers: {
    'Authorization': `Token ${cookies.get('authToken') || ''}`,
    'Content-Type': 'application/json',
  },
});

export const articlesApi = {
  getArticles: currentPage => instance.get(`articles?limit=5&offset=${currentPage * 5 - 5}`),
  getCurrentArticle: title => instance.get(`articles/${title}`),
  createArticle: (title, description, body, tagList) => instance.post('articles', {
    article: {
      title,
      description,
      body,
      tagList,
    },
  }),
  editArticle: (slug, title, description, body, tagList) => instance.put(`/articles/${slug}`, {
    article: {
      title,
      description,
      body,
      tagList,
    },
  }),
  deleteArticle: slug => instance.delete(`/articles/${slug}`),
  favoriteArticle: slug => instance.post(`/articles/${slug}/favorite`),
  unfavoredArticle: slug => instance.delete(`/articles/${slug}/favorite`),
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
  authMe: () => instance.get('user'),
  updateProfile: (username, email, password, image) => instance.put('user', {
    user: {
      username,
      email,
      password,
      image,
    },
  }),
};
import { articlesApi } from '../../api/api';
import {
  GET_ARTICLES,
  GET_CURRENT_ARTICLE,
  INSTALL_DOWNLOAD_ARTICLE,
  INSTALL_DOWNLOAD_ARTICLES,
  SET_ARTICLES_COUNT,
  SET_CURRENT_PAGE,
  SET_LIKE_ARTICLE,
  SET_OPEN_ARTICLE,
  SET_SUCCESSFUL_ARTICLE_CREATION,
} from '../constants/constants';

const initialState = {
  articles: [],
  currentArticle: {},
  articlesCount: 0,
  isLoadingAllArticle: false,
  isLoadingArticle: false,
  currentPage: 1,
  openArticle: false,
  successfulArticleCreation: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: [...action.articles],
      };
    case GET_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: {
          ...state.currentArticle,
          ...action.article,
        },
      };
    case INSTALL_DOWNLOAD_ARTICLES:
      return {
        ...state,
        isLoadingAllArticle: action.isLoadingAllArticle,
      };
    case INSTALL_DOWNLOAD_ARTICLE:
      return {
        ...state,
        isLoadingArticle: action.isLoadingArticle,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case SET_ARTICLES_COUNT:
      return {
        ...state,
        articlesCount: action.count,
      };
    case SET_OPEN_ARTICLE:
      return {
        ...state,
        openArticle: action.openArticle,
      };
    case SET_SUCCESSFUL_ARTICLE_CREATION:
      return {
        ...state,
        successfulArticleCreation: action.success,
      };
    case SET_LIKE_ARTICLE:
      return {
        ...state,
        articles: [...state.articles.map(article => {
          if (article.slug === action.slug) {
            return {
              ...article,
              favorited: action.favorited,
              favoritesCount: action.favoritesCount,
            };
          }
          return article;
        })],
        currentArticle: {
          ...state.currentArticle,
          favorited: action.favorited,
          favoritesCount: action.favoritesCount,
        }
      };
    default:
      return state;
  }
};

const setArticles = articles => ({ type: GET_ARTICLES, articles });
const setCurrentArticle = article => ({ type: GET_CURRENT_ARTICLE, article });
const setLoadingArticle = isLoadingArticle => ({ type: INSTALL_DOWNLOAD_ARTICLE, isLoadingArticle });
const setLoadingAllArticles = isLoadingAllArticle => ({ type: INSTALL_DOWNLOAD_ARTICLES, isLoadingAllArticle });
const setArticlesCount = count => ({ type: SET_ARTICLES_COUNT, count });
const successfulArticleCreation = success => ({ type: SET_SUCCESSFUL_ARTICLE_CREATION, success });
const setLikeArticle = (slug, favorited, favoritesCount) => ({
  type: SET_LIKE_ARTICLE,
  slug,
  favorited,
  favoritesCount,
});
export const setOpenArticle = openArticle => ({ type: SET_OPEN_ARTICLE, openArticle });

export const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page });

export const getArticlesList = currentPage => async dispatch => {
  try {
    dispatch(setLoadingAllArticles(false));

    const res = await articlesApi.getArticles(currentPage);

    if (res.status === 200) {
      dispatch(setArticlesCount(res.data.articlesCount));
      dispatch(setArticles(res.data.articles));
      dispatch(setLoadingAllArticles(true));
    }
  } catch (err) {
    throw err.response.data;
  }
};

export const getArticle = title => async dispatch => {
  try {
    dispatch(setLoadingArticle(false));

    const res = await articlesApi.getCurrentArticle(title);

    if (res.status === 200) {
      dispatch(setCurrentArticle(res.data.article));
      dispatch(setArticlesCount(res.data.articlesCount));
      dispatch(setLoadingArticle(true));
    }
  } catch (err) {
    throw err.response.data;
  }
};

export const createArticleCard = ({tagList, body, description, title}, setError) => async dispatch => {
  try {
    const res = await articlesApi.createArticle(title, description, body, tagList);

    if (res.status === 200) {
      dispatch(successfulArticleCreation(true));
    }
    dispatch(successfulArticleCreation(false));
  } catch (err) {
    setError('uniqueСard', {
      type: "server_error",
      message: err.response.data.errors.title,
    })
  }
};

export const editArticleCard = (slug, values, setError) => async dispatch => {
  try {
    const res = await articlesApi.editArticle(slug, values.title, values.description, values.body, values.tagList);

    if (res.status === 200) {
      dispatch(successfulArticleCreation(true));
    }
    dispatch(successfulArticleCreation(false));
  } catch (err) {
    setError('uniqueСard', {
      type: "server_error",
      message: err.response.data.errors.title,
    })
  }
};

export const deleteArticleCard = slug => async dispatch => {
  try {
    const res = await articlesApi.deleteArticle(slug);

    if (res.status === 204) {
      dispatch(successfulArticleCreation(true));
    }
    dispatch(successfulArticleCreation(false));
  } catch (err) {
    throw err.response.data;
  }
};

export const likeArticleCard = slug => async dispatch => {
  try {
    const res = await articlesApi.favoriteArticle(slug);
    dispatch(setLikeArticle(slug, res.data.article.favorited, res.data.article.favoritesCount));
  } catch (err) {
    throw err.response.data;
  }
};

export const dislikeArticleCard = slug => async dispatch => {
  try {
    const res = await articlesApi.unfavoredArticle(slug);
    dispatch(setLikeArticle(slug, res.data.article.favorited, res.data.article.favoritesCount));
  } catch (err) {
    throw err.response.data;
  }
};

export default articleReducer;
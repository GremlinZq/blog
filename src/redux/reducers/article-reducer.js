import {articlesApi} from "../../api/api";

const GET_ARTICLES = 'article/GET_ARTICLES';
const GET_CURRENT_ARTICLE = 'article/GET_CURRENT_ARTICLE';
const INSTALL_DOWNLOAD_ARTICLE = 'article/INSTALL DOWNLOAD ARTICLE';
const INSTALL_DOWNLOAD_ARTICLES = 'article/INSTALL_DOWNLOAD_ARTICLES';
const SET_CURRENT_PAGE = 'articles/SET_CURRENT_PAGE';

const initialState = {
    articles: [],
    currentArticle: {},
    isLoadingAllArticle: false,
    isLoadingArticle: false,
    currentPage: 1,
}

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: [...action.articles]
            }
        case GET_CURRENT_ARTICLE:
            return {
                ...state,
                currentArticle: {
                    ...state.currentArticle,
                    ...action.article,
                }
            }
        case INSTALL_DOWNLOAD_ARTICLES:
            return {
                ...state,
                isLoadingAllArticle: action.isLoadingAllArticle,
            }
        case INSTALL_DOWNLOAD_ARTICLE:
            return {
                ...state,
                isLoadingArticle: action.isLoadingArticle
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        default:
            return state
    }
}

const setArticles = articles => ({type: GET_ARTICLES, articles})
const setCurrentArticle = article => ({type: GET_CURRENT_ARTICLE, article})
const setLoadingArticle = isLoadingArticle => ({type: INSTALL_DOWNLOAD_ARTICLE, isLoadingArticle})
const setLoadingAllArticles = isLoadingAllArticle => ({type: INSTALL_DOWNLOAD_ARTICLES, isLoadingAllArticle})

export const setCurrentPage = page => ({type: SET_CURRENT_PAGE, page})

export const getArticlesList = () => dispatch => {
    articlesApi.getArticles()
        .then(res => {
            console.log(res)
            dispatch(setLoadingAllArticles(false))
            if (res.status === 200) {
                dispatch(setArticles(res.data.articles))
                dispatch(setLoadingAllArticles(true))
            }
        }).catch(err => `Error: ${err.message} status: ${err.status}`)
    dispatch(setLoadingArticle(false))
}

export const getArticle = title => dispatch => {
    articlesApi.getCurrentArticle(title)
        .then(res => {
            dispatch(setLoadingArticle(false))
            if (res.status === 200) {
                dispatch(setCurrentArticle(res.data.article))
                dispatch(setLoadingArticle(true))
            }
        }).catch(err => `Error: ${err.message} status: ${err.status}`)
    dispatch(setLoadingArticle(false))
}

export default articleReducer;
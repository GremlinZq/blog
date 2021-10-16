import * as axios  from 'axios';

const instance = axios.create({
    baseURL: 'https://conduit-api-realworld.herokuapp.com/api/'
})

export const articlesApi = {
    getArticles: currentPage => instance.get(`articles?limit=5&offset=${currentPage * 5 - 5}`),
    getCurrentArticle: title => instance.get(`articles/${title}`)
}
import * as axios  from 'axios';

const instance = axios.create({
    baseURL: 'https://conduit-api-realworld.herokuapp.com/api/'
})

export const articlesApi = {
    getArticles: () => instance.get('articles'),
    getCurrentArticle: title => instance.get(`articles/${title}`)
}
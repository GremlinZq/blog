import * as axios  from 'axios';

const instance = axios.create({
    baseURL: 'https://conduit.productionready.io/api/'
})

const articlesApi = {
    getArticles: () => instance.get('articles')
}
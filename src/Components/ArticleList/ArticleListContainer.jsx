import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getArticlesList, setCurrentPage} from "../../redux/reducers/article-reducer";
import ArticleList from "./ArticleList";

const ArticleListContainer = props => {
    const {articles, getArticlesList, isLoadingAllArticle, currentPage, setCurrentPage} = props;

    useEffect(() => {
        getArticlesList(currentPage);
    }, [currentPage, getArticlesList])

    return <ArticleList
        articles={articles}
        isLoadingAllArticle={isLoadingAllArticle}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
    />
}

const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        isLoadingAllArticle: state.articles.isLoadingAllArticle,
        currentPage: state.articles.currentPage,
    }
}

export default connect(mapStateToProps, {getArticlesList,setCurrentPage})(ArticleListContainer);
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getArticle} from "../../redux/reducers/article-reducer";
import OpenArticle from "./OpenArticle";

const OpenArticleContainer = props => {
    const {getArticle, currentArticle, isLoadingArticle, isLoggedIn} = props;
    const userArticle = props.match.params.slug;

    useEffect(() => {
        if (userArticle) {
            getArticle(userArticle)
        }
    }, [userArticle, getArticle])

    return <OpenArticle
        currentArticle={currentArticle}
        isLoadingArticle={isLoadingArticle}
        isLoggedIn={isLoggedIn}
    />
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    currentArticle: state.articles.currentArticle,
    isLoadingArticle: state.articles.isLoadingArticle,
})

export default connect(mapStateToProps, {getArticle})(OpenArticleContainer);
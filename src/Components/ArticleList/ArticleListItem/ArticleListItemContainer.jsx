import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getArticle, setOpenArticle} from "../../../redux/reducers/article-reducer";
import {Spin} from "antd";
import {ArticleListItem} from "./ArticleListItem";

export const ArticleListItemContainer = ({match, ...rest}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const currentArticle = useSelector(state => state.articles.currentArticle)
    const isLoadingArticle = useSelector(state => state.articles.isLoadingArticle);
    const openArticle = useSelector(state => state.articles.openArticle);
    const userArticle = match.params.slug;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userArticle) {
            dispatch(getArticle(userArticle))
            dispatch(setOpenArticle(true))
        } else {
            dispatch(setOpenArticle(false))
        }
    }, [dispatch, userArticle])


    return isLoadingArticle ? <div className='container mt-4'>
        <ArticleListItem {...currentArticle} {...rest} openArticle={openArticle} isLoggedIn={isLoggedIn}/>
    </div>: <Spin className='container d-flex justify-content-center mt-4'/>
}
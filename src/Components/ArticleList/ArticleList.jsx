import React, {useEffect} from 'react';
import {Pagination, Spin} from 'antd';
import uniqueId from 'lodash.uniqueid';
import {useDispatch, useSelector} from "react-redux";
import {getArticlesList, setCurrentPage} from "../../redux/reducers/article-reducer";
import {ArticleListItem} from "./ArticleListItem/ArticleListItem";
import './ArticleList.scss';

export const ArticleList = ({match}) => {
    const articles = useSelector(state => state.articles.articles);
    const isLoadingAllArticle = useSelector(state => state.articles.isLoadingAllArticle);
    const currentPage = useSelector(state => state.articles.currentPage);
    const articlesCount = useSelector(state => state.articles.articlesCount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticlesList(currentPage))
    }, [dispatch, currentPage])

    const articlesList = articles.map((article, idx) => {
        return <ArticleListItem tabIndex={idx} key={uniqueId('article-')}{...article} match={match} />
    })

    return (
        <div className='container'>
            <div className='row'>
                <ul className='article_list'>
                    {!isLoadingAllArticle
                        ? <Spin className='d-flex justify-content-center align-items-center mb-3'/>
                        : articlesList
                    }
                </ul>
                <div className='pagination d-flex justify-content-center align-items-center mb-3'>
                    <Pagination size="small" defaultCurrent={currentPage} pageSize={5} total={articlesCount}
                                onChange={(page) => dispatch(setCurrentPage(page))}
                                disabled={articlesCount <= 5}
                    />
                </div>
            </div>
        </div>
    )
}
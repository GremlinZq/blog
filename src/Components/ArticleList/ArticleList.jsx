import React from 'react';
import {Pagination, Spin} from 'antd';
import uniqueId from 'lodash.uniqueid';
import ArticleListItem from "./ArticleListItem/ArticleListItem";
import './ArticleList.scss';

const ArticleList = props => {
    const {articles, isLoadingAllArticle, currentPage, setCurrentPage} = props;

    const articlesList = articles.map((article, idx) => {
        return (
            <ArticleListItem tabIndex={idx} key={uniqueId('article-')}{...article} />
        )
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
                    <Pagination defaultCurrent={currentPage}
                                total={50}
                                onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticleList;
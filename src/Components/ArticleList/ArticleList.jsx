import React from 'react';
import {Pagination} from 'antd';

import './ArticleList.scss';
import ArticleListItem from "./ArticleListItem/ArticleListItem";

const ArticleList = props => {
    const articles = new Array(5).fill(0).map((article, idx) => <ArticleListItem key={idx} {...props} />)

    return (
        <div className='container'>
            <div className='row'>
                <ul className='article_list'>
                    {articles}
                </ul>

                <div className='pagination d-flex justify-content-center align-items-center mb-3'>
                    <Pagination defaultCurrent={1} total={50}/>
                </div>
            </div>
        </div>
    )
}

export default ArticleList;
import React, { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import uniqueId from 'lodash.uniqueid';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesList, setCurrentPage } from '../../redux/reducers/article-reducer';
import { ArticleListItem } from './ArticleListItem/ArticleListItem';
import {
  getArticles,
  getArticlesCount,
  getCurrentPage,
  getIsLoadingAllArticle,
  getUserAuthorization,
} from '../../redux/selectors/selectors';
import './ArticleList.scss';

export const ArticleList = () => {
  const articles = useSelector(getArticles);
  const isLoadingAllArticle = useSelector(getIsLoadingAllArticle);
  const currentPage = useSelector(getCurrentPage);
  const articlesCount = useSelector(getArticlesCount);
  const isLoggedIn = useSelector(getUserAuthorization);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getArticlesList(currentPage));
    }
  }, [isLoggedIn, dispatch, currentPage]);

  const articlesList = isLoggedIn && articles.map((article, idx) => {
    return <ArticleListItem tabIndex={idx} key={uniqueId('article-')}{...article} />;
  });

  return (
    <div className='container'>
      <div className='row'>
        <ul className='article_list'>
          {!isLoadingAllArticle && isLoggedIn
            ? <Spin className='d-flex justify-content-center align-items-center mb-3' />
            : articlesList
          }
        </ul>
        <div className='pagination d-flex justify-content-center align-items-center mb-3'>
          <Pagination size='small' defaultCurrent={currentPage} pageSize={5} total={articlesCount}
                      onChange={(page) => dispatch(setCurrentPage(page))}
                      disabled={articlesCount <= 5} />
        </div>
      </div>
    </div>
  );
};
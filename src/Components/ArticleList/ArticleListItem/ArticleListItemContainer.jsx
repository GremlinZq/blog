import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { getArticle, setOpenArticle } from '../../../redux/reducers/article-reducer';
import { ArticleListItem } from './ArticleListItem';
import {
  getCurrentArticle,
  getIsLoadingArticle,
  getOpenArticle,
  getUserAuthorization,
} from '../../../redux/selectors/selectors';

export const ArticleListItemContainer = () => {
  const isLoggedIn = useSelector(getUserAuthorization);
  const currentArticle = useSelector(getCurrentArticle);
  const isLoadingArticle = useSelector(getIsLoadingArticle);
  const openArticle = useSelector(getOpenArticle);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) {
      dispatch(getArticle(slug));
      dispatch(setOpenArticle(true));
    } else {
      dispatch(setOpenArticle(false));
    }
  }, [dispatch, slug]);


  return isLoadingArticle ? <div className='container mt-4'>
    <ArticleListItem {...currentArticle} openArticle={openArticle} isLoggedIn={isLoggedIn} />
  </div> : <Spin className='container d-flex justify-content-center mt-4' />;
};
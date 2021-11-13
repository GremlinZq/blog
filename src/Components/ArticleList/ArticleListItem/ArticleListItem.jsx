import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { HeartTwoTone } from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { format } from 'date-fns';
import uniqueId from 'lodash.uniqueid';
import { deleteArticleCard, dislikeArticleCard, likeArticleCard } from '../../../redux/reducers/article-reducer';
import Logo from '../Rectangle 1.svg';
import { getSuccessfulArticleCreation } from '../../../redux/selectors/selectors';
import './ArticleListItem.scss';

export const ArticleListItem = (props) => {
  const { slug, title, isLoggedIn, author, createdAt, tagList, description, openArticle, body, favorited, favoritesCount, } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const editHandle = () => history.push('edit', { slug, title, isLoggedIn, author, createdAt, tagList, description, favorited, favoritesCount, body, });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const successfulArticleCreation = useSelector(getSuccessfulArticleCreation);
  const [like, setLike] = useState(favorited);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(deleteArticleCard(slug));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const rateArticle = () => {
    setLike(!like);
    if (favorited) {
      dispatch(dislikeArticleCard(slug));
    } else {
      dispatch(likeArticleCard(slug));
    }
  };

  if (successfulArticleCreation) {
    return <Redirect to='/' />;
  }

  return (
    <li className='article_list_item'>
      <div className='d-flex justify-content-between'>
        <div className='article_list_item-title d-flex align-items-center'>
          <Link to={`/articles/${slug}/`}>
            <span className='description'>{title}</span>
          </Link>
          <button type='button' disabled={!isLoggedIn}>
            <HeartTwoTone twoToneColor={like ? 'red' : `#b4b4b4`} onClick={rateArticle} />
          </button>
          <span className='article_list_item-count'>{favoritesCount}</span>
        </div>

        <div className='d-flex'>
          <div className='article_list_item-info'>
            <div>{author.username}<span>{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
            </div>
          </div>
          <img src={author.image || Logo} alt='' />
        </div>
      </div>

      <ul className='article_list_item-tags d-flex flex-wrap'>
        {tagList.map(tag => <li key={uniqueId('tag-')} className='article_list_item-tags-item'>{tag}</li>)}
      </ul>
      <div className='article_list_item-text'>
        <span>{description}</span>
      </div>
      {openArticle &&
      <div className='body d-flex justify-content-between'>
        <div><ReactMarkdown>{body}</ReactMarkdown></div>
        {isLoggedIn &&

        <div className='body__buttons d-flex'>
          <button onClick={showModal} type='button' className='btn btn-outline-danger'>Delete</button>
          <Modal style={{ position: 'absolute', right: 0 }} width='250px' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure to delete this article?</p>
          </Modal>
          <button onClick={editHandle} type='button' className='btn btn-outline-success mx-3'>Edit</button>
        </div>
        }
      </div>
      }
    </li>
  );
};

ArticleListItem.defaultProps = {
  isLoggedIn: false,
  openArticle: false,
  slug: '',
  title: '',
  author: {
    username: '',
    image: '',
  },
  createdAt: '',
  tagList: [],
  description: '',
  body: '',
  favorited: false,
  favoritesCount: 0,
};

ArticleListItem.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  author: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
  }),
  createdAt: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  openArticle: PropTypes.bool,
  body: PropTypes.string,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
};
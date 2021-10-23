import React from "react";
import ReactMarkdown from 'react-markdown'
import uniqueId from 'lodash.uniqueid';
import {format} from 'date-fns';
import {HeartTwoTone} from "@ant-design/icons";
import Logo from "../ArticleList/Rectangle 1.svg";
import {Spin} from 'antd';

const OpenArticle = props => {
    const {isLoadingArticle, currentArticle, isLoggedIn} = props;
    const {title, author, createdAt, tagList, description, body} = currentArticle;

    return (
        <div className='mt-4'>
            <div className='container'>
                <div className='row'>
                    {!isLoadingArticle
                        ? <Spin/>
                        : <li className='article_list_item'>
                            <div className='d-flex justify-content-between'>
                                <div className='article_list_item-title d-flex align-items-center'>
                                    <span className='description'>{title}</span>
                                    <button>
                                        <HeartTwoTone/>
                                    </button>
                                    <span className='article_list_item-count'>22</span>
                                </div>

                                <div className='d-flex'>
                                    <div className='article_list_item-info'>
                                        <div>
                                            {author.username}
                                            <span>{format(new Date(createdAt), 'MMMM d, yyyy')}</span>
                                        </div>
                                    </div>
                                    <img src={author.image || Logo} alt="user logo"/>
                                </div>
                            </div>

                            <ul className='article_list_item-tags d-flex flex-wrap'>
                                {tagList.map(tag => <li key={uniqueId('tag-')}
                                                        className='article_list_item-tags-item'>{tag}</li>)}
                            </ul>

                            <div className='article_list_item-text'>
                                <span>{description}</span>
                            </div>
                            <div>
                                <ReactMarkdown>{body}</ReactMarkdown>
                            </div>
                        </li>
                    }
                </div>
            </div>
        </div>
    )
}

export default OpenArticle;
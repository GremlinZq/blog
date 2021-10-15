import React, {useState} from 'react';
import {HeartTwoTone} from "@ant-design/icons";
import Logo from "../Rectangle 1.svg";
import {Link} from "react-router-dom";
import {format} from 'date-fns';
import './ArticleListItem.scss';
import uniqueId from "lodash.uniqueid";

const ArticleListItem = props => {
    const {isLoggedIn,slug, author, title, description, createdAt, tagList} = props;
    const {username} = author;
    const [active, setActive] = useState(false)

    return (
        <li className='article_list_item'>
            <div className='d-flex justify-content-between'>
                <div className='article_list_item-title d-flex align-items-center'>
                    <Link to={`/articles/${slug}`}>
                        <span className='description'>{title}</span>
                    </Link>

                    <button disabled={!isLoggedIn}>
                        <HeartTwoTone twoToneColor={active && isLoggedIn ? 'red' : `#b4b4b4`}
                                      onClick={() => setActive(!active)}/>
                    </button>
                    <span className='article_list_item-count'>22</span>
                </div>

                <div className='d-flex'>
                    <div className='article_list_item-info'>
                        <div>{username}<span>{format(new Date(createdAt), 'MMMM d, yyyy')}</span></div>
                    </div>
                    <img src={Logo} alt=""/>
                </div>
            </div>

            <ul className='article_list_item-tags d-flex flex-wrap'>
                {tagList.map(tag => <li key={uniqueId('tag-')}
                                        className='article_list_item-tags-item'>{tag}</li>)}
            </ul>

            <div className='article_list_item-text'>
                <span>
                    {description}
                </span>
            </div>
        </li>
    )
}

export default ArticleListItem;
import React, {useEffect, useState} from 'react';
import {HeartTwoTone} from "@ant-design/icons";
import Logo from "../Rectangle 1.svg";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import './ArticleListItem.scss';
import axios from "axios";

const ArticleListItem = props => {
    const {isLoggedIn} = props;
    const [active, setActive] = useState(false)

    const idUserArticles = props.match.params.userId;

    useEffect(() => {
        axios.get(`https://conduit.productionready.io/api/articles`)
            .then(res => {
                console.log(res)
            })
    }, [])

    // просим данные на основе userId
    // useEffect(()  => {
    //     getArticleInfo(idUserArticles)
    // }, [idUserArticles])
    // BLL ->> DALL
    // dispatch articles
    // передаем данные из редюсера
    // исп react-markdown
    // отображаем данные на стр


    return (
            <li className='article_list_item'>
                <div className='d-flex justify-content-between'>
                    <div className='article_list_item-title d-flex align-items-center'>
                        <Link to={`/articles/${23}`}>
                            <span className='description'>Some article title</span>
                        </Link>

                        <button disabled={!isLoggedIn}>
                            <HeartTwoTone twoToneColor={active && isLoggedIn ? 'red' : `#b4b4b4`}
                                          onClick={() => setActive(!active)}/>
                        </button>
                        <span className='article_list_item-count'>22</span>
                    </div>

                    <div className='d-flex'>
                        <div className='article_list_item-info'>
                            <div>John Doe <span>March 5,2020</span></div>
                        </div>
                        <img src={Logo} alt=""/>
                    </div>
                </div>

                <ul className='article_list_item-tags d-flex flex-wrap'>
                    <li className='article_list_item-tags-item'>tag1</li>
                    <li className='article_list_item-tags-item'>SomeTag</li>
                </ul>

                <div className='article_list_item-text'>
                <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat.
                </span>
                </div>
                {idUserArticles
                    ? <div>
                        Est Ampyciden pater patent
                        Amor saxa inpiger
                        Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.

                        Qua deos has fontibus
                        Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.

                        Quamvis pronuba
                        Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.

                        1. Clamoribus haesit tenentem iube Haec munera
                        2. Vincla venae
                        3. Paris includere etiam tamen
                        4. Superi te putria imagine Deianira
                        5. Tremore hoste Esse sed perstat capillis siqua
                    </div>
                    : null
                }
            </li>
    )
}

const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn})

export default connect(mapStateToProps, {})(ArticleListItem);
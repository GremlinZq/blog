import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../redux/reducers/auth-reducer";
import './Profile.scss';

export const Profile = () => {
    const {image, username} = useSelector(state => state.auth.authUser);
    const dispatch = useDispatch();

    return (
        <div>
            <div className='profile'>
                <Link to='/new-article'>Create article</Link>
                <Link to='/profile'>
                    <span>{username}</span>
                    <img src={image || `https://www.file-extension.info/images/resource/formats/img.png`} alt="img"/>
                </Link>
                <button onClick={() => dispatch(logOut())}>Log Out</button>
            </div>
        </div>
    )
}
import Cookies from 'universal-cookie';
import { authApi } from '../../api/api';
import { GET_LOGGED_IN, INSTALL_EDITED_PROFILE, SET_UPDATE_AUTH_USER } from '../constants/constants';

const cookies = new Cookies();

const initialState = {
  isLoggedIn: !!cookies.get('authToken'),
  authUser: {
    username: null,
    email: null,
    image: null,
    bio: null,
    token: null,
  },
  profileEdited: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATE_AUTH_USER:
      return {
        ...state,
        authUser: {
          ...state.authUser,
          ...action.user,
        },
      };
    case GET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case INSTALL_EDITED_PROFILE:
      return {
        ...state,
        profileEdited: action.edited,
      };
    default:
      return state;
  }
};

const setUpdateAuthUser = user => ({ type: SET_UPDATE_AUTH_USER, user });
const installEditedProfile = edited => ({ type: INSTALL_EDITED_PROFILE, edited });
export const getLoggedIn = isLoggedIn => ({ type: GET_LOGGED_IN, isLoggedIn });

export const requestUserRegister = (username, email, password, setError) => async dispatch => {
  try {
    const res = await authApi.registerUser(username, email, password);
    if (res.status === 200) {
      dispatch(requestLogin(email, password));
    }
  } catch (err) {
    setError('form', {
      type: 'server',
      message: Object.entries(err.response.data.errors).map(err => `${err[0]} ${err[1]}`),
    });
  }
};

export const logOut = () => dispatch => {
  dispatch(getLoggedIn(false));
  cookies.remove('authToken');
};

export const requestLogin = (email, password, setError) => async dispatch => {
  try {
      const res = await authApi.login(email, password);

    if (res.status === 200) {
      dispatch(getLoggedIn(true));

      const { user } = res.data;
      const cookieDate = (new Date(Date.now()+ 86400*1000));
      cookieDate.toUTCString();

      cookies.set('authToken', user.token, { expires: cookieDate });
      dispatch(setUpdateAuthUser(user));

      dispatch(requestAuthUser());
    }
  } catch (err) {
    setError('form', {
      type: 'server',
      message: Object.entries(err.response.data.errors).map(err => `${err[0]} ${err[1]}`),
    });
  }
};

export const requestAuthUser = () => async dispatch => {
  try {
    const res = await authApi.authMe();
    const { data, status } = res;
    const { user } = data;

    if (status === 200) {
      dispatch(getLoggedIn(true));
      dispatch(setUpdateAuthUser(user));
    }
  } catch (err) {
    throw err.response.data;
  }
};

export const getUpdatedProfile = (user, setError) => async dispatch => {
  try {
    const res = await authApi.updateProfile(user.username, user.email, user.password, user.image);

    if (res.status === 200) {
      dispatch(setUpdateAuthUser(user));
      dispatch(installEditedProfile(true));
    }
    dispatch(installEditedProfile(false));
  } catch (err) {
    dispatch(installEditedProfile(false));
    setError('form', {
      type: 'server',
      message: err.response.data.message,
    });
  }
};

export default authReducer;
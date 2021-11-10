import Cookies from 'universal-cookie';
import { requestAuthUser } from './auth-reducer';
import { INITIALIZED_SUCCESS } from '../constants/constants';

const cookies = new Cookies();

const initialState = {
  applicationInitialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        applicationInitialized: action.initialized,
      };
    default:
      return state;
  }
};

const applicationInitialized = initialized => ({ type: INITIALIZED_SUCCESS, initialized });

export const initializeApplication = () => async dispatch => {
  if (cookies.get('authToken')) {
    await dispatch(requestAuthUser());
  }
  dispatch(applicationInitialized(true));
};

export default appReducer;
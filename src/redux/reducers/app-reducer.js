import Cookies from 'universal-cookie';
import { requestAuthUser } from './auth-reducer';

const cookies = new Cookies();

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

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

const initializedSuccess = initialized => ({ type: INITIALIZED_SUCCESS, initialized });

export const initializeApplication = () => async dispatch => {
  if (cookies.get('authToken')) {
    dispatch(requestAuthUser());
  }

  dispatch(initializedSuccess(true));
};

export default appReducer;
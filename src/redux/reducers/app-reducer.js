import {requestAuthUser} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initialState = {
    applicationInitialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                applicationInitialized: action.initialized,
            }
        default:
            return state;
    }
}

const initializedSuccess = initialized => ({type: INITIALIZED_SUCCESS, initialized})

export const initializeApplication = isLoggedIn => dispatch => {
    const promise = isLoggedIn ? dispatch(requestAuthUser()) : null

    Promise.all([promise] ).then(() => {
        dispatch(initializedSuccess(true));
    })
}

export default appReducer;
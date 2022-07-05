import {
    REGISTER_SUCCESS,
    RESET_REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    WEB3_CONNECTION_SUCCESS,
    WEB3_CONNECTION_FAILED
} from '../backendHelpers/types';


const authReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case WEB3_CONNECTION_SUCCESS:
            return {
                ...state,
                uAddress: payload
            }
        case WEB3_CONNECTION_FAILED:
            return {
                ...state,
                uAddress: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true
            }
        case RESET_REGISTER_SUCCESS:
            return {
                ...state,
                register_success: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case REFRESH_SUCCESS:
            return {
                ...state,
                tokens: {...state.tokens, accessToken: payload }
            }
        case REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                tokens: []
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};


export { authReducer};
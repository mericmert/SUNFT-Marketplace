import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
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
    console.log("current type is:", type);
    switch(type) {
        case WEB3_CONNECTION_SUCCESS:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                uAddress: payload
            }))
            return {
                ...state,
                uAddress: payload
            }
        case WEB3_CONNECTION_FAILED:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                uAddress: null
            }))
            return {
                ...state,
                uAddress: null
            }
        case REGISTER_SUCCESS:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                register_success: true
            }))
            return {
                ...state,
                register_success: true
            }
        case REGISTER_FAIL:
            localStorage.setItem("state", JSON.stringify({
                ...state,
            }))
            return {
                ...state,
            }
        case RESET_REGISTER_SUCCESS:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                register_success: false
            }))
            return {
                ...state,
                register_success: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                isAuthenticated: true
            }))
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                isAuthenticated: false
            }))
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGOUT:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                isAuthenticated: false,
                user: null
            }))
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case LOAD_USER_SUCCESS:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                user: payload.user
            }))
            return {
                ...state,
                user: payload.user
            }
        case LOAD_USER_FAIL:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                user: null
            }))
            return {
                ...state,
                user: null
            }
        case REFRESH_SUCCESS:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                tokens: {...state.tokens, accessToken: payload }
            }))
            return {
                ...state,
                tokens: {...state.tokens, accessToken: payload }
            }
        case REFRESH_FAIL:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                isAuthenticated: false,
                user: null,
                tokens: initialState.tokens
            }))
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                tokens: initialState.tokens
            }
        case SET_AUTH_LOADING:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                loading: true
            }))
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            localStorage.setItem("state", JSON.stringify({
                ...state,
                loading: false
            }))
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    };
};


export { authReducer};
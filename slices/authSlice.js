import {createSlice} from "@reduxjs/toolkit";

const initialState = { uAddress: null, register_success: null, isAuthenticated: false, user: null, tokens: { accessToken: null, refreshToken: null }, loading: false };


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setWeb3Address: (state, action) => {
            state.uAddress = action.payload
        },
        setRegisterSuccess: (state, action) => {
            state.register_success = action.payload
        },
        login: (state, action) => {
            state.isAuthenticated = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = initialState.isAuthenticated;
            state.user = initialState.user;
        },
        loadUser: (state, action) => {
            state.user = action.payload;
        },
        refreshAccessToken: (state, action) => {
            state.tokens.accessToken = action.payload
        },
        refreshAccessTokenFailed: (state) => {
            state.isAuthenticated = initialState.isAuthenticated;
            state.user = initialState.user;
            state.tokens = initialState.tokens;
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setWeb3Address, setRegisterSuccess, login, logout, loadUser, refreshAccessToken, refreshAccessTokenFailed, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
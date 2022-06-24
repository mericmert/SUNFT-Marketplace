import { APIPath, AuthPath } from "../VARIABLES";
import User from '../objects/User';
import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
} from '../backendHelpers/types';
import NFTCollection from "../objects/NFTCollection";



class UserHelper {

    static dispatch: any;

    static _initialize(dispatch: any) {
        UserHelper.dispatch = dispatch;
    }

    static async find(params: Object) {
        const acceptedParams = ["username", "email", "uAddress"]
        if (!acceptedParams.some(param => Object.keys(params).includes(param))) {
            throw Error("give either a username, email or the address of the user");
        }
        const response = await axios.get(`${APIPath}/users/`, { params });
        const data = await response.data;
        if (data.length === 0) {
            return false;
        }
        const user: User = new User(data[0]);
        return user;
    }

    static async findMany(params: Object) {
        const response = await axios.get(`${APIPath}/users/`, { params });
        const data = await response.data;
        let users: User[] = [];
        for (let i = 0; i < data.length; i++) {
            users.push(new User(data[i]));
        }
        return users;
    }

    static async deleteMany(params: Object) {
        try {
            const response = await axios.delete(`${APIPath}/users/`, { data: params });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }
    }

     static async register(user: Object) {
        UserHelper.dispatch({
            type: SET_AUTH_LOADING
        });
        try {
            const response = await axios.post(`${AuthPath}/users/`, user);
            if (response.status === 201) {
                UserHelper.dispatch({
                    type: REGISTER_SUCCESS
                });
            } else {
                console.log("ZORT");
                UserHelper.dispatch({
                    type: REGISTER_FAIL
                });
            }
        }
         catch(err) {
            console.log(err);
            UserHelper.dispatch({
                type: REGISTER_FAIL
            });
        }

        UserHelper.dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }

    static async getJWTs(username: string, password: string) {
        console.log("AT JWTS", `${AuthPath}/jwt/create/`)

        try {
            const response = await axios.post(`${AuthPath}/jwt/create/`, {username, password});
            const tokens = await response.data;
            return tokens;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }

    static async refreshAccessToken(refresh: string) {
        try {
            const response = await axios.post(`${AuthPath}/jwt/refresh/`, { refresh });
            if (response.status === 200) {
                const tokenObj = await response.data;
                UserHelper.dispatch({
                    type: REFRESH_SUCCESS,
                    payload: tokenObj.access
                });
            }
            else {
                this.dispatch({
                    type: REFRESH_FAIL,
                });
            }
        }
        catch (e) {
            this.dispatch({
                type: REFRESH_FAIL,
            });
        }
    }

    static async loadUser(accessToken: string) {
        UserHelper.dispatch({
            type: SET_AUTH_LOADING
        });
        try {
            //PROBLEM
            const res = await axios.get(`${AuthPath}/users/me/`, {headers: {"Authorization": `JWT ${accessToken}`}});
            const data = await res.data;
            if (res.status === 200) {
                UserHelper.dispatch({
                    type: LOAD_USER_SUCCESS,
                    payload: { user: data }
                });
            }
            else {
                UserHelper.dispatch({
                    type: LOAD_USER_FAIL
                });
            }
        }
        catch(e) {
            UserHelper.dispatch({
                type: LOAD_USER_FAIL
            });
        }
        UserHelper.dispatch({
            type: REMOVE_AUTH_LOADING
        })
    }

    static async login(username: string, password: string) {

        UserHelper.dispatch({
            type: SET_AUTH_LOADING
        });

        try {
            let tokens = await UserHelper.getJWTs(username, password);

            UserHelper.dispatch({
                type: LOGIN_SUCCESS,
            });
            const { access } = tokens;
            console.log("Tokens", tokens);
            console.log("access", access);
            await UserHelper.loadUser(access);
        }
        catch (e) {
            UserHelper.dispatch({
                type: LOGIN_FAIL
            });
        }
    }

    static async activateUser(uid: string, token: string) {
        try {
            const res = await axios.post(`${AuthPath}/users/activation/`, {uid, token});
            return res.status === 200;
        }
        catch (e) {
            return false;
        }
    }

    static async removeWatchList(uid: string, collectionName: string) {
        try {
            await axios.delete(`${APIPath}/watchLists/`, { params: { user: uid, nftCollection: collectionName }});
        }
        catch (e) {
            console.log(e);
        }

    }

    static async addWatchList(uid: string, collectionName: string) {
        try {
            await axios.post(`${APIPath}/watchLists/`, {  user: uid, nftCollection: collectionName });
        }
        catch (e) {
            console.log(e);
        }

    }

    static async getWatchLists(uid: string) {
        const response = await axios.get(`${APIPath}/watchLists/`, { params: { user: uid }});
        const data = await response.data;
        let watchLists: NFTCollection[] = [];
        for (let i = 0; i < data.length; i++) {
            watchLists.push(new NFTCollection(data[i]));
        }
        return watchLists;
    }

}

export default UserHelper;



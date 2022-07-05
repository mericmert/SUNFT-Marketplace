import { APIPath, AuthPath } from "../VARIABLES";
import User from '../objects/User';
import axios from 'axios';
import NFTCollection from "../objects/NFTCollection";
import {
    loadUser, login,
    refreshAccessToken,
    refreshAccessTokenFailed,
    setAuthLoading,
    setRegisterSuccess
} from "../slices/authSlice";


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
        UserHelper.dispatch(setAuthLoading(true));
        try {
            const response = await axios.post(`${AuthPath}/users/`, user);
            if (response.status === 201) {
                UserHelper.dispatch(setRegisterSuccess(true));
            } else {
                UserHelper.dispatch(setRegisterSuccess(false));
            }
        }
         catch(err) {
            console.log(err);
             UserHelper.dispatch(setRegisterSuccess(false));
        }

         UserHelper.dispatch(setAuthLoading(false));
    }

    static async getJWTs(username: string, password: string) {
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
                UserHelper.dispatch(refreshAccessToken(tokenObj.access));
            }
            else {
                UserHelper.dispatch(refreshAccessTokenFailed());
            }
        }
        catch (e) {
            UserHelper.dispatch(refreshAccessTokenFailed());
        }
    }

    static async loadUser(accessToken: string) {
        UserHelper.dispatch(setAuthLoading(true));
        try {
            //PROBLEM
            const res = await axios.get(`${AuthPath}/users/me/`, {headers: {"Authorization": `JWT ${accessToken}`}});
            const data = await res.data;
            if (res.status === 200) {
                UserHelper.dispatch(loadUser(data));
            }
            else {
                UserHelper.dispatch(loadUser(null));
            }
        }
        catch(e) {
            UserHelper.dispatch(loadUser(null));
        }
        UserHelper.dispatch(setAuthLoading(false));
    }

    static async login(username: string, password: string) {

        UserHelper.dispatch(setAuthLoading(true));

        try {
            let tokens = await UserHelper.getJWTs(username, password);

            UserHelper.dispatch(login(true));
            const { access } = tokens;
            console.log("Tokens", tokens);
            console.log("access", access);
            await UserHelper.loadUser(access);
        }
        catch (e) {
            UserHelper.dispatch(login(false));
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



import axios from 'axios';

import User from './User';

import { APIPath } from '../VARIABLES';
import FormData from "form-data";

class NFT {
    address: string;
    nID: number;
    name: string;
    description: string | null;
    metaDataType: string;
    dataLink: string | null;
    addressName: string | null;
    creator: string;
    currentOwner: string;
    marketStatus: number;
    nftFile: string | null;
    numLikes: number;

    constructor({
                    address,
                    nID,
                    name,
                    description,
                    metaDataType,
                    dataLink,
                    addressName,
                    creator,
                    currentOwner,
                    marketStatus,
                    nftFile,
                    numLikes}
                    :
                {
                    address: string,
                    nID: number,
                    name: string,
                    description: string | null,
                    metaDataType: string,
                    dataLink: string,
                    addressName: string | null,
                    creator: string,
                    currentOwner: string,
                    marketStatus: number,
                    nftFile: string | null,
                    numLikes: number
                }) {

        this.address = address;
        this.nID = nID;
        this.name = name;
        this.description = description;
        this.metaDataType = metaDataType;
        this.dataLink = dataLink;
        this.addressName = addressName;
        this.creator = creator;
        this.currentOwner = currentOwner;
        this.marketStatus = marketStatus;
        this.nftFile = nftFile;
        this.numLikes = numLikes;
    }

    getPk() {
        return { address: this.address, nID: this.nID };
    }

    toString() {
        return this.name;
    }

    async getLikes() {
        const response = await axios.get(`${APIPath}/favorites/`, { params: this.getPk() });
        const data = await response.data;
        let users: User[] = [];
        for (let i = 0; i < data.length; i++) {
            users.push(new User(data[i]));
        }
        return users;
    }

    async getOwner() {
        const response = await axios.get(`${APIPath}/users/`, { params: { uAddress: this.currentOwner } });
        const data = await response.data;
        let owner: User = new User(data[0]);
        return owner;
    }

    async getCreator() {
        const response = await axios.get(`${APIPath}/users/`, { params: { uAddress: this.creator } });
        const data = await response.data;
        let owner: User = new User(data[0]);
        return owner;
    }

    async like(user: string) {
        const data = {...this.getPk(), user: user};
        if (data.address.length != 0 && data.nID.toString().length != 0 && user.length != 0) {
            try {
                const response = await axios.post(`${APIPath}/favorites/`, data);
                return response.status === 201;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    }

    async dislike(user: string) {
        const data = {...this.getPk(), user: user};
        if (data.address.length != 0 && data.nID.toString().length != 0 && user.length != 0) {
            try {
                const response = await axios.delete(`${APIPath}/favorites/`, {data});
                return response.status === 200;
            } catch (e) {
                return false;
            }
        }
        return false;
    }

    async isLikedBy(user: string) {
        try {
            const response = await axios.get(`${APIPath}/favorites/`, { params: { ...this.getPk(), user }});
            return response.data.length !== 0;
        }
        catch (e) {
            return false;
        }
    }

    // async update() {
    //
    // }
    //
    // delete() {
    //
    // }

    toFormData() {
        let data = new FormData();
        for (const [key, value] of Object.entries(this)) {
            data.append(`${key}`, value);
        }
        return data;
    }
}

export default NFT;

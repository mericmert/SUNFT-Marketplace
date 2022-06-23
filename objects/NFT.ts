import axios from 'axios';

import User from './User';

import { APIPath } from '../VARIABLES';

class NFT {
    id: number | null;
    UID: string;
    index: number;
    name: string;
    description: string | null;
    metaDataType: string;
    dataLink: string;
    collectionName: string | null;
    creator: string;
    currentOwner: string;
    marketStatus: number;
    nftFile: string | null;
    numLikes: number;

    constructor({
                    id,
                    UID,
                    index,
                    name,
                    description,
                    metaDataType,
                    dataLink,
                    collectionName,
                    creator,
                    currentOwner,
                    marketStatus,
                    nftFile,
                    numLikes}
                    :
                {
                    id: number | null,
                    UID: string,
                    index: number,
                    name: string,
                    description: string | null,
                    metaDataType: string,
                    dataLink: string,
                    collectionName: string | null,
                    creator: string,
                    currentOwner: string,
                    marketStatus: number,
                    nftFile: string | null,
                    numLikes: number
                }) {

        this.UID = UID;
        this.index = index;
        this.name = name;
        this.description = description;
        this.metaDataType = metaDataType;
        this.dataLink = dataLink;
        this.collectionName = collectionName;
        this.creator = creator;
        this.currentOwner = currentOwner;
        this.marketStatus = marketStatus;
        this.nftFile = nftFile;
        this.numLikes = numLikes;
        this.id = id;
    }

    getPk() {
        return { UID: this.UID, index: this.index };
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
        console.log("like running")
        try {
            const response = await axios.post(`${APIPath}/favorites/`, {...this.getPk(), user: user});
            return response.status === 201;
        }
        catch (e) {
            return false;
        }
    }

    async dislike(user: string) {
        try {
            const response = await axios.delete(`${APIPath}/favorites/`, {data: {...this.getPk(), user}});
            return response.status === 200;
        }
        catch (e) {
            return false;
        }
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

    async update() {

    }

    delete() {

    }
}

export default NFT;
import { APIPath } from '../VARIABLES';
import axios from 'axios';
import NFT from './NFT';
import NFTCollection from "./NFTCollection";

class User {
    uAddress: string;
    username: string;
    profilePicture: string;
    email: string;
    is_active: boolean;
    date_joined: Date;
    constructor({ uAddress, username, profilePicture, email, is_active, date_joined }: {
        uAddress: string,
        username: string,
        profilePicture: string,
        email: string,
        is_active: boolean,
        date_joined: Date }) {
            this.uAddress = uAddress;
            this.username = username;
            this.profilePicture = profilePicture;
            this.email = email;
            this.is_active = is_active;
            this.date_joined = date_joined;
    }

    getPk() {
        return this.uAddress;
    }

    update() {

    }

    async getLikes() {
        const response = await axios.get(`${APIPath}/favorites/`, { params: { user: this.getPk() }});
        const data = await response.data;
        let likes: NFT[] = [];
        for (let i = 0; i < data.length; i++) {
            likes.push(new NFT(data[i]));
        }
        return likes;
    }

    async getWatchLists() {
        const response = await axios.get(`${APIPath}/watchLists/`, { params: { user: this.getPk() }});
        const data = await response.data;
        let watchLists: NFTCollection[] = [];
        for (let i = 0; i < data.length; i++) {
            watchLists.push(new NFTCollection(data[i]));
        }
        return watchLists;
    }

    async getNFTsCreated() {
        const response = await axios.get(`${APIPath}/nfts/`, { params: { creator: this.getPk() }});
        const data = await response.data;
        let createdNFTs: NFT[] = [];
        for (let i = 0; i < data.length; i++) {
            createdNFTs.push(new NFT(data[i]));
        }
        return createdNFTs;
    }

    async getNFTsOwned() {
        try {
            const response = await axios.get(`${APIPath}/nfts/`, { params: { currentOwner: this.getPk() }});
        const data = await response.data;
        let ownedNFTs: NFT[] = [];
        for (let i = 0; i < data.length; i++) {
            ownedNFTs.push(new NFT(data[i]));
        }
        return ownedNFTs;
        }
        catch(e) {
            return false;
        }
        

    }

    delete() {

    }

    async getNFTCollectionsOwned() {
        const response = await axios.get(`${APIPath}/nftcollections/`, { params: { currentOwner: this.getPk() }});
        const data = await response.data;
        let ownedNFTCollections: NFTCollection[] = [];
        for (let i = 0; i < data.length; i++) {
            ownedNFTCollections.push(new NFTCollection(data[i]));
        }
        return ownedNFTCollections;
    }

    toString() {
        return this.username;
    }

    async addProfilePicture(profilePicture: any) {
        try {
            const response = await axios.patch(`${APIPath}/nftcollections/`, { uAddress: this.getPk(), profilePicture });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }

    }

}

export default User;
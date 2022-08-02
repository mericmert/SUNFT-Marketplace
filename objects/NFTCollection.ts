import {APIPath} from "../VARIABLES";
import NFT from "./NFT";
import User from './User';
import axios from "axios";
import FormData from "form-data";

class NFTCollection {
    name: string;
    description: string | null;
    owner: string;
    category: string | null;
    numLikes: number;
    collectionImage: string | null;
    address: string;

    constructor({name, description, owner, category, numLikes, collectionImage, address }:
                    { name:string; description:string | null; owner: string; category: string | null; numLikes: number; collectionImage: any; address: string; }) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.category = category;
        this.numLikes = numLikes;
        this.collectionImage = collectionImage;
        this.address = address;
    }

    getPk() {
        return this.address;
    }

    toString() {
        return this.name;
    }

    async getNFTs() {
        const response = await axios.get(`${APIPath}/nfts`, { params: { collection: this.getPk() }});
        const data = await response.data;
        const NFTs: NFT[] = [];
        for (let i = 0; i < data.length; i++) {
            NFTs.push(new NFT(data[i]));
        }
        return NFTs;
    }

    async getOwner() {
        const response = await axios.get(`${APIPath}/users`, { params: { uAddress: this.owner }});
        const data = await response.data;
        const owner: User = new User(data[0]);
        return owner;
    }

    update() {

    }

    async watchList(user: string) {
        try {
            const response = await axios.post(`${APIPath}/watchLists/`, { nftCollection: this.getPk(), user });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }

    }

    async removeWatchList(user: string) {
        try {
            const response = await axios.delete(`${APIPath}/watchLists/`, { data: { nftCollection: this.getPk(), user }});
            return response.status === 200;
        }
        catch (e) {
            return false;
        }

    }

    async getWatchLists() {
        const response = await axios.get(`${APIPath}/watchLists/`, {params: { nftCollection: this.getPk() }});
        const data = await response.data;
        let watchListedUsers: User[] = [];
        for (let i = 0; i < data.length; i++) {
            watchListedUsers.push(new User(data[i]));
        }
        return watchListedUsers;
    }

    async isWatchListedBy(uAddress: string) {
        try {
            const response = await axios.get(`${APIPath}/watchLists/`, {params:
                    {user: uAddress, nftCollection: this.getPk() }});
            return response.status === 200;
        }

        catch (e) {
            return false;
        }
    }

    toFormData() {
        let data = new FormData();
        data.append('name', this.name);
        data.append('collectionImage', this.collectionImage);
        data.append('description', this.description);
        data.append('owner', this.owner);
        data.append('category', this.category);
        return data;
    }

}

export default NFTCollection;

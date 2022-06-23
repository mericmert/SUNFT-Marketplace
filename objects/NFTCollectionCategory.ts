import NFTCollection from "./NFTCollection";
import {APIPath} from "../VARIABLES";
import axios from 'axios';

class NFTCollectionCategory {
    name: string;
    backgroundPicture: string;
    foregroundPicture: string;

    constructor({ name, backgroundPicture, foregroundPicture }: { name:string; backgroundPicture: string; foregroundPicture: string; }) {
        this.name = name;
        this.backgroundPicture = backgroundPicture;
        this.foregroundPicture = foregroundPicture;
    }

    getPk() {
        return this.name;
    }

    toString() {
        return this.name;
    }

    update() {

    }

    async getNFTCollections() {
        const response = await axios.get(`${APIPath}/nftcollections/`, { params: {category: this.getPk() }});
        const data = await response.data;
        let NFTCollections: NFTCollection[] = [];
        for (let i = 0; i < data.length; i++) {
            NFTCollections.push(new NFTCollection(data[i]));
        }
        return NFTCollections;

    }
}

export default NFTCollectionCategory;
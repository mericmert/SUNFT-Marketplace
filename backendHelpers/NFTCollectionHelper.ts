import {APIPath} from "../VARIABLES";
import NFTCollection from '../objects/NFTCollection';
import axios from 'axios';

class NFTCollectionHelper {

    async find(name: string) {
        const response = await axios.get(`${APIPath}/nftcollections`, { params: { name }});
        const data = await response.data;
        if (data.length === 0) {
            return false;
        }
        const collection: NFTCollection = new NFTCollection(data[0]);
        return collection;
    }

    async findMany(params: Object) {
        const response = await axios.get(`${APIPath}/nftcollections`, { params });
        const data = await response.data;
        let collections: NFTCollection[] = [];
        for (let i = 0; i < data.length; i++) {
            collections.push(new NFTCollection(data[i]));
        }
        return collections;
    }

    async deleteMany(params: Object) {
        try {
            const response = await axios.delete(`${APIPath}/nftcollections`, { data: params });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }
    }

    async add(collection: NFTCollection) {
        try {
            const response = await axios.post(`${APIPath}/nftcollections`, collection);
            return response.status === 201;
        }
        catch (e) {
            return false;
        }
    }
}

export default NFTCollectionHelper;
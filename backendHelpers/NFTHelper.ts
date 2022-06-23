import {APIPath} from "../VARIABLES";
import NFT from '../objects/NFT';
import axios from 'axios';

class NFTHelper {

    async find(UID: string, index: number) {
        const response = await axios.get(`${APIPath}/nfts`, { params: {UID, index }});
        const data = await response.data;
        if (data.length === 0) {
            return false;
        }
        const nft: NFT = new NFT(data[0]);
        return nft;
    }

    async findMany(params: Object) {
        const response = await axios.get(`${APIPath}/nfts`, { params });
        const data = await response.data;
        let nfts: NFT[] = [];
        for (let i = 0; i < data.length; i++) {
            nfts.push(new NFT(data[i]));
        }
        return nfts;
    }

    async deleteMany(params: Object) {
        try {
            const response = await axios.delete(`${APIPath}/nfts`, { data: params });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }
    }

    async add(nft: NFT) {
        try {
            const response = await axios.post(`${APIPath}/nfts`, nft);
            return response.status === 201;
        }
        catch (e) {
            return false;
        }
    }
}

export default NFTHelper;
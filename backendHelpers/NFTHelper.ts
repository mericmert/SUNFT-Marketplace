import {APIPath} from "../VARIABLES";
import NFT from '../objects/NFT';
import axios from 'axios';

class NFTHelper {

    static async find(address: string, nID: number) {

        const response = await axios.get(`${APIPath}/nfts/`, { params: { collection: address, nID: nID }});
        const data = await response.data;
        if (data.length === 0) {
            return false;
        }
        console.log(data[0]);
        const nft: NFT = new NFT(data[0]);
        return nft;
    }

    static async findMany(params: Object) {
        const response = await axios.get(`${APIPath}/nfts/`, { params, });
        const data = await response.data;
        let nfts: NFT[] = [];
        for (let i = 0; i < data.length; i++) {
            nfts.push(new NFT(data[i]));
        }
        return nfts;
    }

    static async deleteMany(params: Object) {
        try {
            const response = await axios.delete(`${APIPath}/nfts/`, { data: params });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }
    }

    static async add(nft: NFT) {
        try {
            const response = await axios.post(`${APIPath}/nfts/`, nft.toFormData());
            return response.status === 201;
        }
        catch (e) {
            return false;
        }
    }
}

export default NFTHelper;

import {APIPath} from "../VARIABLES";
import NFTCollectionCategory from '../objects/NFTCollectionCategory';
import axios from 'axios';

class NFTCollectionCategoryHelper {

    static async find(name: string) {
        const response = await axios.get(`${APIPath}/categories/`, { params: {name }});
        const data = await response.data;
        if (data.length === 0) {
            return false;
        }
        const category: NFTCollectionCategory = new NFTCollectionCategory(data[0]);
        return category;
    }

    static async findMany(params: Object) {
        const response = await axios.get(`${APIPath}/categories/`, { params });
        const data = await response.data;
        let categories: NFTCollectionCategory[] = [];
        for (let i = 0; i < data.length; i++) {
            categories.push(new NFTCollectionCategory(data[i]));
        }
        return categories;
    }

    static async deleteMany(params: Object) {
        try {
            const response = await axios.delete(`${APIPath}/categories/`, { data: params });
            return response.status === 200;
        }
        catch (e) {
            return false;
        }
    }

    static async add(category: NFTCollectionCategory) {
        try {
            const response = await axios.post(`${APIPath}/categories/`, category);
            return response.status === 201;
        }
        catch (e) {
            return false;
        }
    }
}

export default NFTCollectionCategoryHelper;
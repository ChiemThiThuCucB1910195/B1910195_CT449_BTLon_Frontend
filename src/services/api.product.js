import axios from "axios";
const url = "/api/product";

export default class API{
    // get all the post from the server
    static async getAllProduct(){
        const res = await axios.get(url);
        return res.data;
    }

    // get single post by id
    static async getProductById(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // insert post into database
    static async addProduct(post){
        const res = await axios.post(url, post);
        // console.log(res);
        return res.data;
    }

    // update post into database
    static async updateProduct(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }

     // delete post into database
    static async deleteProduct(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
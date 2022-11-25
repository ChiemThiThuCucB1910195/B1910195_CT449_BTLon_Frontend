import axios from "axios";
const url = "/api/category";

export default class API{
    // get all the post from the server
    static async getAllCategory(){
        const res = await axios.get(url);
        return res.data;
    }

    // get single post by id
    static async getCategoryById(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // insert post into database
    static async addCategory(post){
        const res = await axios.post(url, post);
        return res.data;
    }

    // update post into database
    static async updateCategory(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        // console.log(id);
        return res.data;
    }

     // delete post into database
    static async deleteCategory(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
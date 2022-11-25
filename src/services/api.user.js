import axios from "axios";
const url = "/api/user";

export default class API{
    // get all the post from the server
    static async getAllUser(){
        const res = await axios.get(url);
        return res.data;
    }

    // get single post by id
    static async getUserById(id){
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // insert post into database
    static async createUser(post){
        const res = await axios.post(url, post);
        return res.data;
    }

    // update post into database
    static async updateUser(id, post){
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }

     // delete post into database
    static async deleteUser(id){
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}
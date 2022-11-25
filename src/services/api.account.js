import axios from "axios";
const url = "/api/account";

export default class API {
  // get all the post from the server
  static async getAllAccount() {
    const res = await axios.get(url);
    return res.data;
  }

  // get single post by id
  static async getAccountByEmailPassword(email, password) {
    const res = await axios.get(`${url}?email=${email}&password=${password}`);
    return res.data;
  }

  // get single post by id
  static async getAccountById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }

  // insert post into database
  static async addAccount(post) {
    const res = await axios.post(url, post);
    return res.data;
  }

  // update post into database
  static async updateAccount(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    // console.log(id);
    return res.data;
  }

  // delete post into database
  static async deleteAccount(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}

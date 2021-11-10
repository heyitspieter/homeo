import Api from "src/apis";
import axios from "src/libs/axios";

class ListingApi extends Api {
  constructor(req) {
    super(req, "/listings");
  }

  async createListing(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/new`, data, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getUserListings() {
    try {
      const res = await axios.get(`${this.apiUrl}/me`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getImage(id) {
    try {
      const res = await axios.get(`/images/${id}`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getListing(id) {
    try {
      const res = await axios.get(`${this.apiUrl}/${id}`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getAllListings() {
    try {
      const res = await axios.get(this.apiUrl, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default ListingApi;

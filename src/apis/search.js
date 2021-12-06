import Api from "src/apis";
import axios from "src/libs/axios";

class SearchApi extends Api {
  constructor(req) {
    super(req, "/search");

    this.lockId = Math.floor(1000 + Math.random() * 9000);
  }

  async searchListings(address, filter) {
    try {
      const res = await axios.get(
        `${this.apiUrl}?addr=${address}&filter=${filter}`
      );
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async applyFilters(addr, filter) {
    try {
      const res = await axios.post(
        `${this.apiUrl}/filter?addr=${addr}`,
        filter
      );
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default SearchApi;

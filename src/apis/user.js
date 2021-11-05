import Api from "src/apis";
import axios from "src/libs/axios";

class UserApi extends Api {
  constructor(req) {
    super(req, "/users");
  }

  async getUser() {
    try {
      const res = await axios.get(`${this.apiUrl}/me`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default UserApi;

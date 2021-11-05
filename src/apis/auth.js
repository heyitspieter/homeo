import Api from "src/apis";
import axios from "src/libs/axios";

class AuthApi extends Api {
  constructor(req) {
    super(req, "/auth/user");
  }

  async login(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/login`, data);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async register(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/register`, data);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getSession() {
    try {
      const res = await axios.get(`${this.apiUrl}/session`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async signout() {
    try {
      const res = await axios.post(`${this.apiUrl}/signout`, null, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default AuthApi;

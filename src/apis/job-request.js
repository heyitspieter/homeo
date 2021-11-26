import Api from "src/apis";
import axios from "src/libs/axios";

class JobRequestApi extends Api {
  constructor(req) {
    super(req, "/job-request");
  }

  async submit(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/new`, data);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default JobRequestApi;

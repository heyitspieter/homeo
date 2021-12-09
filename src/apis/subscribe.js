import Api from "src/apis";
import axios from "src/libs/axios";

class PreviewApi extends Api {
  constructor(req) {
    super(req, "/subscribers");
  }

  async subscribe(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/new`, data);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default PreviewApi;

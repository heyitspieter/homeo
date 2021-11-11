import axios from "axios";
import Api from "src/apis";

class PreviewApi extends Api {
  constructor(req) {
    super(req, "/api/v1/preview");
  }

  async endSession() {
    try {
      const res = await axios.post(`${this.apiUrl}/clear`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default PreviewApi;

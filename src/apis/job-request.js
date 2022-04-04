import Api from "src/apis";
import axios from "src/libs/axios";

class JobRequestApi extends Api {
  constructor(req) {
    super(req, "/job-requests");
  }

  async submit(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/new`, data);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async verifyPayment(transaction) {
    const tx = JSON.parse(transaction);
    
    try {
      const res = await axios.get(`${this.apiUrl}/payment/verify`, {
        params: {
          tx_ref: tx.tx_ref,
          status: tx.status,
          transaction_id: tx.transaction_id,
        },
      });
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default JobRequestApi;

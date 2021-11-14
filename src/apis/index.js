import { setCustomHeaders, setCookieHeaders } from "src/helpers";

let endpoints = ["POST", "PATCH", "DELETE", "PUT"];

class Api {
  constructor(req, path) {
    this.csrf = false;
    this.config = {};
    this.customHeaders = {};

    if (req) {
      this.config = setCookieHeaders(req);

      if (endpoints.includes(req.method)) {
        this.customHeaders = setCustomHeaders(req);
      }

      if (this.customHeaders.headers && this.config.headers) {
        this.config = {
          ...this.config,
          headers: { ...this.config.headers, ...this.customHeaders.headers },
        };
      }
    }

    this.apiUrl = path;

    this.resolve = (data) => Promise.resolve(data);
    this.reject = (err) => Promise.reject(err);
  }
}

export default Api;

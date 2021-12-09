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

  async updateListing(id, data) {
    try {
      const res = await axios.patch(`${this.apiUrl}/${id}/update`, data, this.config);
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
      const res = await axios.get(`${this.apiUrl}/_lId/${id}`, this.config);
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

  async verifyPreviewToken(token) {
    try {
      const res = await axios.post(`${this.apiUrl}/preview/verify`, { token });
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getListingPreview(id) {
    try {
      const res = await axios.get(`${this.apiUrl}/preview/listing/${id}`);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getListingImages(id) {
    try {
      const res = await axios.get(`${this.apiUrl}/${id}/images`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async uploadImage(image) {
    try {
      const res = await axios.patch(
        `${this.apiUrl}/upload`,
        image,
        this.config
      );
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getStates() {
    try {
      const res = await axios.get(`${this.apiUrl}/states`, this.config);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getFeaturedListings() {
    try {
      const res = await axios.get(`${this.apiUrl}/featured`);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }

  async getLikes(data) {
    try {
      const res = await axios.post(`${this.apiUrl}/likes`, data);
      return [res.data, null];
    } catch (err) {
      return [null, err];
    }
  }
}

export default ListingApi;

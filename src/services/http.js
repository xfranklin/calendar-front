import axios from "axios";
import { ref } from "vue";

const HttpStatus = {
  UNAUTHORIZED: 401
};

export class HttpService {
  constructor() {
    this._axios = axios.create({
      baseURL: import.meta.env.VITE_API
    });
    this._axios.interceptors.response.use(
      HttpService.responseInterceptor.bind(this),
      HttpService.errorInterceptor.bind(this)
    );
  }

  static async errorInterceptor({ config, response }) {
    if (config?.headers?.TYPE !== "REFRESH" && response?.status === HttpStatus.UNAUTHORIZED) {
      const { statusCode } = await this.refresh();
      if (statusCode === 401) {
        // logout
        return response?.data;
      }
      config._retry = true;
      return await this._axios(config);
    }
    return response?.data;
  }

  static responseInterceptor(response) {
    return response;
  }

  async refresh() {
    return await this._axios.get("/auth/refresh", {
      headers: {
        TYPE: "REFRESH"
      }
    });
  }

  async get(url) {
    return await this._axios.get(url);
  }

  async post(url, body) {
    return await this._axios.post(url, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

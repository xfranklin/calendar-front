import axios from "axios";
import { $notification } from "@/components/base/feedback/notification/notification";
import { i18n } from "@/configs/i18n";

const HttpStatus = {
  UNAUTHORIZED: 401,
  SERVER_ERRORS: [500, 501, 502, 503, 504],
  BAD_REQUEST: [400]
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
    this.notification = $notification;
    this.t = i18n.global.t;
  }

  static async errorInterceptor({ config, response }) {
    if (config?.headers?.TYPE !== "REFRESH" && response?.status === HttpStatus.UNAUTHORIZED) {
      const { statusCode } = await this.refresh();
      if (statusCode === 401) {
        // TODO redirect to login
        return response?.data;
      }
      config._retry = true;
      return await this._axios(config);
    }

    if (HttpStatus.SERVER_ERRORS.includes(response.status)) {
      this.notification({
        type: "error",
        duration: "none",
        message: this.t("SERVER_ERROR")
      });
    }

    if (config.headers.VALIDATE && HttpStatus.BAD_REQUEST.includes(response.status) && response?.data?.message) {
      const errorMessage = Array.isArray(response.data.message) ? response.data.message[0] : response.data.message;
      this.notification({
        type: "error",
        duration: 5000,
        message: this.t(errorMessage)
      });
    }

    return response?.data;
  }

  static responseInterceptor(response) {
    return response?.data || response;
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

  async post(url, body, validate = false) {
    return await this._axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        ...(validate && { VALIDATE: true })
      }
    });
  }
}

import axios from "axios";
import Cookies from "universal-cookie";
import { navigate } from "gatsby";

export default class UserService {
  static hostUrl = "https://games.kraftylab.com:3001/user";
  static cookies = new Cookies();
  static headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Headers": "content-type",
  };

  static getUrl() {
    return this.hostUrl;
  }

  static getHeaders() {
    return this.headers;
  }

  static async startForgotPassword(obj) {
    try {
      const res = await axios.post(
        `${this.hostUrl}/start-forgot-password`,
        obj,
        {
          headers: this.headers,
        }
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async registerUser(obj) {
    try {
      const res = await axios.post(this.hostUrl, obj, {
        headers: this.headers,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    }
  }

  static async loginUser(obj) {
    try {
      const res = await axios.post(`${this.hostUrl}/login`, obj, {
        headers: this.headers,
      });
      this.cookies.set("access", res.data.accessToken, { path: "/" });
      this.cookies.set("refresh", res.data.refreshToken, { path: "/" });
      return res.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    }
  }

  static async verifyUser(obj) {
    try {
      const res = await axios.post(`${this.hostUrl}/validate-email`, obj, {
        headers: this.headers,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    }
  }

  static async getAllUsers(startDate = "", endDate = "") {
    try {
      let url = `${this.hostUrl}`;
      const res = await axios.get(
        `${url}?startdate=${startDate}&enddate=${endDate}`,
        {
          headers: {
            ...this.headers,
            access: this.cookies.get("access"),
            refresh: this.cookies.get("refresh"),
          },
        }
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async confirmPassword(obj) {
    try {
      const res = await axios.post(
        `${this.hostUrl}/complete-forgot-password`,
        obj,
        {
          headers: this.headers,
        }
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    }
  }

  static async validateToken() {
    try {
      const res = await axios.post(
        `${this.hostUrl}/validate-token`,
        {},
        {
          headers: {
            ...this.headers,
            access: this.cookies.get("access"),
            refresh: this.cookies.get("refresh"),
          },
        }
      );
      return res.data;
    } catch (error) {
      return false;
    }
  }
}

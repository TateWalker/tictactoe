import axios from "axios";
import Cookies from "universal-cookie";
export default class TicTacToeService {
  static hostUrl = "http://localhost:3001/game"; //local url
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

  static getEmptyBoard = () => {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };

  static async createGame(obj) {
    try {
      obj["board"] = this.getEmptyBoard();
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

  static async getLeaderboard() {
    try {
      const res = await axios.get(`${this.hostUrl}/leaderboard`, {
        headers: this.headers,
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getIcebreakerCategories() {
    try {
      const res = await axios.get(`${this.hostUrl}/categories`, {
        headers: {
          ...this.headers,
          access: this.cookies.get("access"),
          refresh: this.cookies.get("refresh"),
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getIcebreakerSubCategories(category) {
    try {
      const res = await axios.get(`${this.hostUrl}/subcategories`, {
        params: { category: category },
        headers: {
          ...this.headers,
          access: this.cookies.get("access"),
          refresh: this.cookies.get("refresh"),
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getRandomIcebreaker() {
    try {
      const res = await axios.get(`${this.hostUrl}`, {
        headers: {
          ...this.headers,
          access: this.cookies.get("access"),
          refresh: this.cookies.get("refresh"),
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getIcebreakerByCatSubCat(category, subcategory) {
    try {
      let url = `${this.hostUrl}/category?category=${category}`;
      if (subcategory) {
        url += `&subcategory=${subcategory}`;
      }
      const res = await axios.get(url, {
        headers: {
          ...this.headers,
          access: this.cookies.get("access"),
          refresh: this.cookies.get("refresh"),
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async finishGame(code, winner) {
    try {
      let url = `${this.hostUrl}`;
      const data = { code: code, winner: winner };
      const res = await axios.put(url, data, {
        headers: this.headers,
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateGame(code, board, user, opponent) {
    try {
      let url = `${this.hostUrl}`;
      const data = { code: code, board: board, user1: user, user2: opponent };
      const res = await axios.put(url, data, {
        headers: this.headers,
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

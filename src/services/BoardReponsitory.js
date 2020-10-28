import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/board";

class BoardReponsitory {
  getAllBoard() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }
}
export default new BoardReponsitory();

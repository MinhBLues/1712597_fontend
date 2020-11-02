import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/board";

class BoardReponsitory {
  getAllBoard() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }

  create(title) {
    return axios.post(API_URL + '/create',
    {
      title
    },
    {
      headers: authHeader(),
    });
  }
}
export default new BoardReponsitory();
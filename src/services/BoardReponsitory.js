import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/board";
// const API_URL = "http://localhost:8080/board";

class BoardReponsitory {
  getAllBoard() {
    return axios.get(API_URL, {
      headers: authHeader(),
    });
  }

  getBoardById(id){
    return axios.get(API_URL + `/${id}`,{
      headers: authHeader(),
    })
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

  updateTitle(id, title)
  {
    return axios.patch(API_URL + `/${id}/update`,
    {
      title
    },
    {
      headers: authHeader(),
    });
  }

  delete(id) {
    return axios.delete(API_URL + `/${id}/delete`,
    {
      headers: authHeader(),
    });
  }
}
export default new BoardReponsitory();
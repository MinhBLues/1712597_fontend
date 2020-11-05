import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/auth/";

class Auth {

  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          const data = {
            user:{
              username:response.data.user.username,
              display_name:response.data.user.display_name,
            },
            accessToken: response.data.accessToken,
          }
          localStorage.setItem("user", JSON.stringify(data));
          // console.log(response.data)
        }
        return response.data;
      });
  }

  logout(){
      localStorage.removeItem("user");
  }

  register(display_name, username, password) {
    return axios.post(API_URL + "signup", {
      display_name,
      username,
      password,
    });
  }

  update(display_name, username, password) {
    return axios.post(API_URL + "update", {
      display_name,
      username,
      password,
    },
    {
      headers: authHeader(),
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new Auth();
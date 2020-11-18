import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/auth/";
// const API_URL = "http://localhost:8080/auth/";


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
            user: {
              id: response.data.user.id,
              username: response.data.user.username,
              display_name: response.data.user.display_name,
              flag: response.data.user.googleId ? false : true

            },
            accessToken: response.data.accessToken,
          }
          localStorage.setItem("user", JSON.stringify(data));
        }
        return response.data;
      });
  }

  googleLogin(username, googleId){
    return axios
      .post(API_URL + "google/signin", {
        username,
        googleId,
      })
      .then((response) => {
        if (response.data) {
          const data = {
            user: {
              id: response.data.user.id,
              username: response.data.user.username,
              display_name: response.data.user.display_name,
              flag: response.data.user.googleId ? false : true
            },
            accessToken: response.data.accessToken,
          }
          localStorage.setItem("user", JSON.stringify(data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(display_name, username, password,googleId) {
    return axios.post(API_URL + "signup", {
      display_name,
      username,
      password,
      googleId
    }).then((response) => {
      if (response.data) {
        const data = {
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            display_name: response.data.user.display_name,
            flag: response.data.user.googleId ? false : true
          },
          accessToken: response.data.accessToken,
        }
        localStorage.setItem("user", JSON.stringify(data));
      }
      return response.data;
    });
  }

  update(display_name, old_password, new_password) {
    return axios.post(API_URL + "update", {
      display_name,
      old_password,
      new_password,
    }, {
      headers: authHeader(),
    });
  }

  getUser() {
    return axios.get(API_URL + "getUser", {
      headers: authHeader(),
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new Auth();
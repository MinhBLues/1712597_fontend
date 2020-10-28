import axios from "axios";

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
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data)
        }
        return response.data;
      });
  }

  logout(){
      localStorage.removeItem("user");
  }

  register(name, email, password, repeat_password) {
    return axios.post(API_URL + "signup", {
      name,
      email,
      password,
      repeat_password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
export default new Auth();
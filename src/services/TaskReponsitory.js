import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/tasks";
// const API_URL = "http://localhost:8080/tasks";

class TaskReponsitory {

    create(userCreateId, description, boardId, status) {
        return axios.post(API_URL + '/create', {
            userCreateId,
            description,
            boardId,
            status
        }, {
            headers: authHeader(),
        });
    }

    update(id, description, status, num_like) {
        return axios.patch(API_URL + `/${id}/update`, {
            description,
            status,
            num_like
        }, {
            headers: authHeader(),
        });
    }

    updateStatus(id, status) {
        return axios.patch(API_URL + `/${id}/updateStatus`, {
            status,
        }, {
            headers: authHeader(),
        });
    }

    delete(id) {
        return axios.delete(API_URL + `/${id}/delete`, {
            headers: authHeader(),
        });
    }
}
export default new TaskReponsitory();
import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "https://api-1712597-backend.herokuapp.com/tasks";

class TaskReponsitory {

    create(userCreateId, description, boardId) {
        return axios.post(API_URL + '/create', {
            userCreateId,
            description,
            boardId
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

    delete(id) {
        return axios.delete(API_URL + `/${id}/delete`, {
            headers: authHeader(),
        });
    }
}
export default new TaskReponsitory();
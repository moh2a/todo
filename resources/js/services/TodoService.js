import axios from 'axios'
const url = '/api/todos';
export default {

    store(todo) {
        console.log("objet", todo)
        return axios.post(url, todo);
    },
    getItems(todo) {
        return axios.get(url);
    },
    update(todo) {
        return axios.put(url + '/' + todo.id, todo);
    },
    delete(id) {
        return axios.delete(url + '/' + id);
    }
}
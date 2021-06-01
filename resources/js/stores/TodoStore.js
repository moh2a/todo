import Vue from "vue";
import Vuex, { Store } from "vuex";
import TodoService from "../services/TodoService";
Vue.use(Vuex);

const state = {
    items: []
};
const mutations = {
    ADD_TODO: (state, todo) => {
        state.items.push(todo);
    },
    INIT_TODO: (state, todos) => {
        state.items = todos;
    },
    EDIT_TODO: (state, todo) => {
        let item = state.items.find(item => item.id == todo.id);
        item = todo;
    },
    DELETE_TODO: (state, todo) => {
        state.items = state.items.filter(item => item.id != todo.id);
    }
};
const getters = {
    todos: state => state.todos,
    finishedItems: state =>
        state.items.filter(todo => todo.statut == "Terminée"),
    remainingItems: state =>
        state.items.filter(todo => todo.statut == "En cours"),

    remainingItemsCount: state => getters.remainingItems(state).length,
    finishedItemsCount: state => getters.finishedItems(state).length,
    todosInEvent: state => {
        let events = [];
        for (var todo of state.items) {
            let color = todo.statut == "Terminée" ? "green" : "orange";
            let event = {
                name: todo.nom,
                start: todo.date,
                end: todo.date,
                color: color,
                timed: false
            }
            events.push(event);
        }
        return events;
    },
};
const actions = {
    getTodos: store => {
        TodoService.getItems()
            .then(response => {
                store.commit("INIT_TODO", response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },
    update: (store, todo) => {
        TodoService.update(todo)
            .then(response => {
                store.commit("EDIT_TODO", todo);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    },
    finishTodo: (store, id) => {
        let todo = state.items.find(item => item.id == id);
        todo.statut = "Terminée";
        TodoService.update(todo)
            .then(response => {
                store.commit("EDIT_TODO", todo);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    },
    remainingTodo: (store, id) => {
        let todo = state.items.find(item => item.id == id);
        todo.statut = "En cours";
        TodoService.update(todo)
            .then(response => {
                store.commit("EDIT_TODO", todo);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    },
    deleteTodo: (store, todo) => {
        TodoService.delete(todo.id)
            .then(response => {
                store.commit("DELETE_TODO", todo);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    },
    add: (store, todo) => {
        TodoService.store(todo)
            .then(response => {
                store.commit("ADD_TODO", todo);
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    }
};
export default new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
});
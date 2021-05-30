import Vue from "vue";
import VueRouter from "vue-router";
import CreateToDo from "../components/pages/CreateToDo.vue";
import Home from "../components/pages/Home.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", alias: "/Home", name: "Home", component: Home },
    { path: "/Creation", component: CreateToDo }
];

const router = new VueRouter({
    routes
});

export default router;
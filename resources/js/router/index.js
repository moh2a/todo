import Vue from "vue";
import VueRouter from "vue-router";
import CreateToDo from "../components/pages/CreateToDo.vue";
import Home from "../components/pages/Home.vue";
import Planning from "../components/pages/Planning.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", alias: "/Home", name: "Home", component: Home },
    { path: "/Creation", component: CreateToDo },
    { path: "/Planning", component: Planning }
];

const router = new VueRouter({
    routes
});

export default router;
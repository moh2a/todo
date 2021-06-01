<template>
    <v-app id="inspire">
        <v-app id="inspire">
            <v-navigation-drawer  v-model="drawer" app>
                <v-list >
                    <v-list-item  link to="/Home">
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  link to="/Creation">
                        <v-list-item-action>
                            <v-icon>mdi-clipboard-list</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Todo</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  link to="/Planning">
                        <v-list-item-action>
                            <v-icon>mdi-calendar</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Planning</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar app color="indigo" dark dense>
                <v-app-bar-nav-icon
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>
                <v-toolbar-title
                    ><router-link class="linkStyleLess" to="/Home"
                        >Todo application</router-link
                    ></v-toolbar-title
                >
            </v-app-bar>

            <v-main>
                <router-view></router-view>
            </v-main>
            <v-footer color="indigo" app>
                <span class="white--text"
                    >&copy; {{ new Date().getFullYear() }}</span
                >
            </v-footer>
        </v-app>
    </v-app>
</template>

<script>
import CreateToDo from "./pages/CreateToDo";
export default {
    name: "App",
    components: {
        CreateToDo
    },
    mounted() {
        console.log("Component mounted .");
    },
    data: () => ({
        drawer: false
    }),
    props: {
        source: String
    }
};
</script>
<style scoped>
.linkStyleLess {
    text-decoration: none;
    color: inherit;
}
</style>

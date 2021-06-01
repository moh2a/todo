<template>
    <v-container fluid>
        <v-row align="center" justify="center" class="text-center">
            <v-col cols="12" sm="6">
                <v-card
                    elevation="2"
                    outlined
                    @drop="onDropRemaining($event)"
                    @dragover.prevent
                    @dragenter.prevent
                >
                    <v-list two-line>
                        <v-subheader
                            >A réaliser : {{ remainingItemsCount }}
                            <v-icon color="orange" medium>mdi-loading</v-icon>
                        </v-subheader>

                        <v-list-item
                            v-for="item in remainingItems"
                            :key="item.id"
                        >
                            <v-list-item-content
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                                class="text-left"
                            >
                                <v-list-item-title
                                    v-text="item.nom"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                    v-text="item.date"
                                ></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card
                    elevation="2"
                    outlined
                    @drop="onDropFinished($event)"
                    @dragover.prevent
                    @dragenter.prevent
                >
                    <v-list two-line>
                        <v-subheader
                            >Terminée : {{ finishedItemsCount }}
                            <v-icon color="success" medium>mdi-check</v-icon>
                            </v-subheader
                        >
                        <v-list-item
                            v-for="item in finishedItems"
                            :key="item.id"
                        >
                            <v-list-item-content
                                class="text-left"
                                draggable="true"
                                @dragstart="startDrag($event, item)"
                            >
                                <v-list-item-title
                                    v-text="item.nom"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                    v-text="item.date"
                                ></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon v-on:click="deleteTodo(item)">
                                    <v-icon color="accent">mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TodoService from "../../services/TodoService";
import TodoStore from "../../stores/TodoStore";
import Vuex from "vuex";
export default {
    store: TodoStore,
    name: "ToDoList",
    mounted() {
        this.$store.dispatch("getTodos");
    },
    data: () => ({
        selectedItem: null
        //items: []
    }),
    computed: {
        ...Vuex.mapGetters([
            "todos",
            "remainingItemsCount",
            "finishedItemsCount",
            "finishedItems",
            "remainingItems"
        ])
    },
    methods: {
        ...Vuex.mapActions([
            "add",
            "edit",
            "update",
            "deleteTodo",
            "finishTodo",
            "remainingTodo"
        ]),
        startDrag(ev, item) {
            ev.dataTransfer.dropEffect = "move";
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.setData("id", item.id);
        },
        onDropFinished(ev, items) {
            let id = ev.dataTransfer.getData("id");
            this.finishTodo(id);
        },
        onDropRemaining(ev, items) {
            let id = ev.dataTransfer.getData("id");
            this.remainingTodo(id);
        }
    },
    props: []
};
</script>

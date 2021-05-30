<template>
<div>
    <v-form v-model="valid">
        <v-container>
            <v-row align="center" justify="center" class="text-center">
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="nom"
                        :rules="nameRules"
                        :counter="255"
                        label="nom de la tâche"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" class="text-center">
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateFormatted"
                                label="Date de la tâche"
                                prepend-icon="mdi-calendar"
                                @blur="date = parseDate(dateFormatted)"
                                v-bind="attrs"
                                :rules="dateRules"
                                v-on="on"
                                readonly
                                required
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            locale="fr-Fr"
                            @input="menu2 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4" class="text-center">
                    <v-btn :disabled="!valid" color="success" @click="validate">
                        Enregistrer
                    </v-btn>
                </v-col>
            </v-row>

            
        </v-container>
    </v-form>
        <v-container fluid>
            <v-row align="center" justify="center" class="text-center">
                <v-col>
                    <ToDoList/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TodoService from "../../services/TodoService";
import TodoStore from "../../stores/TodoStore";
import Vuex from "vuex";
import ToDoList from './ToDoList'
export default {
    store: TodoStore,
    name: "CreateToDo",
    components: {ToDoList},
    mounted() {},
    data: vm => ({
        valid: false,
        nom: "",
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        nameRules: [
            v => !!v || "Le nom de la tâche est nécessaire",
            v => v.length <= 255 || "Le nom ne doit pas dépasser 255 caractères"
        ],
        dateRules: [v => !!v || "La date de la tâche est nécessaire"]
    }),
    props: [],
    methods: {
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${month}/${day}/${year}`;
        },
        formatDateToMysql(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${month}/${day}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [month, day, year] = date.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        },
        ...Vuex.mapActions(['add','edit','update','delete']),
        validate() {
            let toDo = {
                nom: this.nom,
                date: new Date(this.dateFormatted).toISOString().substr(0, 10),
                statut: "En cours"
            };
            this.add(toDo)
            /*TodoService.store(toDo)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    // handle error
                    console.error(error);
                });*/
        }
    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date);
        }
    },

    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        }
    }
};
</script>

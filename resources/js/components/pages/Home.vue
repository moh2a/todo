<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <router-link class="linkStyleLess" to="/creation"
          ><v-btn elevation="24" text>Todo</v-btn></router-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  mounted() {},
  data: () => ({}),
  props: [],
};
</script>
<style scoped>
.linkStyleLess {
    text-decoration: none;
    color: inherit;
}
</style>
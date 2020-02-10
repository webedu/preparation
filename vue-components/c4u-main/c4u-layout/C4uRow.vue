<template class="self">
  <div class="c4uRow">
   <b-container>
   <b-row>
      <slot /> 
  </b-row>
  </b-container>
</template>

<style scoped>
  .c4uRow {
  }
</style>

<script>
  import Vue from "vue";
  import Bootstrap from "bootstrap";
  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
  Vue.use(BootstrapVue);
  Vue.use(IconsPlugin);
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
    data: function() {
           return {}
        },
  }
</script>

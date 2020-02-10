<template class="self">
  <div class="c4uCol">
    <b-col cols="5">
      <slot />
    </b-col>
  </div>
</template>

<style scoped>
  .c4uCol {
  }
</style>

<script>
  import Vue from "vue";
  import Bootstrap from "bootstrap";
//  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  Vue.use(BootstrapVue);
//  Vue.use(IconsPlugin);
  import "bootstrap/dist/css/bootstrap.css";
//  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
    data: function() {
           return {}
        },
  }
</script>

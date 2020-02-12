<template class="self">
  <div class="c4uCol">
    <slot /> 
  </div>
</template>

<style scoped>
  .c4uCol {
    flex: 0 0 41%;
    max-width: 41%;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>

<script>
//  import Vue from "vue";
  import C4uGlue from "c4u-glue";
//  import Bootstrap from "bootstrap";
//  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  Vue.use(BootstrapVue);
//  Vue.use(IconsPlugin);
//  import "bootstrap/dist/css/bootstrap.css";
//  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
    mixins: [C4uGlue],
    data: function() {
           return {
             c4uParentTag: "c4u-row",
           }
        },
  }
</script>

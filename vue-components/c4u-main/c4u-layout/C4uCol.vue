<template class="self">
  <div class="c4uCol">
    <link 
      v-for="(href, key) in globalCss" 
      v-bind:key="key"
      rel="stylesheet"  
      v-bind:href="href" 
      type="text/css" 
    > 
    <div class="col-lg-3 col-md-4">
      <slot /> 
    </div> 
  </div> 
</template>

<style scoped>
</style>

<script>
//  import Vue from "vue";
  import C4uGlue from "c4u-glue";
  import C4uCss from "c4u-css";
//  import Bootstrap from "bootstrap";
//  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  Vue.use(BootstrapVue);
//  Vue.use(IconsPlugin);
//  import "bootstrap/dist/css/bootstrap.css";
//  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
    mixins: [C4uCss, C4uGlue],
    mounted() {
             // eslint-disable-next-line no-console
             console.log("col");
    },
  }
</script>

<template class="self">
  <div 
    ref="c4uRow" 
    class="c4uRow"
  >
    <div class="c4uRow2">
      <slot /> 
    </div>
  </div> 
</template>

<style scoped>
  .c4uRow {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-left: auto;
    margin-right: auto;
    background-color: red;
  }
  .c4uRow2 {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
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
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            c4uCurrentPage: null,
            }
        },
    mounted() {
      var rowElem = this.$refs.c4uRow;
      rowElem.addEventListener("resize", this.rowResize);
      window.addEventListener("resize", this.windowResize);
    },
  beforeDestroy() {
      var rowElem = this.$refs.c4uRow;
      rowElem.removeEventListener("resize", this.rowResize);
      window.removeEventListener("resize", this.windowResize);
  },
    methods: { 
       windowResize: function () {
           // eslint-disable-next-line no-console
           console.log('window resize happened in c4u-row');
         },
       rowResize: function () {
           // eslint-disable-next-line no-console
           console.log('row resize happened in c4u-row');
         },
       },
    



  }
</script>

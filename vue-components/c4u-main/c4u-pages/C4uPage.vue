<template class="self">
  <div 
    v-show="pageVisible"
    class="c4uPage" 
    v-bind:class="pageDirection" 
  >
    <link 
      v-for="(href, key) in globalCss" 
      v-bind:key="key"
      rel="stylesheet"  
      v-bind:href="href" 
      type="text/css" 
    > 
    <slot /> 
  </div> 
</template>

<style scoped>
  * { w2idth:100%; 
      d2isplay: inline-block;
    }
  .c4uPage {
    p2osition: absolute;
    w2idth:100%;
    l2eft: 0%;
    t2op: 200px;
  }
</style>

<script>
  import C4uCss from "c4u-css";
  import C4uGlue from "c4u-glue";
 
  export default {
    mixins: [C4uCss, C4uGlue], 
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            pageVisible: false,
            pageDirection: "c4uFast"
            }
        },
    updated() {
         if (this.c4uParent && !this.c4uParent.c4uCurrentPage) {
            this.c4uParent.c4uCurrentPage = this;
            this.pageVisible = true; 
         } 
    },
    methods: { 
       hide: function() {this.pageVisible = false; },
       show: function() {this.pageVisible = true; },
       addOne: 
         /*eslint no-unused-vars: ["error", { "args": "none" }]*/
         function(event) {
          this.counter += 1;
          if (this.c4uParent) {
            this.c4uParent.counter += 100;
          }
       },
    },

  }
</script>

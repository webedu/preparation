<template>  
  <div class="c4uPageSelect">
    <slot />
  </div>
</template>

<style scoped>
  .elemSecond {
    background: green;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    mixins: [C4uGlue], 
//    props: ['msg'],
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            counter: 0,
            }
        },

    methods: { 
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

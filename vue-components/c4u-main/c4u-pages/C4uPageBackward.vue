<template>  
  <button 
    v-bind:disabled="buttonDisabled" 
    class="c4uPageBackward" 
    @click="c4uPageBackward"
  >
    <slot />
  </button>
</template>

<style scoped>
  .c4uPageBackward {
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    mixins: [C4uGlue], 
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            buttonDisabled: true,
            }
        },
    updated() {
         this.updateDisableStatus();
    },
    methods: { 
       c4uPageBackward: 
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        function(event) {
         if (this.c4uParent) {  
           this.c4uParent.previousPage(); 
           //this.updateDisableStatus();
         }
       },
       updateDisableStatus: function() {
         if (this.c4uParent && this.c4uParent.previousPageExists()) {
            this.buttonDisabled = false; 
         } else {
            this.buttonDisabled = true; 
         }
       } 
    },


  }
</script>

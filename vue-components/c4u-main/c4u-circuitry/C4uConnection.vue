<template class="self">
  <span class='c4uConnection' v-bind:class="pageDirection" v-show="pageVisible">
  <slot></slot> 
  </span> 
</template>

<style scoped>
  .c4uConnection {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    props: {source: String, target: String},
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry"
            }
        },
    mixins: [C4uGlue], 
    methods: { 

    },
    created() {
         console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
    },
    updated() {
         console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

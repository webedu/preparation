<template class="self">
  <span class='c4uPlugIn'>
  <slot></slot> 
  </span> 
</template>

<style scoped>
  .c4uPlugIn {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    props: {name: String, value: Number},
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry",
            c4uOldValue: null
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       changePlugIn: function(value) {
          this.value = value;
          if(this.value != this.c4uOldValue) {
             this.c4uOldValue = this.value;
             //change-event ??? sync ??
             this.$emit('c4u-plugin-changed', this.name, this.value);
         }
       }
    },
    created() {
         console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
         this.changePlugIn(this.value); 
    },
    updated() {
         console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

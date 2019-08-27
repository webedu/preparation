<template class="self">
  <span class='c4uIn'>
  <p v-text="this.value">.</p>
  <slot></slot> 
  </span> 
</template>

<style scoped>
  .c4uIn {  }
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
       changeInValue: function(value) {
          this.value = value;
          if(this.value != this.c4uOldValue) {
             this.c4uOldValue = this.value;
             //change-event ??? sync ??
             this.$emit('c4u-in-value-changed', this.name, this.value);
         }
       }
    },
    created() {
         console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
         this.changeInValue(this.value); 
    },
    updated() {
         console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

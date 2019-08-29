<template class="self">
  <span class='c4uOut'>
  <p>{{this.value}}o</p>
  <slot></slot> 
  </span> 
</template>

<style scoped>
  .c4uOut {  } 
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
    watch: {
       value: function (newValue) {
           this.outValueChanged(newValue);
           
       }
    },
    methods: { 
        outValueChanged: function (newValue) {
         if(newValue != this.c4uOldValue) {
           
           this.c4uOldValue = newValue;

           // this.value = newValue; // not needed
           if (this.c4uParent) {  
            console.log("output value has changed "+newValue+ " / "+this.value);
             this.c4uParent.outValueChanged(this.name, newValue); 
           }
         }
        }
    },
    created() {
         //console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         //console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
         this.outValueChanged(this.value);
    },
    updated() {
         //console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         //console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

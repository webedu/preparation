<template class="self">
  <span class='c4uOut'>
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
            c4uOldValue: null,
            c4uAllConnectedIns: []
            }
        },
    mixins: [C4uGlue], 
    watch: {
       value: function (newValue) {
           this.outValueChanged(parseFloat(newValue));
           
       }
    },
    methods: { 
        outValueChanged: function (newValue) {
         if(newValue != this.c4uOldValue) {
           this.c4uOldValue = newValue;
           // this.value = newValue; // not needed
           // if connection list exists use direct connection....
           // maybe use kind of cache timeout to reconnect (if new connections had been added) 
           // or reset the inCache when connection is modified/mounted...
           if(this.c4uAllConnectedIns && this.c4uAllConnectedIns.length>0) {
             for(var i=0; i<this.c4uAllConnectedIns.length; i++) { 
                this.c4uAllConnectedIns[i].changeInValue(newValue);
             }             
           } else {
             if (this.c4uParent) {  
               //console.log("output value has changed "+newValue+ " / "+this.value);
               this.c4uParent.outValueChanged(this.name, newValue, this); 
             }
           }
         }
        },
        addConnectedIn(inPlug) {
          //console.log("ENtry received "+child.c4uParentId+" / "+ this.c4uUid+" / "+ child.c4uUid);
          this.c4uAllConnectedIns.push(inPlug);
        } 
    },
    mounted() {
         //console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
         this.outValueChanged(this.value);
    }
  }
</script>

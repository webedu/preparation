<template class="self">
  <span class='c4uCircuitry'>
  <slot></slot> 
  </span> 
</template>

<style scoped>
  .c4uCircuitry { }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            c4uAllConnections: [],
            c4uAllPlugsIn: [], 
            //c4uAllPlugsOut: [], 
            }
        },
    mixins: [C4uGlue], 
    methods: { 
      plugOutChanged: function (name, value) {
         for(var i=1; i<this.c4uAllConnections.length; i++) { 
            if(this.c4uAllConnections[i].source == name) {
                var target = this.c4uAllConnections[i].target;
                this.changePlugIn(target, value);
            } 
         }
       },
      changePlugin: function(name, value) {
          for(var i=1; i<this.c4uAllPlugsIn.length; i++) { 
             if(this.c4uAllPlugsIn[i].name == name) {
                this.c4uAllPlugsIn[i].changePlugIn(value);
             }
          }
      }
    },
    created() {
         console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
    },
    updated() {
         console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
         this.c4uAllConnections = this.c4uChildren['c4u-connection']; 
         this.c4uAllPlugsIn = this.c4uChildren['c4u-plugin']; 
         //this.c4uAllPlugsOut = this.c4uChildren['c4u-plugout']; 
    },
    beforeDestroy() {
         console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

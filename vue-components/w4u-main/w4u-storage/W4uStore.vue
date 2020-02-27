<template class="self"> 
  <span class="w4uStore"> 
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [W4uIo, C4uGlue], 
    props: {
            name: {type: String, default: 'store0'},               //automatic numbering would need glue for unique id...
            mode: {type: String, default: 'permanent'},            //'permanent','session'
            key:  {type: String, default: 'store0'},
            default: {type: Number, default: 0.0},                
           },
    data: function() {
           return {
             //c4uParentTag: "w4u-stage",
             w4uValue: this.default,
             w4uInputs:  {'store': {'value': this.default, 'time': 0.0 },  //0.0-1.0
             },
            }
        },
    computed: {
      w4uStore: function() {
         return this.w4uInputs.store.value;
      },
    },
    watch: {
       w4uStore: function (newValue) {
           if(Math.abs(newValue - this.w4uValue) > 1e-6) {
             this.w4uValue = newValue;
             var storage = sessionStorage;
             if ('permanent' == this.mode) {
                storage = localStorage;
             } 
             if(Math.abs(newValue - this.default) < 1e-6) {
                storage.removeItem("lastname");
             } else {
                storage.setItem(this.key, newValue.toString());
             }
           }
       },
    }
  }
</script>

<style scoped>
  .w4uStore {
  }
</style>

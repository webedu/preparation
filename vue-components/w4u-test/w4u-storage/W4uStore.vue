<template class="self"> 
  <span class="w4uStore"> 
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
    /> 
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
            key2:  {type: String, default: 'store0'},
            default: {type: Number, default: 0.0},                
           },
    data: function() {
           return {
             c4uParentTag: "c4u-circuitry",
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
             var storage = window.sessionStorage;
             if ('permanent' == this.mode) {
                storage = window.localStorage;
             } 
             if(Math.abs(newValue - this.default) < 1e-6) {
                storage.removeItem(this.key2);
             } else {
                storage.setItem(this.key2, newValue.toString());
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

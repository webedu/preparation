<template class="self">
  <span class="w4uLabel">
    {{ labelString }}
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
    /> 
  </span> 
</template>

<script>
//  import Vue from "vue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [W4uIo], 
    props: {
            name: {type: String, default: 'label0'},          //automatic numbering would need glue for unique id...
            digits: {type: Number, default: 2}, 
            unit: {type: String, default: ''}, 
            format: {type: String, default: 'plain'},   // 'plain', 'scientific', 'postfix'
            offset: {type: Number, default: 0.0},
            scale: {type: Number, default: 1.0},
           },
    data: function() {
           return {
             labelString: "-", //
             w4uInputs:  { 'v': {'value': 0.5, 'time':0.0 } }
            }
        },
   computed: {
      labelInput: function() {
         return this.w4uInputs.v.value; 
      },      
    },
    watch: {
       labelInput: function (newValue) {
           var val = newValue*this.scale+this.offset; 
           var expo = Math.pow(10, this.digits);
           var rounded = Math.round(val*expo)/expo;
           // add handling for scientific and prefix here
           // if unit add _unit
           this.labelString = rounded.toString();
             //console.log("slider has new value: " + newValue);
       },
    },  
   methods: { 
    },
  }
</script>

<style scoped>
</style>

<template class="self">
  <span class="w4uNumber">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <input 
      type="number"
      v-bind:min="min" 
      v-bind:max="max" 
      v-bind:step="stepValue"   
      v-bind:value="numberValue" 
      v-bind:list="name"
      placeholder=""
      @click="update($event)" 
      @change="update($event)"
    >
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    />    
    <slot />
  </span> 
</template>

<script>
  import Vue from "vue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [W4uIo], 
    props: {
            name: {type: String, default: 'number0'},          //automatic numbering would need glue for unique id...
            label: {type: String, default: ''},
            min: {type: Number, default: 0.0},
            max: {type: Number, default: 1.0},
            step: {type: Number, default: 0.0},  // 0.0 -> any
           },
    data: function() {
           return {
             numberValue: 0.5, 
             w4uInputs:  { 'v': {'value': 0.5, 'time':0.0 } },
             w4uOutputs: { 'v': {'value': 0.5, 'time':0.0 } }
            }
        },
   computed: {
      stepValue: function() {
         return (this.step > 0.0) ? this.step : 'any'; 
      }, 
      numberInput: function() {
         return this.w4uInputs.v.value; 
      },      
      numberOutput: function() {
         return this.numberValue;
      },
     },
    watch: {
       numberInput: function (newValue) {
           if(Math.abs(this.numberValue-newValue) > 0.001) {
           this.numberValue = newValue;
             //console.log("slider has new value: " + newValue);
           }
       },
       numberOutput: function (newValue) {
           Vue.set(this.w4uOutputs, 'v', {'value': newValue, 'time': 0.1});
           //console.log("slider has new value: " + newValue);
       },
    },  
   methods: { 
    update(e) {
          this.numberValue = e.target.value;
	},
    },
  }
</script>

<style scoped>
  .w4uNumber input { width: 8em; }


</style>

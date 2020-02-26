<template class="self">
  <span class="w4uNumber">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <input 
      ref="w4uInput" 
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
            step: {type: Number, default: 0.0},                // 0.0 -> any
            check: {type: Boolean, default: false}             // only valid numbers are reported
           },
    data: function() {
           return {
             numberValue: 0.5, 
             w4uInputs:  { 'v': {'value': 0.5, 'time':0.0 } },
             w4uOutputs: { 'v': {'value': 0.5, 'time':0.0 },
                           'valid': {'value': 0.5, 'time':0.0 }
                         }
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
          this.$refs.w4uInput._value = newValue;
          this.$refs.w4uInput.value = newValue;
          var valid = this.$refs.w4uInput.checkValidity();
          var numberValid = valid ? 1.0 : 0.0;
          Vue.set(this.w4uOutputs, 'valid', {'value': numberValid, 'time': 0.1});
          if (valid || !this.check) {
            Vue.set(this.w4uOutputs, 'v', {'value': newValue, 'time': 0.1});
          }
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

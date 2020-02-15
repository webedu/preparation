<template class="self">
  <span class="w4uCheck">
    <input 
      type="checkbox" 
      v-bind:value="name" 
      @click="update($event)"
    >
    <label v-bind:for="name">
      <slot />
    </label>
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    />    
    
  </span> 
</template>

<script>
  import Vue from "vue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [W4uIo], 
    props: {
            name: {type: String, default: 'check0'},      //automatic numbering would need glue for unique id...
            // clicked, default
            // 
           },
    data: function() {
           return {
             checkValue: false, //  default
             w4uInputs:  { 'b': {'value': 0.1, 'time':0.0 } },
             w4uOutputs: { 'b': {'value': 0.1, 'time':0.0 } }    //invert i
            }
        },
   computed: {
      checkInput: function() {
         return this.w4uInputs.b.value; 
      },      
      checkOutput: function() {
         return (this.checkValue ? 1.0 : 0.0);
      },
    },
    watch: {
       checkInput: function (newValue) {
           if(this.checkValue != (newValue>0.5)) {
           this.checkValue = (newValue>0.5);
             //console.log("slider has new value: " + newValue);
           }
       },
       checkOutput: function (newValue) {
           Vue.set(this.w4uOutputs, 'b', {'value': newValue, 'time': 0.1});
           //console.log("slider has new value: " + newValue);
       },
    },  
   methods: { 
    update(e) {
          this.checkValue = e.target.checked;
	},
    },
  }
</script>

<style scoped>


</style>

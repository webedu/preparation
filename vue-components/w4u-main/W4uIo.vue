<template class="self">
  <span class="w4uIo">
    <c4u-in
      v-for="(inData, inName) in compIn" 
      v-bind:key="inName"
      v-bind:name="name+'-'+inName" 
      v-bind:value="inData.value" 
    />
    <c4u-out 
      v-for="(outData, outName) in compOut" 
      v-bind:key="outName"
      v-bind:name="name+'-'+outName" 
      v-bind:value="outData.value" 
    />
    <slot />  
  </span>  
</template>

<script>
  export default {
    model: {
       prop: 'inputs',
       event: 'inputsChanged'
    }, 
    props: {
            name: {type: String, default: 'io0'},          
            //inputs:  {type: Object, default: function() {return {};}}, 
            inputs:  {type: String, default: "{}"}, 
            //outputs: {type: Object, default: function() {return {};}},
            outputs: {type: String, default: "{}"}
           },
    computed: {
       compOut: function() {return JSON.parse(this.outputs);}, 
       compIn:  function() {return JSON.parse(this.inputs);}
    }
  }
</script>

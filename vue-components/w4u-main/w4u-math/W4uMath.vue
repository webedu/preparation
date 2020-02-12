<template>  
  <div class="w4uMath">
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut" 
    />
    <slot />
  </div> 
</template>
  
<style scoped>
  .w4uMath { 
    background: orange;
  }
</style>

<script>
  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";

  export default {
    mixins: [C4uGlue, W4uIo],
    props: {
            name: {type: String, default: 'math0'},          //automatic numbering would need glue for unique id...
           },
    data: function() {
           return {
             c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
             w4uInputs:  { 'x0': {'value': 0.0, 'time':0.0 },   // will later be derrived from children 
                         },
             w4uOutputs: { 'y0': {'value': 0.5, 'time':0.0 },  // will later be derrived from children 
                         }
            }
        },


    computed: {
      w4uAllEquations: function() {
         return this.c4uChildren['w4u-equation'];
      }
    }, 
    watch: {
      w4uAllEquations: 
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        function (newValue) {
         this.revaluateEquations();
      },
      w4uStringIn: 
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        function(newValue) {
         this.recalculateEquations();
      },
    }, 
     methods: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uChildDisconnected(child) { this.revaluateEquations(); },   
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uChildReconnected(child) { this.revaluateEquations(); },
        revaluateEquations() {
          var newInputs = {};
          var newOutputs = {};
          if(this.c4uChildren['w4u-equation']) {
          for(var i=0; i<(this.c4uChildren['w4u-equation'].length); i++) {
            var equation = this.c4uChildren['w4u-equation'][i];
            var inputs = equation.inputs.split(',');
            for(var j=0; j<inputs.length; j++) {
               var input = inputs[j];
               if (input in this.w4uInputs) {
                  newInputs[input] = this.w4uInputs[input];
               } else {
                  newInputs[input] = { 'value': 0.0, 'time':0.0 };
               }
            } 
            var ouput = equation.output;
            if (ouput in this.w4uOutputs) {
               newOutputs[ouput] = this.w4uOutputs[ouput];
            } else {
               newOutputs[ouput] = { 'value': 0.0, 'time':0.0 };
            }
          }
          }
          this.w4uOutputs = newOutputs;
          this.stopw4uIn();
          this.w4uInputs = newInputs;
          this.initw4uIn();
        },
        recalculateEquations() {
          if(this.c4uChildren['w4u-equation']) {
            for(var i=0; i<(this.c4uChildren['w4u-equation'].length); i++) {
              var equation = this.c4uChildren['w4u-equation'][i];
              equation.calculate(this);
            }
          }
        },
    },
  }
</script>

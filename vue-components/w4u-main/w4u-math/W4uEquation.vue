<template>  
  <div class='w4uEquation'>
  <div id='w4uEquation' ref='w4uEquation'>
  </div>
  <slot></slot>
 </div> 
</template>
  
<style scoped>
  .w4uMath { 
    background: orange;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  import { create, all } from 'mathjs'
  const config = { }
  const math = create(all, config)

  export default {
    props: {
            output:   {type: String, default: 'y0'},          
            inputs:   {type: String, default: 'x0,z0'},   
            formula:  {type: String, default: 'sqrt(x0)*sin(z0)'},   
           }, 
    data: function() {
           return {
            c4uParentTag: "w4u-math", 
            }
        },
   mixins: [C4uGlue],
   methods: { 
        calculate(parent) {
           var resultValue = math.format(math.evaluate(this.formula, this.w4uAllInputs));
           Vue.set(parent.w4uOutputs, this.output, { 'value': resultValue, 'time': 0.0 });
        }, 
    },
    computed: {
      w4uAllInputs: function() {
            var allEquationInputs = {};
            var inputs = this.inputs.split(',');
            for(var i=0; i<this.inputs.length; i++) {
               var input = inputs[i];
               if (input in this.c4uParent.w4uInputs) {
                  allEquationInputs[input] = this.c4uParent.w4uInputs[input].value;
               }
            }
            return allEquationInputs;
      }
    }, 

  }
</script>

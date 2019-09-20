<template>  
  <div class='w4uMath'>
  <div id='w4uMath' ref='w4uMath'>
  </div>
  <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut" > </w4u-io>
  <slot></slot>
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
    props: {
            name: {type: String, default: 'math0'},          //automatic numbering would need glue for unique id...
           },
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            form0: '5 sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / x1)^2',
	    pretty: '$$$$',
	    result: '???',
             w4uInputs:  { 'x1': {'value': 0.0, 'time':0.0 },   // will later be derrived from children 
                           'x2': {'value': 0.0, 'time':0.0 },
                           'x3': {'value': 0.0, 'time':0.0 },   
                           'x4': {'value': 0.0, 'time':0.0 },
                         },
             w4uOutputs: { 'y1': {'value': 0.5, 'time':0.0 },  // will later be derrived from children 
                           'y2': {'value': 0.5, 'time':0.0 },
                           'y3': {'value': 0.5, 'time':0.0 },

                         }
            }
        },
   mixins: [W4uIo, C4uGlue],
    methods: {
        c4uChildDisconnected(child) { this.revaluateEquations(); },   // can be overwritten by parent
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
          this.w4uInputs = newInputs;
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
    watch: {
      w4uAllEquations: function (newValue) {
         this.revaluateEquations();
      },
/*
      w4uInputs: function(newValue) {
         this.recalculateEquations();
      },
*/
      w4uStringIn: function(newValue) {
         this.recalculateEquations();
      },
    }, 
    computed: {
      w4uAllEquations: function() {
         return this.c4uChildren['w4u-equation'];
      }
    },  
    mounted() {
         console.log("*****  Math mounted #" + this.c4uUid);

          this.result = math.format(math.evaluate(this.form0, {x1: 5}));
	  var latex = math.parse(this.form0).toTex({parenthesis: 'auto', implicit: 'hide'});
	  console.log('LaTeX expression:', latex)
/*
require('mathjax').init({
  loader: {load: ['input/tex', 'output/svg']}
}).then((MathJax) => {
  const svg = MathJax.tex2svg('\\frac{1}{x^2-1}', {display: true});
  console.log(MathJax.startup.adaptor.outerHTML(svg));
}).catch((err) => console.log(err.message));
*/

/*
 MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { fonts: ["TeX"] }
  });

MathJax.Hub.Config({
  jax: ["input/TeX","input/MathML","input/AsciiMath","output/CommonHTML"],
  extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js","AssistiveMML.js", "a11y/accessibility-menu.js"],
  TeX: {
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
  }
});
*/
          var el = this.$refs.w4uMathPretty;
	  const elem = MathJax.Hub.getAllJax(el)[0];
	  MathJax.Hub.Queue(['Text', elem, latex]);
       
         
    },

  }
</script>

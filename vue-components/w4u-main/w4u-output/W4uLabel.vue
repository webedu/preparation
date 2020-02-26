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
            value: {type: Number, default: 0.5},
            digits: {type: Number, default: 2}, 
            variable: {type: String, default: ''}, 
            unit: {type: String, default: ''}, 
            format: {type: String, default: 'plain'},   // 'plain', 'scientific', 'postfix'
            offset: {type: Number, default: 0.0},
            scale: {type: Number, default: 1.0},
           },
    data: function() {
           return {
             labelString: "-", //
             w4uInputs:  { 'value': {'value': this.value*0.9999999, 'time':0.0 } }
            }
        },
   computed: {
      labelInput: function() {
         return this.w4uInputs.value.value; 
      },      
    },
    watch: {
       labelInput: function (newValue) {
           var numString = '';
           var unitString = this.unit;
           var expString = '';
           if (this.variable) {
             numString += this.variable+' = ';
           }
           var val = newValue*this.scale+this.offset; 
           if ('postfix' == this.format) {
             var post = postfix(val);
             val = post.value;
             unitString = post.postfix+this.unit;
           }
           if ('scientific' == this.format) {
             var digits = Math.floor(Math.log10(Math.abs(val)));
             val = val/Math.pow(10, digits);
             expString = 'E'+digits.toString();
           }
           var expo = Math.pow(10, this.digits);
           var rounded = Math.round(val*expo)/expo;
           numString += rounded.toString()+expString;
           if (unitString) {
             numString += ' '+unitString;
           }
           this.labelString = numString;
             //console.log("slider has new value: " + newValue);
       },
    },  
   methods: { 
    },
   mounted() {
       this.w4uInputs.value.value = this.value; // init once to force recalculation
   },
  }


  // https://en.wikipedia.org/wiki/International_System_of_Units
  function postfix(v) {
     // if abs(v) < 10e-12
     var digits = Math.floor(Math.log10(Math.abs(v)));
     // digits min max +-12
     var post = '';
     switch (digits) {
       case -3:
         post = 'm'; v = v*Math.pow(10, 3); break;
       case -2:
         post = 'c'; v = v*Math.pow(10, 2); break;
       case -1:
         post = 'd'; v = v*Math.pow(10, 1); break;
       case 0: 
         post = ''; v = v*Math.pow(10, 0); break;
       case 1: 
         post = 'da'; v = v/Math.pow(10, 1); break; 
       case 2:
         post = 'h'; v = v/Math.pow(10, 2); break;
       case 3:
       case 4:
       case 5:
         post = 'k'; v = v/Math.pow(10, 3); break;
       case 6:
       case 7:
       case 8:
         post = 'M'; v = v/Math.pow(10, 6); break;
       default:
         post = '';
    }
     return {value: v, postfix: post};
  }
</script>

<style scoped>
</style>

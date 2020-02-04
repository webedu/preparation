<template class="self">
  <span class='w4uSignal'>
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut" > </w4u-io>    
     <slot></slot>  
  </span>
</template>

<script>

  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";
  import Vue from "vue"; 

  export default {
    props: {
            name: {type: String, default: 'signal0'},          //automatic numbering would need glue for unique id...
            frequency: {type: Number, default: 1.0}, 
            amplitude: {type: Number, default: 1.0},
            interval:  {type: Number, default: 0.1},  
            play:      {type: Number, default: 1.0},
           },
    data: function() {
           return {
             c4uParentTag: "w4u-stage",   //maybe kind of page later // or handling for none-parent -> window.root
             w4uTimer: null, 
             w4uRamp:  0.0,
             w4uRadian: 0.0,  
             w4uOutputs: { 'ramp': {'value': 0.5, 'time':0.0 },
                           'sin':  {'value': 0.5, 'time':0.0 },
                           'cos':  {'value': 0.5, 'time':0.0 },

                         },
             w4uInputs:  { 'frequency': {'value': this.frequency, 'time':0.0 },   // interval * frequency < 1!!
                           'amplitude': {'value': this.amplitude, 'time':0.0 },
                           'interval':  {'value': this.interval,  'time':0.0 },   // interval > 0.001 ?
                           'play':      {'value': 1.0, 'time':0.0 },
                         }
            }
        },
   mixins: [W4uIo, C4uGlue],
   methods: { 
        c4uParentDisconnected(parent) {
           this.deleteElem();
        }, 
        c4uParentReconnected(parent) {
           this.createElem();
        },
        createElem() {
           this.deleteElem();
           this.w4uTimer = setInterval(this.update, 1000*this.w4uInputs.interval.value); //ms
	},
        deleteElem() {
         if(this.w4uTimer) {
           clearInterval(this.w4uTimer);
           this.w4uTimer = null;
         }
	},
        modifyElem() {
        },
        update() {
             var step = 2.0*Math.PI*this.w4uInputs.interval.value*this.w4uInputs.frequency.value;
             this.w4uRamp += this.w4uInputs.amplitude.value*this.w4uInputs.interval.value*this.w4uInputs.frequency.value;
             this.w4uRadian += step;
             if(this.w4uRadian > 2.0*Math.PI) {
                this.w4uRadian -= 2.0*Math.PI;
             }
             //console.log('Signal now #'+this.c4uUid.toString()+': '+this.w4uRamp.toString()); 
             var sin = this.w4uInputs.amplitude.value*Math.sin(this.w4uRadian); 
             var cos = this.w4uInputs.amplitude.value*Math.cos(this.w4uRadian); 
             Vue.set(this.w4uOutputs, 'ramp', {'value': this.w4uRamp, 'time': this.w4uInputs.interval.value});
             Vue.set(this.w4uOutputs, 'sin', {'value': sin, 'time': this.w4uInputs.interval.value});
             Vue.set(this.w4uOutputs, 'cos', {'value': cos, 'time': this.w4uInputs.interval.value});

	},
    },
    watch: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      w4uStringIn: function (newValue) { this.modifyElem(); }  
    },   
    mounted() {
       this.createElem();
    }
  }
</script>

<style scoped>
  .w4uSignal {  }
</style>

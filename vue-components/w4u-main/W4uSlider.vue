<template class="self">
  <span class='w4uSlider'>
     <span v-html="w4uStyle"></span>
     <input type="range" min="0" max="1000" v-bind:value="slidervalue" v-bind:orient="orient" v-on:input="slide($event)" v-on:change="update($event)">
     <c4u-out name="this.name+'-value'" v-bind:value="slidervalue">
     <slot></slot> 
  </span> 
</template>

<script>

  export default {
    props: {
            name: {type: String, default: 'slider0'},          //automatic numbering would need glue for unique id...
            orient: {type: String, default: 'vertical'}, 
            color: {type: String, default: '#4CAF50'}, 
            background: {type: String, default: '#d3d3d3'}, 
            label: {type: String, default: ''}
            // length: 175px 
            // min: -1.0 // 0.0
            // max: +1.0  
            // default (value)
            // continuous
           },
    data: function() {
           return {
             slidervalue: 500 //
            }
        },
    //mixins: [C4uGlue], 
    
    methods: { 
    slide(e) {
           // if (this.continouos)
	   this.slidervalue = e.target.value; 
	   console.log('slide: '+ this.slidervalue);
	},
    update(e) {
	  this.slidervalue = e.target.value;
	  //this.load(this.slidervalue);
	},
    },
    computed: {
      w4uStyle: function() {
         return '<style>' 
              + '.w4uSlider input { background: '+this.background+'; } '
              + '.w4uSlider input[type=range]::-webkit-slider-thumb { background: '+this.color+'; } ' 
              + '.w4uSlider input[type=range]::-moz-range-thumb { background: '+this.color+'; } '
              + '</style>';
      }   
    }, 
    created() {
         //console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         //console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
    },
    updated() {
         //console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         //console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

<style scoped>
  .w4uSlider {  }
  .w4uSlider input[type=range] {
      -webkit-appearance: none;
      opacity: 1;
      border-radius: 5px;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
      width: 175px;
      height: 8px;
      padding: 5px 0; 
  }

.w4uSlider input[orient=vertical] {
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 8px;
    height: 175px;
    padding: 0 5px; 
 }


.w4uSlider input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  cursor: pointer;
}

.w4uSlider input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

</style>

<template>
  <span class="w4uPath">
    <slot />
    <w4u-io
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    />
  </span>
</template>

<style scoped>
  .w4uPath2 {
  } 
</style>

<script>
  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue"; 
  import Vue from "vue"; 
  //import SnapSvg from "snapsvg-cjs";
  
  export default {
    mixins: [W4uIo, C4uGlue],
    props: {
            name: {type: String, default: 'path0'},          //automatic numbering would need glue for unique id...
            d:   {type: String, default: 'M 10 85 q 159 -50 300 10'},
           },
    data: function() {
           return {
             c4uParentTag: "w4u-svg",
             svgElem: null,
             svgPath: this.d,
             w4uInputs:  {'length': {'value': 0.0, 'time':0.0 }       
             },
             w4uOutputs: { 'x': {'value': 0.0, 'time':0.0 },
                           'y': {'value': 0.0, 'time':0.0 },
                           'alpha': {'value': 0.0, 'time':0.0 }
             }
         }
    },
    computed: {  
      length:  function() { return this.w4uInputs.length.value; },
    },
    watch: {
       w4uStringIn: 
         /*eslint no-unused-vars: ["error", { "args": "none" }]*/
         function (newValue) { this.modifyElem(); },
       length: function (newValue) {
           //console.log("path length has new value: " + newValue);
           if(this.svgElem) {
              var pathLength = this.svgElem.getTotalLength();
              var pos = this.svgElem.getPointAtLength(pathLength*newValue);
              var xrel = pos.x / 1;
              var yrel = pos.y / 1;
              var alpha = pos.alpha;
              Vue.set(this.w4uOutputs, 'x', {'value': xrel, 'time': 0.1});
              Vue.set(this.w4uOutputs, 'y', {'value': yrel, 'time': 0.1});
              Vue.set(this.w4uOutputs, 'alpha', {'value': alpha, 'time': 0.1});
           }
         },

       },
    mounted() {
       this.createElem();
    },
    methods: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentDisconnected(parent) {
           this.deleteElem();
        }, /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.createElem();
        },    
        createPath() {
           this.svgPath = this.d;
// children
           if(this.c4uChildren['w4u-segment']) {
             var newPath = '';
             for(var i=0; i<(this.c4uChildren['w4u-segment'].length); i++) {
               var segment = this.c4uChildren['w4u-segment'][i];
               newPath += segment.svgSegment + ' '; 
             }
             this.svgPath = newPath;
           }
        },
        createElem() {
         if(this.c4uParent) {
           this.createPath();
           this.deleteElem()
           var s = this.c4uParent.getSvgStage();
           this.svgElem = s.path(this.svgPath);
         }
	},
        deleteElem() {
         if(this.svgElem) {
           this.svgElem.remove();
           this.svgElem = null;
         }
	}, 
        modifyElem() {
         if(!this.c4uParent) { this.deleteElem(); }
         this.createPath();
         if(this.svgElem) {
           this.svgElem.animate({
               d: this.svgPath
             } ,1000); //adapt time later

         }
	},          
      },


  }
</script>

<template>
  <span class="w4uSegment">
    <slot />
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn"
    />
  </span>
</template>

<style scoped>
  .w4uSegment {
  } 
</style>

<script>
  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";
  //import SnapSvg from "snapsvg-cjs"; 

  export default {
    mixins: [W4uIo, C4uGlue],
    props: {
            name: {type: String, default: 'segment0'},          
            type: {type: String, default: 'L'}, // M,L,Q,A,...
            x:    {type: Number, default: 10},  // end point M,L,Q,...
            y:    {type: Number, default: 10},  // end point
            x1:   {type: Number, default: 10},  // spline control Q,
            y1:   {type: Number, default: 10},  // spline control Q,
            x2:   {type: Number, default: 10},  // spline control Q,
            y2:   {type: Number, default: 10},  // spline control Q,
            rx:   {type: Number, default: 10},  // arc diameter
            ry:   {type: Number, default: 10},  // arc diameter
            a:    {type: Number, default:  5},  // arc angle
            f1:   {type: Number, default:  0},  // arc flag small/large 0/1 
            f2:   {type: Number, default:  1},  // arc flag pos/neg     0/1
           },
    data: function() {
           return {
             c4uParentTag: "w4u-path",
             svgSegment: "",
             w4uInputs:  {'x':  {'value': 0.0, 'time':0.0 },  // end point M,L,Q,...
                          'y':  {'value': 0.0, 'time':0.0 },  // end point
                          'x1': {'value': 0.0, 'time':0.0 },  // spline control Q,
                          'y1': {'value': 0.0, 'time':0.0 },  // spline control Q,
                          'x2': {'value': 0.0, 'time':0.0 },  // spline control Q,
                          'y2': {'value': 0.0, 'time':0.0 },  // spline control Q,
                          'rx': {'value': 0.0, 'time':0.0 },  // arc diameter
                          'ry': {'value': 0.0, 'time':0.0 },  // arc diameter
                          'a':  {'value': 0.0, 'time':0.0 },  // arc angle
                          'f1': {'value': 0.0, 'time':0.0 },  // arc flag small/large 0/1 
                          'f2': {'value': 0.0, 'time':0.0 },  // arc flag pos/neg     0/1
    
                         },

                 }
    },

    watch: { 
       w4uStringIn: 
         /*eslint no-unused-vars: ["error", { "args": "none" }]*/
         function (newValue) { this.modifyElem(); },
       },
    mounted() {
       this.createElem();
    },
    methods: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/ 
        c4uParentDisconnected(parent) {
           this.deleteElem();
        }, 
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.createElem();
        }, 
        createElem() {
         if(this.c4uParent) {
           switch(this.type) {
             case 'M':
             case 'm':
             case 'L':
             case 'l':
               this.svgSegement = this.type + ' ' + (this.w4uInputs.x) + ' ' + (this.w4uInputs.y);
               break;
             case 'H':
             case 'h':
               this.svgSegement = this.type + ' ' + (this.w4uInputs.x);
               break;
             case 'V':
             case 'v':
               this.svgSegement = this.type + ' ' + (this.w4uInputs.y);
               break;
             case 'Z':
             case 'z':
               this.svgSegement = this.type;
               break;
           }
           this.c4uParent.modifyElem();
         }
	},
        deleteElem() {
           this.svgSegment = '';
	}, 
        modifyElem() {
         this.deleteElem(); 
         this.createElem();
	},          
      },

  }
</script>

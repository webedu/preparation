<template class="self">
  <span class="w4uMarker">  
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css"
    >
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    />    
    <slot />  
  </span>
</template>

<script>
  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";
  // import Vue from "vue";  
  import L from "leaflet";
  //import 'leaflet/dist/leaflet.css';

  export default {
    mixins: [W4uIo, C4uGlue],
    props: {
            name: {type: String, default: 'marker0'},          //automatic numbering would need glue for unique id...
            latitude:  {type: Number, default: 0.0}, 
            longitude: {type: Number, default: 0.0},
            //zoom:      {type: Number, default: 0.5},
           },
    data: function() {
           return {
             c4uParentTag: "w4u-cluster",   
             w4uMarker:     null, 
             w4uOutputs: { 'latitude':  {'value': 0.0, 'time':0.0 },
                           'longitude':   {'value': 0.0, 'time':0.0 },
                           //'zoom':   {'value': 0.5, 'time':0.0 },
                         },
             w4uInputs:  { 'latitude':  {'value': this.latitude, 'time':0.0 },   // interval * frequency < 1!!
                           'longitude': {'value': this.longitude, 'time':0.0 },
                           //'zoom':      {'value': this.zoom, 'time':0.0 },
                         }
            }
        },
   watch: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      w4uStringIn: function (newValue) { this.modifyElem(); },
      //amplitude: function (newValue) { this.w4uInputs['amplitude']['value'] = newValue; },  
   }, 
   mounted() {
       this.createElem();
   },
   methods: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentDisconnected(parent) {
           this.deleteElem();
        },    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.createElem();
        },
        createElem() {

          //var m = L.marker( [48, 8], {icon: marker} );  // https://leafletjs.com/reference-1.6.0.html#marker
          this.w4uMarker = L.marker( [48, 8] );
          if(this.c4uParent && this.c4uParent.w4uCluster) {
             this.c4uParent.w4uCluster.addLayer( this.w4uMarker );  
          }
	},
        deleteElem() {
         if(this.w4uMarker) {
           if(this.c4uParent && this.c4uParent.w4uCluster) {
             this.c4uParent.w4uCluster.removeLayer( this.w4uMarker );  
           }
           this.w4uMarker = null;
         }
	},
        modifyElem() {
        },
        update() {
             // var step = 2.0*Math.PI*this.w4uInputs.interval.value*this.w4uInputs.frequency.value;
             // Vue.set(this.w4uOutputs, 'noise', {'value': noise, 'time': this.w4uInputs.interval.value});
	},
    },

  }
</script>

<style scoped>

</style>

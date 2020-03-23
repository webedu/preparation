<template class="self">
  <span class="w4uMap2">  
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css"
    >
    <link 
      rel="stylesheet" 
      href="http://cdn.jsdelivr.net/npm/leaflet-extra-markers@1.1.0/dist/css/leaflet.extra-markers.min.css"
    >
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    >
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0"
    >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="w4uSizeStyle" />
    <div 
      id="w4uMap" 
      ref="w4uMap" 
      class="w4uSize"
    />
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
            name: {type: String, default: 'map0'},        // automatic numbering would need glue for unique id...
            latitude:  {type: Number, default: 0.0}, 
            longitude: {type: Number, default: 0.0},
            zoom:      {type: Number, default: 0.5},
            // common ??
            width:     {type: String, default: "90%"},
            height:    {type: String, default: "400px"},  // later switch to 40% (calculated by screen height)
           },
    data: function() {
           return {
             //c4uParentTag: "c4u-circuitry",   
             w4uMap:     null, 
             w4uOutputs: { 'latitude':  {'value': 0.0, 'time':0.0 },
                           'longitude': {'value': 0.0, 'time':0.0 },
                           'zoom':      {'value': 0.5, 'time':0.0 },
                         },
             w4uInputs:  { 'latitude':  {'value': this.latitude, 'time':0.0 },   // interval * frequency < 1!!
                           'longitude': {'value': this.longitude, 'time':0.0 },
                           'zoom':      {'value': this.zoom, 'time':0.0 },
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
    computed: {
      w4uSizeStyle: function() {
         var w = this.width;
         var h = this.height;
         // %,px,ratio calculate
         return '<style> .w4uSize { width: '+w+'; height: '+h+'; } </style>';
      },
    }, 
   methods: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentDisconnected(parent) {
           this.deleteElem();
        },    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.createElem();
        },
        createElem() {
           var map = this.$refs.w4uMap;
           this.deleteElem();
           this.w4uMap = L.map(map).setView(
             [90.0*this.w4uInputs.latitude.value,
              180.0*this.w4uInputs.longitude.value], 
               16.0*this.w4uInputs.zoom.value);
           L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
             maxZoom: 12,
             minZoom: 4,
             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
             }).addTo(this.w4uMap);
           this.w4uMap._onResize();
/*
  {
    name: 'OpenTopoMap',
    visible: false,
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  },

*/


	},
        deleteElem() {
         if(this.w4uMap) {
           this.w4uMap.eachLayer(function(layer){
              layer.remove();
           });
           this.w4uMap.remove();
           this.w4uMap = null;
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
  /* div#w4uMap { width: 100%; height: 600px; } */
  /* @import 'leaflet/dist/leaflet.css'; */
</style>

<template class="self">
  <span class="w4uGeo">
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    />  
    <h5>Position</h5>  
    <ul>
      <li>Latitude: {{ w4uOutputs.latitude.value }}</li>
      <li>Longitude: {{ w4uOutputs.longitude.value }}</li>
    </ul>
    <slot />  
  </span>
</template>

<script>

  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";
  import Vue from "vue"; 

  export default {
    mixins: [W4uIo, C4uGlue],
    props: {
            name:     {type: String, default: 'geo0'},          //automatic numbering would need glue for unique id...
            mode:     {type: String, default: 'watch'},         //"watch"|"once"
            normalize: {type: Boolean, default: true},          //0..1
            accuracy: {type: Number, default: 0.0},
           },
    data: function() {
           return {
             c4uParentTag: "c4u-circuitry",   
             w4uLatitude: 0,
             w4uLongitude: 0,
             w4uOutputs: { 'latitude':    {'value': 0.0, 'time':0.0 },
                           'longitude':   {'value': 0.0, 'time':0.0 },
                           'cos':   {'value': 0.0, 'time':0.0 },
                           'noise': {'value': 0.0, 'time':0.0 },

                         },
             w4uInputs:  { 'frequency': {'value': this.frequency, 'time':0.0 },   // interval * frequency < 1!!
                           'amplitude': {'value': this.amplitude, 'time':0.0 },
                           'offset':    {'value': this.offset, 'time':0.0 },
                           'interval':  {'value': this.interval,  'time':0.0 },   // interval > 0.001 ?
                           'play':      {'value': 1.0, 'time':0.0 },
                         }
            }
        },
   watch: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      //amplitude: function (newValue) { this.w4uInputs['amplitude']['value'] = newValue; },  
   }, 
   mounted() {
       //this.createElem();
       navigator.geolocation.getCurrentPosition(this.showPosition);
   },
   methods: { 
        showPosition(position) {
           this.w4uLatitude = position.coords.latitude;
           this.w4uLongitude = position.coords.longitude;
           Vue.set(this.w4uOutputs, 'latitude', {'value': position.coords.latitude, 'time': 0.1});
           Vue.set(this.w4uOutputs, 'longitude', {'value': position.coords.longitude, 'time': 0.1});
        },     
    },

  }
</script>

<style scoped>
  .w4uGeo {  }
</style>



// https://www.w3schools.com/html/html5_geolocation.asp

//latitude
//longitude
//attitude
//speed
//heading

//watchPosition()

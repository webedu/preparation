<template class="self">
  <span class="w4uGeo">
    <w4u-io 
      v-bind:name="name" 
      v-bind:outputs="w4uStringOut"
    />  
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
            degree:   {type: Boolean, default: false},          // 0..360 instead 0..1
           },
    data: function() {
           return {
             c4uParentTag: "c4u-circuitry",   
             w4uWatchTId: null,
             w4uOutputs: { 'latitude':    {'value': 0.0, 'time':0.0 },
                           'longitude':   {'value': 0.0, 'time':0.0 },
                           'altitude ':   {'value': -1.0, 'time':0.0 },  // m
                           'heading ':    {'value': -1.0, 'time':0.0 },  // 0..360
                           'speed':       {'value': -1.0, 'time':0.0 },  // m/s
                           'status':      {'value':  0.0, 'time':0.0 },  // 0:failure, 1:success
                         },
            }
        },
   mounted() {
     this.initPosition();
   },
   methods: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentDisconnected(parent) {
           this.stopPosition();
        }, /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.initPosition();
        },
      initPosition() {
       this.stopPosition();
       inqPosition(this, Vue)
        .then((result) => {
          result.vueGeo.updatePosition(result.position);
        })
        .catch((result) => {
          result.vueGeo.failPosition(result.error);
        });
       if('watch'==this.mode) {
         trackPosition(this, Vue)
          .then((result) => {
            result.vueGeo.updatePosition(result.position);
          })
          .catch((result) => {
            result.vueGeo.failPosition(result.error);
          });
        }
      },
      stopPosition() {
        if(this.w4uWatchId) {
          navigator.geolocation.clearWatch(this.w4uWatchId);
          this.w4uWatchId = null;
        }
      },
      updatePosition(position) {
           var latitude = position.coords.latitude;
           var longitude = position.coords.longitude;
           if (!this.degree) {
             latitude = latitude/90.0;
             longitude = longitude/180.0;
           }
           Vue.set(this.w4uOutputs, 'status', {'value': 1.0, 'time': 0.1});
           Vue.set(this.w4uOutputs, 'latitude', {'value': latitude, 'time': 0.1});
           Vue.set(this.w4uOutputs, 'longitude', {'value': longitude, 'time': 0.1});
           var altitude = position.coords.altitude;
           if(altitude) {
             if (!this.degree) {
               altitude = altitude/10000.0;
             }
             Vue.set(this.w4uOutputs, 'altitude', {'value': altitude, 'time': 0.1});
           }
           var heading = position.coords.heading;
           if(heading) {
             if (!this.degree) {
               heading = heading/360.0;
             }
             Vue.set(this.w4uOutputs, 'heading', {'value': heading, 'time': 0.1});
           }
           if(position.coords.speed) {
             Vue.set(this.w4uOutputs, 'speed', {'value': position.coords.speed, 'time': 0.1});
           }

      },
      failPosition(error) {
        // eslint-disable-next-line no-console
        console.log(error.code+": "+error.message);
        Vue.set(this.w4uOutputs, 'status', {'value': 0.0, 'time': 0.1});
      }
    
    },

  }

var inqPosition = function(vueGeo) {
  return new Promise(
    function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          resolve({'vueGeo': vueGeo, 'position': position});
        },
        function(error) {
          reject({'vueGeo': vueGeo, 'error': error});
        },
        {'timeout':10000, 'maximumAge':60000}
     );
  });
}

var trackPosition = function(vueGeo) {
  return new Promise(
    function(resolve, reject) {
      vueGeo.w4uWatchId = navigator.geolocation.watchPosition(
        function(position) {
          resolve({'vueGeo': vueGeo, 'position': position});
        },
        function(error) {
          reject({'vueGeo': vueGeo, 'error': error});
        },
        {'timeout':10000, 'maximumAge':60000}  //10s,60s
     );
  });
}

</script>

<style scoped>
  .w4uGeo {  }
</style>



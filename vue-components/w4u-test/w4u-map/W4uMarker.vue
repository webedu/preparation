<template class="self">
  <span class="w4uMarker">  
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    />    
    <div class="w4uPopup">
      <slot/> 
    </div> 
  </span>
</template>

<script>
  import W4uIo from "w4u-io";
  import C4uGlue from "c4u-glue";
  import Vue from "vue";  
  import L from "leaflet";
  import "leaflet-extra-markers";
  //import 'leaflet/dist/leaflet.css';

  export default {
    mixins: [W4uIo, C4uGlue],
    props: {
            name: {type: String, default: 'marker0'},          //automatic numbering would need glue for unique id...
            latitude:  {type: Number, default: 0.0}, 
            longitude: {type: Number, default: 0.0},
            zoom:      {type: Number, default: 0.5},          // zoom is used, when marker is activated 
            number:    {type: String, default: ''},           // 1,2,3 or A,B,C,.. icon ignored.
            tooltip:   {type: String, default: ''}, 
          //  rotation:  {type: Number, default: 0.0},        // rotation not working - for font-awesome?
            opacity:   {type: Number, default: 1.0},
            draggable: {type: Boolean, default: false},
            icon:  {type: String, default: 'fa-circle'},
            color: {type: String, default: '#000000'}, 
            shape: {type: String, default: 'circle'},         // 'circle', 'square', 'star', or 'penta'
            background: {type: String, default: 'white'},     // 'red', 'orange-dark', 'orange', 'yellow', 'blue-dark', 'cyan',
                                                              // 'purple', 'violet', 'pink', 'green-dark', 'green', 'green-light',
                                                              // 'black', 'white'
           },
    data: function() {
           return {
             c4uParentTag: "w4u-cluster",   
             w4uMarker:     null, 
             w4uOutputs: { 'latitude':  {'value': this.latitude, 'time':0.0 },
                           'longitude': {'value': this.longitude, 'time':0.0 },
                           'active':    {'value': 0.0, 'time':0.0 },
                         },
             w4uInputs:  { 'latitude':  {'value': this.latitude, 'time':0.0 },   
                           'longitude': {'value': this.longitude, 'time':0.0 },
                           'zoom':      {'value': this.zoom, 'time':0.0 },
                          // 'rotation':  {'value': this.rotation, 'time':0.0 },
                           'opacity':   {'value': this.opacity, 'time':0.0 },
                           'activate':  {'value': 0.0, 'time':0.0 },
                         }
            }
        },
   computed: {  
        iLatitude:  function() { return this.w4uInputs.latitude.value; },
        iLongitude: function() { return this.w4uInputs.longitude.value; }, 
        iOpacity:   function() { return this.w4uInputs.opacity.value; },
        iActivate:  function() { return this.w4uInputs.activate.value; }, 
      },
   watch: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      //w4uStringIn: function (newValue) { this.modifyElem(); },
      iLatitude: function() { this.repositionMarker(); },
      iLongitude: function() { this.repositionMarker(); },
      iOpacity: function() { this.modifyElem(); },
      iActivate: function() { this.activateMarker(); },
   }, 
   mouned() {
      // this.createElem();
   },
   methods: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentDisconnected(parent) {
           this.deleteElem();
        },    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.createElem();
        },
        createElem() {
          this.deleteElem();
          // https://www.npmjs.com/package/leaflet-extra-markers
          if(this.$el && this.c4uParent && this.c4uParent.w4uCluster) {
            var icon = this.icon;
            if(this.number) { icon = 'fa-number';}
            var data = {icon: icon, number: this.number, iconColor: this.color, // iconRotation: 360.0*this.w4uInputs.rotation.value, 
                        shape: this.shape, markerColor: this.background, 
                        prefix: 'fa', svg: false};
            var marker =  L.ExtraMarkers.icon(data);
            this.w4uMarker = L.marker( [90.0*this.w4uInputs.latitude.value, 180.0*this.w4uInputs.longitude.value],
                                       {icon: marker, title: this.tooltip, opacity: this.w4uInputs.opacity.value, 
                                        draggable: false, autoPan: false} );  
            // https://leafletjs.com/reference-1.6.0.html#marker
            // this.w4uMarker = L.marker( [48, 8] );


            var popup = this.$el.getElementsByClassName("w4uPopup")[0].innerHTML;
            if(popup) {
              this.w4uMarker.bindPopup(popup);
            }

            this.w4uMarker.on('click', this.onClick);
            if(this.c4uParent && this.c4uParent.w4uCluster) {
               this.c4uParent.w4uCluster.addLayer( this.w4uMarker );  
            }
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
           //this.deleteElem(); 
           this.createElem();
        },
        repositionMarker() {
          if(this.w4uMarker) {
            this.w4uMarker.setLatLng([90.0*this.w4uInputs.latitude.value, 180.0*this.w4uInputs.longitude.value]);
          }
        },
        // refactor: move inner parts up to cluster and map
        activateMarker() {
           if(this.w4uInputs.activate.value > 0.5) {
             if(this.c4uParent && this.c4uParent.w4uCluster) {
               if(this.c4uParent.c4uParent && this.c4uParent.c4uParent.w4uMap) {
                  this.c4uParent.c4uParent.w4uMap.flyTo(
                    [90.0*this.w4uInputs.latitude.value, 180.0*this.w4uInputs.longitude.value], 
                     16.0*this.w4uInputs.zoom.value);
               }
             } 
             this.w4uInputs.activate.value = 0.1; //done
             // set clicked ?
             //this.onClick(null);
           }       
        },
        onClick(ev) {
           //reset all (other)
           if(this.c4uParent && this.c4uParent.w4uCluster) {
             var allMarkers = this.c4uParent.c4uChildren['w4u-marker'];  
             for(var i=0; i<(allMarkers.length); i++) {
                allMarkers[i].clicked(0.0);
             }             
           }
           this.clicked(1.0);
        },
        clicked(value) {        
           if(Math.abs(this.w4uOutputs.active.value - value) > 1E-6) {
              Vue.set(this.w4uOutputs, 'active', {'value': value, 'time': 0.1});
           }
        },
        update() {
             // var step = 2.0*Math.PI*this.w4uInputs.interval.value*this.w4uInputs.frequency.value;
             // Vue.set(this.w4uOutputs, 'noise', {'value': noise, 'time': this.w4uInputs.interval.value});
	},
    },

  }
</script>

<style scoped>
  .w4uPopup {display: none;}
</style>

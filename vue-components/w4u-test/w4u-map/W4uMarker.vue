<template class="self">
  <span class="w4uMarker">  
    <!--link 
      rel="stylesheet" 
      href="http://cdn.jsdelivr.net/npm/leaflet-extra-markers@1.1.0/dist/css/leaflet.extra-markers.min.css"
    >
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    -->
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
          //  rotation:  {type: Number, default: 0.0}, 
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
                           'clicked':   {'value': 0.0, 'time':0.0 },
                         },
             w4uInputs:  { 'latitude':  {'value': this.latitude, 'time':0.0 },   
                           'longitude': {'value': this.longitude, 'time':0.0 },
                          // 'rotation':  {'value': this.rotation, 'time':0.0 },
                           'opacity':   {'value': this.opacity, 'time':0.0 },
                         }
            }
        },
   watch: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
      w4uStringIn: function (newValue) { this.modifyElem(); },
      //amplitude: function (newValue) { this.w4uInputs['amplitude']['value'] = newValue; },  //drag
   }, 
   mounted() {
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
          var data = {icon: this.icon, iconColor: this.color, // iconRotation: 360.0*this.w4uInputs.rotation.value, 
                      shape: this.shape, markerColor: this.background, 
                      prefix: 'fa', svg: false};
          var marker =  L.ExtraMarkers.icon(data);
          this.w4uMarker = L.marker( [90.0*this.w4uInputs.latitude.value, 180.0*this.w4uInputs.longitude.value],
                                     {icon: marker, title: 'Hover', opacity: this.w4uInputs.opacity.value, 
                                      draggable: false, autoPan: false} );  
          // https://leafletjs.com/reference-1.6.0.html#marker
          // this.w4uMarker = L.marker( [48, 8] );

          if(this.$el) {
            var popup = this.$el.getElementsByClassName("w4uPopup")[0].innerHTML;
            if(popup) {
              this.w4uMarker.bindPopup(popup);
            }
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
           if(Math.abs(this.w4uOutputs.clicked.value - value) > 1E-6) {
              Vue.set(this.w4uOutputs, 'clicked', {'value': value, 'time': 0.1});
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

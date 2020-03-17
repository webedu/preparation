<template class="self">
  <span class="w4uCluster">  
    <slot />  
  </span>
</template>

<script>
  import C4uGlue from "c4u-glue";
  // import Vue from "vue";  
  import L from "leaflet";
  //import 'leaflet/dist/leaflet.css';

  export default {
    mixins: [C4uGlue],
    props: {
            name: {type: String, default: 'cluster0'},          //automatic numbering would need glue for unique id...
            limit: {type: Number, default: 25}, 
           },
    data: function() {
           return {
             c4uParentTag: "w4u-map",   
             w4uCluster:   null, 
            }
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
           this.deleteElem();
           this.w4uCluster = new L.LayerGroup();  //  L.markerClusterGroup
           if(this.c4uParent && this.c4uParent.w4uMap) {
              this.w4uCluster.addTo(this.c4uParent.w4uMap); 
           }
	},
        deleteElem() {
         if(this.w4uCluster) {
            this.w4uCluster.clearLayers();
            if(this.c4uParent && this.c4uParent.w4uMap) {
              this.c4uParent.w4uMap.removeLayer(this.w4uCluster);
            }
            this.w4uCluster = null;
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

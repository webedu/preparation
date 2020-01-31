<template class="self">
  <span class='w4uPanorama'>
     <div id="w4uPanorama" ref="w4uPanorama" v-bind:width="width" v-bind:height="height"></div> 
     <slot></slot>        
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut" > </w4u-io> 
  </span>  
</template>

<!-- script src="../../node_modules/photo-sphere-viewer/dist/photo-sphere-viewer.js" type="text/javascript"></script -->
<script>

  import W4uIo from "w4u-io";
  import PhotoSphereViewer from "photo-sphere-viewer";

  export default {
    props: {
            name: {type: String, default: 'panorama0'},          //automatic numbering would need glue for unique id...
            // controls: {type: Boolean, default: false},
            src:    {type: String, default: ''},
            width:  {type: String, default: '375px'}, 
            height: {type: String, default: '375px'}
           },
    mixins: [W4uIo], 
    data: function() {
           return {
             w4uInputs:  {'play': {'value': 0.0, 'time':0.0 },
                          'fraction': {'value': 0.0, 'time':0.0 },
                          'volume': {'value': 0.5, 'time':0.0 }                      // player.volume
             },
             w4uOutputs: { 'fraction': {'value': 0.0, 'time':0.0 } },
             w4uPanoramaPlayer: null
            }
        },
      watch: {
       play: function (newValue) {
           console.log("play has new value: " + newValue);
           var player = this.$refs.w4uVideo;
           if(newValue > 0.5) {
              player.play();
           } else {
              player.pause();
           }
       },
       fraction: function (newValue) {
           console.log("fraction has new value: " + newValue);
           var player = this.$refs.w4uVideo;
           var currentTime = player.currentTime;
           var newTime = newValue * player.duration;
           if(Math.abs(newTime - currentTime) > 0.05) {
             player.currentTime = newTime;
           }
       },
      },
      methods: {
        timeUpdate() {
           var player = this.$refs.w4uVideo;
           var fractionTime = player.currentTime / player.duration;
           Vue.set(this.w4uOutputs, 'fraction', {'value': fractionTime, 'time': 0.1});
	},
         
      }, 
      computed: {  
        // play:     function() { return this.w4uInputs.play.value; },
        // fraction: function() { return this.w4uInputs.fraction.value; }, 
      },
      mounted() {
          var panoramaDiv = this.$refs.w4uPanorama;
          this.w4uPanoramaPlayer = new PhotoSphereViewer({
             container: panoramaDiv,
             panorama:  this.src,
             time_anim: false,
             //time_anim: true, 
             //navbar: false,
             
             pano_data: {
               full_width: 1925,
               full_height: 963,
               cropped_width: 1925,
               cropped_height: 421,
               cropped_x: 0,
               cropped_y: 210    
             }  
          });
         //this.w4uPanoramaPlayer.animate();
         this.w4uPanoramaPlayer.rotate({longitude: 90, latitude: 0});
         var pos = this.w4uPanoramaPlayer.getPosition();
         this.w4uPanoramaPlayer.needsUpdate();
         this.w4uPanoramaPlayer.render();
         this.w4uPanoramaPlayer.startAutorotate();
         this.w4uPanoramaPlayer.stopAutorotate();
         // event: position-updated
      }   
  }
</script>

<style src="../../node_modules/photo-sphere-viewer/dist/photo-sphere-viewer.css"></style>
<style scoped>
 /*  @import url(../../node_modules/photo-sphere-viewer/dist/photo-sphere-viewer.css) */
 div {
   width: 420px;
   height: 250px;    
 }
</style>


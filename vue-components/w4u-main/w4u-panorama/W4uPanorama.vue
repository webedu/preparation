<template class="self">
  <span class='w4uPanorama'>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css">
     <div id="w4uPanorama" ref="w4uPanorama" v-bind:width="width" v-bind:height="height"
          
     ></div> 
     <slot></slot>        
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut" > </w4u-io> 
  </span>  
</template>

<script>
 
  import Vue from "vue"; 
  import W4uIo from "w4u-io";
  import pannellum from "pannellum";
  import 'pannellum/build/pannellum.css';
  import _debounce from 'lodash.debounce'

  export default {
    props: {
            name: {type: String, default: 'panorama0'},          //automatic numbering would need glue for unique id...
            // controls: {type: Boolean, default: false},
            src:    {type: String, default: ''},
            width:  {type: String, default: '375px'}, 
            height: {type: String, default: '375px'},
//    autoRotate: { type: [Number, Boolean], default: 0 },
//    orientation: { type: Boolean, default: false },
//    hfov: { type: Number, default: 75 },
    yaw: { type: Number, default: 0 },
//    pitch: { type: Number, default: 0 },
           },
    mixins: [W4uIo], 
    data: function() {
           return {
             w4uInputs:  {'play': {'value': 0.0, 'time':0.0 },
                          'yaw': {'value': this.yaw, 'time':0.0 },
                          'volume': {'value': 0.5, 'time':0.0 }                      // player.volume
             },
             w4uOutputs: { 'yaw': {'value': 0.0, 'time':0.0 } },
             w4uPanoramaPlayer: null,
             rafId: null,
            }
        },
      watch: {
       play: function (newValue) {
           //console.log("play has new value: " + newValue);
           var player = this.$refs.w4uVideo;
           if(newValue > 0.5) {
              player.play();
           } else {
              player.pause();
           }
       },
       fraction: function (newValue) {
           //console.log("fraction has new value: " + newValue);
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

    loop () {
      this.rafId = window.requestAnimationFrame(this.loop)
      let hfov = this.w4uPanoramaPlayer.getHfov()
      let yaw = this.w4uPanoramaPlayer.getYaw()
      let pitch = this.w4uPanoramaPlayer.getPitch()
      if (pitch > 90) pitch = 90
      else if (pitch < -90) pitch = -90
      if (hfov != this.hfov) this.$emit('update:hfov', hfov)
      if (yaw != this.yaw) this.$emit('update:yaw', yaw)
      if (pitch != this.pitch) this.$emit('update:pitch', pitch);
      Vue.set(this.w4uOutputs, 'yaw', {'value': yaw, 'time': 0.1});
    },
    onMouseDown () {
      this.debounceRotate()
    },
    onMouseUp () {
      this.debounceRotate()
    },
    onTouchMove () {
      //if (this.debug) this.info += ' tm'
    },
    onTouchEnd () {
      this.debounceRotate()
    },
    debounceRotate: _debounce(function () {
      // priority of orientation is higher

      //if (this.orientation) this.w4uPanoramaPlayer.startOrientation()
      //else if (this.autoRotate) this.w4uPanoramaPlayer.startAutoRotate()
    }, 3000),
      
      }, 
      computed: {  
        // play:     function() { return this.w4uInputs.play.value; },
        // fraction: function() { return this.w4uInputs.fraction.value; }, 
      },
  beforeDestroy() {
    this.w4uPanoramaPlayer.destroy()
    //window.cancelAnimationFrame(this.rafId)
  },
      mounted() {
          var panoramaDiv = pannellum;
            panoramaDiv = this.$refs.w4uPanorama; 
          
this.w4uPanoramaPlayer = window.pannellum.viewer(panoramaDiv, {  // panoramaDiv or 'w4uPanorama'
    //"title": " ",
    "type": "equirectangular",
    "panorama": this.src,
    "autoLoad": true,
    "showControls": false,
    "minPitch":-45, "maxPitch":45,
    //"avoidShowingBackground": true,
    // autoRotate: -2, 
    "vaov": 90,
    "hfov": 50,
    //"draggable": true,
    "showZoom": true,
    "showFullscreen": true,
});
  

      this.w4uPanoramaPlayer.on('load', () => {
        this.$emit('load')
      });
      this.w4uPanoramaPlayer.on('error', (err) => {
        this.$emit('error', err)
      });
      this.rafId = window.requestAnimationFrame(this.loop);

//panoramaDiv.trigger('resize');


      }   
  }
</script>

<style>
.pnlm-ui .pnlm-about-msg {
  display: none !important;
}
.pnlm-ui .pnlm-orientation-button {
  display: none !important;
}
</style>
<style scoped>
#w4uPanorama {
   width: 420px;
   height: 250px;    
 }
</style>


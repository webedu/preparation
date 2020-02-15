<template class="self">
  <span class="w4uPanorama">
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css"
    >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="w4uStyle" />
    <div
      id="w4uPanorama" 
      ref="w4uPanorama" 
    /> 
    <slot />        
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut"
    /> 
  </span>  
</template>

<script>
 
  import Vue from "vue"; 
  import W4uIo from "w4u-io";
  import pannellum from "pannellum";
  import 'pannellum/build/pannellum.css';
  import _debounce from 'lodash.debounce'

  export default {
    mixins: [W4uIo], 
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
    computed: {
      w4uStyle: function() {
         return '<style>' 
              + '#w4uPanorama { height: '+this.height+'; } '
              + '#w4uPanorama { width: '+this.width+'; } '
              + '</style>';
          }
      },
    watch: {
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


      },  
  beforeDestroy() {
    this.w4uPanoramaPlayer.destroy()
    //window.cancelAnimationFrame(this.rafId)
  },
  methods: {
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

 
  }
</script>

<style scoped>
.pnlm-ui .pnlm-about-msg {
  display: none !important;
}
.pnlm-ui .pnlm-orientation-button {
  display: none !important;
}
</style>



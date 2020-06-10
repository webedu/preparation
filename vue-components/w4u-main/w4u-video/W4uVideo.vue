<template class="self">
  <span class="w4uVideo">
    <video 
      ref="w4uVideo" 
      v-bind:controls="controls" 
      v-bind:poster="poster"
      v-bind:width="width" 
      v-bind:height="height"
    >
      Your browser does not support the video tag.
      <slot />        
    </video> 
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
      v-bind:outputs="w4uStringOut" 
    /> 
  </span>  
</template>

<script>

  // Transparency
  // https://github.com/m90/seeThru
  // https://jakearchibald.com/scratch/alphavid/

  import Vue from "vue";
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";
  import * as moment from 'moment';


  export default {
    mixins: [W4uIo, C4uGlue], 
    props: {
            name: {type: String, default: 'video0'},          //automatic numbering would need glue for unique id...
            controls: {type: Boolean, default: false},
            poster: {type: String, default: ''},
            width:  {type: String, default: '90%'}, 
            height: {type: String, default: ''}
           },

    data: function() {
           return {
             w4uInputs:  {'play': {'value': 0.0, 'time':0.0 },
                          'fraction': {'value': 0.0, 'time':0.0 },
                          'volume': {'value': 0.5, 'time':0.0 }                      // player.volume
             },
             w4uOutputs: { 'fraction': {'value': 0.0, 'time':0.0 } },
             oldTs: 0.0
            }
        },
      computed: {  
        play:     function() { return this.w4uInputs.play.value; },
        fraction: function() { return this.w4uInputs.fraction.value; }, 
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
      mounted() {
          var player = this.$refs.w4uVideo;
          player.ontimeupdate = this.timeUpdate; 
          // init all stop-events
          //this.handleIntervals(this.fraction);
      },  
      methods: {
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uChildReconnected(child) { this.handleIntervals(this.fraction); },  
        fractionToSeconds(fraction) {
           var player = this.$refs.w4uVideo;
           return fraction*player.duration;
        },
        convertTimestamp(ts) {  
         var fraction = 2.0;
         var absolute = false;
         if (ts.indexOf('%') > -1) {         // '33.3%'
            fraction = parseFloat(ts)/100.0;
         } else if (ts.indexOf(':') > -1) {  // '00:00:00.000' as 'hh:mm:ss.dec' or 'mm:ss.dec' 
            if (2 == ts.split(":").length) {
               ts = "00:"+ts;
            }
            fraction = moment.duration(ts).asSeconds();
            if(!fraction) {
               fraction = -2.2;
            }
            absolute = true;
         } else {                            // fraction 0.0-1.0  
            fraction = parseFloat(ts);
            if(fraction > 1.0) {             // or absolute time in seconds
              absolute = true;
            }
         }
         if(absolute) {
            var player = this.$refs.w4uVideo;
            fraction = fraction/player.duration;  
         }  
         return fraction;
        },
        stop() {
           var player = this.$refs.w4uVideo;
           player.pause();
           if (this.controls) { 
             player.controls=true; 
           }
        },
        timeUpdate() {
           var player = this.$refs.w4uVideo;
           var deltaTs = Math.abs(player.currentTime-this.oldTs); 
           this.oldTs = player.currentTime;
           var fractionTime = player.currentTime / player.duration;
           Vue.set(this.w4uOutputs, 'fraction', {'value': fractionTime, 'time': deltaTs}); /// deltaTS
           this.handleIntervals(fractionTime);
           this.handleStops(fractionTime);
	},
        handleIntervals(fraction) {
          if(this.c4uChildren['w4u-interval']) {
            for(var i=0; i<(this.c4uChildren['w4u-interval'].length); i++) {
              var interval = this.c4uChildren['w4u-interval'][i];
              interval.update(fraction);
            }
          }
        }, 
        handleStops(fraction) {
          if(this.c4uChildren['w4u-stop']) {
            for(var i=0; i<(this.c4uChildren['w4u-stop'].length); i++) {
              var stop = this.c4uChildren['w4u-stop'][i];
              stop.update(fraction);
            }
          }
        },        
      }, 
 
  }
</script>

<style scoped>
</style>

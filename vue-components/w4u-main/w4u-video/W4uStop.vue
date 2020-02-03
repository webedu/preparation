<template class="self">
  <span class='w4uVideoStop'> 
     <!--w4u-io v-bind:name="name"></w4u-io--> 
     <div class="w4uStop" ref="w4uStop"> 
       <slot></slot>  
     </div>
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  import * as moment from 'moment';
  // moment.js
  // https://stackoverflow.com/questions/19355952/make-html5-video-stop-at-indicated-time 
  // https://momentjs.com/docs/#/durations/seconds/
  // moment.duration('23:59:59.999');  moment.duration(1500).asSeconds(); // 1.5
  export default {
    props: {
            name: {type: String, default: 'stop0'},          //automatic numbering would need glue for unique id...
            ts: {type: String, default: '0.5'}               // float 0.0-1.0 or '00:00:00' as 'hh:mm:ss' or '2.56 s' or float>1.0
           },
    data: function() {
           return {
             c4uParentTag: "w4u-video"
            }
        },
    mixins: [C4uGlue],
    methods: {
      // dont use events here, simply check if
      // previous update ts < stop and current >=
      addEvent() {
         var player = this.c4uParent.$refs.w4uVideo;
         player.addEventListener("timeupdate", this.stopEvent);
      },
      stopEvent() {
        if(this.currentTime >= 5 * 60) { // mmmhh
            this.pause();
    
            // remove the event listener after you paused the playback
            // this.removeEventListener("timeupdate",this.stopEvent);  this?? (1st video , 2nd stop)
        }
      },
    }, 
    computed: {
    } 
  }
</script>

<style scoped>
  .w4uVideoStop {
    
  }
</style>

<template class="self">
  <span class='w4uVideoInterval'> 
     <w4u-io v-bind:name="name" v-bind:outputs="w4uStringOut"></w4u-io> 
     <div class="w4uInterval" ref="w4uInterval"> 
       <slot></slot>  
     </div>
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";
  import * as moment from 'moment';

  export default {
    props: {
            name:  {type: String, default: 'interval0'}, //automatic numbering would need glue for unique id...
            begin: {type: String, default: '0.0'},       // float 0.0-1.0 or '00:00:00' as 'hh:mm:ss' or '2.56 s' or float>1.0
            end:   {type: String, default: '1.0'},       // float 0.0-1.0 or '00:00:00' as 'hh:mm:ss' or '2.56 s' or float>1.0
            mode:  {type: String, default: 'constant'},  // 'constant','decay','gain','rise','fall'
           },
    data: function() {
           return {
             c4uParentTag: "w4u-video",
             w4uOutputs: {'out': {'value': 0.5, 'time':0.0 }  //output: 0.0-1.0

             }
            }
        },
    mixins: [W4uIo, C4uGlue], 
    methods: {
      update(fracVideo) {  
        var fracInterval = (fracVideo - this.beginFraction)/(this.endFraction - this.beginFraction); 
        var newValue = min(max(fracInterval, 0.0),1.0);
        Vue.set(this.w4uOutputs, 'out', {'value': newValue, 'time': 0.1});  // deltaTime
        //better: use compute and watch for sending changes only (see slider)
      }
    },
    computed: {
      convertTimestamp(ts) {  // must be method....
         // float 0.0-1.0 
         // or '33.3%'
         // or '00:00:00.000' as 'hh:mm:ss.dec' or 'mm:ss.dec' 
         // or '2.56 s' or float>1.0
         // moment.duration('23:59:59.999');  moment.duration(1500).asSeconds(); // 1.5
         return 0.5;
      },
      beginFraction() {
        // video.duration
        return 0.3;
      },
      endFraction() {
        return 0.7;
      }
    },
  }
</script>

<style scoped>
  .w4uSprite {
    position: absolute;
  }
</style>

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
             w4uOutputs: {'out': {'value': 0.5, 'time':0.0 },  //output: 0.0-1.0
             oldFraction: 0.0,
             beginTs: 0.0,
             endTs: 1.0
             }
            }
        },
    mixins: [W4uIo, C4uGlue], 
    methods: {
      init(parent) {
        if(parent) {
            this.beginTs = parent.convertTimestamp(this.begin);
            this.endTs = parent.convertTimestamp(this.end);
        }
      },      
      update(fraction) {  
        if(!this.beginTs || !this.endTs) { this.init(this.c4uParent); }
        var deltaTs = Math.abs(fraction-this.oldFraction); 
        if(this.c4uParent) {deltaTs = this.c4uParent.fractionToSeconds(deltaTs); } 
        var fracInterval = (fraction - this.beginTs)/(this.endTs - this.beginTs); 
        var newValue = 1.0;
        if(['raise','fall','decay','gain'].includes(this.mode))  {
            newValue = Math.min(Math.max(fracInterval, 0.0),1.0);
        }
        if(['fall','decay'].includes(this.mode)) {
            newValue = 1.0-newValue;
        }
        if(['gain','decay','constant'].includes(this.mode)) {
           if((fracInterval > 1.0) || (fracInterval < 0.0))  { //outside interval
              newValue = 0.0;  
           }
        }         
        if(Math.abs(this.w4uOutputs.out.value-newValue) > 0.001) {
          Vue.set(this.w4uOutputs, 'out', {'value': newValue, 'time': deltaTs});  // deltaTime
          this.oldFraction = fraction;  
        }
      }
    },
    watch: {
    },  
    computed: {
    },
    mounted() {
    }  
  }
</script>

<style scoped>
  .w4uSprite {
    position: absolute;
  }
</style>

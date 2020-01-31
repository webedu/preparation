<template class="self">
  <span class='w4uVideoInterval'> 
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn"></w4u-io> 
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
            begin: {type: String, default: '0.0'},
            end:   {type: String, default: '1.0'},
            mode:  {type: String, default: 'constant'},  // 'constant','decay','gain','rise','fall'
           },
    data: function() {
           return {
             c4uParentTag: "w4u-video",
             w4uInputs:  {'x': {'value': 0.5, 'time':0.0 }  //output: sweep/signal/out/...

             }
            }
        },
    mixins: [W4uIo, C4uGlue], 
    computed: {

      },
    } 
  }
</script>

<style scoped>
  .w4uSprite {
    position: absolute;
  }
</style>

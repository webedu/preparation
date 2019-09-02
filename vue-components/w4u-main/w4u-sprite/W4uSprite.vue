<template class="self">
  <span class='w4uSprite'> 
     <span v-html="w4uStyle"></span>
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn" v-bind:outputs="w4uStringOut"></w4u-io> 
     <span class="w4uSprite2"> 
       <slot></slot>  
     </span>
  </span>  
</template>

<script>
  //import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    props: {
            name: {type: String, default: 'sprite0'},          //automatic numbering would need glue for unique id...
            // width:  175px 
            // height: 175px
            // bumping: xxx  // behavior on border  
           },
    data: function() {
           return {
             w4uInputs:  {'x': {'value': 0.5, 'time':0.0 },
                          'y': {'value': 0.5, 'time':0.0 }
             }
            }
        },
    mixins: [W4uIo], 
    computed: {
      w4uStyle: function() {
         return '<style>' 
              + '.w4uSprite2 { left: '+Math.round(100*this.w4uInputs.x.value).toString()+'px ; } '
              + '.w4uSprite2 { bottom: '+Math.round(100*this.w4uInputs.y.value).toString()+'px ; } ' 
              + '</style>';
      }
    } 
  }
</script>

<style scoped>
  .w4uSprite2 {
    position: absolute;

  }
</style>

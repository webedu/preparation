<template class="self">
  <span class='w4uVisibility'> 
     <span v-html="w4uStyle"></span>
     <w4u-io v-bind:name="name" v-bind:inputs="w4uStringIn"></w4u-io> 
     <div class="w4uVisibility" ref="w4uVisibility"> 
       <slot></slot>  
     </div>
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    props: {
            name: {type: String, default: 'visibility0'},          //automatic numbering would need glue for unique id...
            mode: {type: String, default: 'display'},              //opacity, visible, display
           },
    data: function() {
           return {
             //c4uParentTag: "w4u-stage",
             w4uInputs:  {'show': {'value': 1.0, 'time':0.0 },  //0.0-1.0
             },
            }
        },
    mixins: [W4uIo, C4uGlue], 
    computed: {
      w4uStyle: function() {
         var opacity = 1.0;
         var opacityStyle = '.w4uVisibility { opacity: 1.0; } ';
         var visibilityStyle = '.w4uVisibility { visibility: visible; } ';
         var displayStyle = ''; // display: block; or similiar
         var show = this.w4uInputs.show.value;

         if('opacity' == this.mode) {
           opacityStyle = '.w4uVisibility { opacity: '+show.toString()+'; } ';
         }
         if(show<0.5) {
           if('visible' == this.mode) {
             visibilityStyle = '.w4uVisibility { visibility: hidden; } ';
           }
           if('display' == this.mode) {
             displayStyle = '.w4uVisibility { display: none; } ';
           }
         }

         return '<style>' 
              + opacityStyle
              + visibilityStyle
              + displayStyle
              + '</style>';
      },
    } 
  }
</script>

<style scoped>
  .w4uVisibility {
  }
</style>

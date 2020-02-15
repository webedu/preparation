<template class="self"> 
  <span class="w4uVisibility"> 
    <link
      v-for="(href, key) in globalCss" 
      v-bind:key="key"
      v-bind:href="href" 
      rel="stylesheet"  
      type="text/css"
    > 
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="w4uStyle" />
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn" 
    /> 
    <div
      ref="w4uVisibility"
      class="w4uVisibility"
    > 
      <slot />
    </div>
  </span> 
</template>

<script>
  import C4uCss from "c4u-css";
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [C4uCss, W4uIo, C4uGlue], 
    props: {
            name: {type: String, default: 'visibility0'},          //automatic numbering would need glue for unique id...
            mode: {type: String, default: 'display'},              //opacity, visible, display
            default: {type: String, default: 'show'},              //show, hide
           },
    data: function() {
           return {
             //c4uParentTag: "w4u-stage",
             w4uInputs:  {'show': {'value': ('show' == this.default ? 1.0 : 0.0), 'time':0.0 },  //0.0-1.0
             },
            }
        },
    computed: {
      w4uStyle: function() {
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

<template>  
  <div class='w4uSvg'>
  <svg id='w4uSvg' ref='w4uSvg'></svg>
  <slot></slot>
 </div> 
  </div>
</template>
 
<style scoped>
  .w4uSvg { 
    background: green;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  import SnapSvg from "snapsvg-cjs";
  import SnapFoo from "snapfoo";
 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            }
        },
    mixins: [C4uGlue], 

    mounted() {
         console.log("*****  SVG mounted #" + this.c4uUid);
         var svg = this.$refs.w4uSvg;
         var s = Snap(svg);
         var bigCircle = s.circle(150, 150, 100);
         bigCircle.animate({r: 50}, 1000);
         
    },

  }
</script>

<template>
  <div class="w4uSvg">
    <svg 
      id="w4uSvg" 
      ref="w4uSvg"
    />
    <slot />
  </div>
</template>
 
<style scoped>
  svg#w4uSvg { 
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  import SnapSvg from "snapsvg-cjs";
  //import SnapFoo from "snapfoo";
 
  export default {
    mixins: [C4uGlue], 
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            svgStage: null,
            }
        },
    mounted() {
         //console.log("*****  SVG mounted #" + this.c4uUid);
         var svg = this.$refs.w4uSvg;
         //this.svgStage = Snap(svg);
         this.svgStage = SnapSvg(svg);
    },
    methods: {
      getSvgStage() {
          return this.svgStage;
      },
      getSvgBox() {
          return this.$refs.w4uSvg.getBoundingClientRect();
      }, 
    },     


  }
</script>

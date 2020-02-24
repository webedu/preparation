<template class="self">
  <span 
    ref="w4uSpriteFrame" 
    class="w4uSpriteFrame"> 
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="w4uStyle" />
    <w4u-io 
      v-bind:name="name" 
      v-bind:inputs="w4uStringIn"
    /> 
    <div
      ref="w4uSpriteDrag"
      class="w4uSpriteDrag"
      draggable="true"
    > 
     <div
       ref="w4uSprite"
       class="w4uSprite"
     > 

       <slot />  
     </div>
    </div>
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [W4uIo, C4uGlue], 
    props: {
            name: {type: String, default: 'sprite0'},          //automatic numbering would need glue for unique id...
            // width:  175px 
            // height: 175px
            // bumping: xxx  // behavior on border  
           },
    data: function() {
           return {
             c4uParentTag: "w4u-stage",
             w4uInputs:  {'x': {'value': 0.5, 'time':0.0 },  //X position horizontal
                          'y': {'value': 0.5, 'time':0.0 },  //Y position vertical
                          's': {'value': 1.0, 'time':0.0 },  //scale xy
                          'a': {'value': 0.0, 'time':0.0 },  //rotation Angle
                          'o': {'value': 1.0, 'time':0.0 },  //Opacity
                          'z': {'value': 1.0, 'time':0.0 },  //Z-Index
             },
             //old 
            }
        },
    computed: {
      w4uStyle: function() {
         var x = 100.0*this.w4uInputs.x.value;
         var y = 100.0*this.w4uInputs.y.value;
         var s = 1.0*this.w4uInputs.s.value;
         var a = 360.0*this.w4uInputs.a.value;
         var z = Math.round(100.0*this.w4uInputs.z.value);
         if(this.c4uParent && this.$refs.w4uSprite) {
           var stageBox = this.c4uParent.getStageBox();
           // var spriteBox = this.$refs.w4uSprite.getBoundingClientRect();
           x = this.w4uInputs.x.value*(stageBox.right-stageBox.left);
           y = this.w4uInputs.y.value*(stageBox.bottom-stageBox.top);
         }
         return '<style>' 
              + '.w4uSprite { transform-origin: 50% 50%; } '
              + '.w4uSprite { opacity: '+this.w4uInputs.o.value.toString()+'; } '
              + '.w4uSprite { z-index: '+z.toString()+'; } '
              + '.w4uSprite { transform:  translateX(calc('+x.toString()+'px - 50%)) ' 
              + '             translateY(calc('+y.toString()+'px - 50%)) ' 
              + '             scale('+s.toString()+') '
              + '             rotate('+a.toString()+'deg); } ' 
            //  + '.w4uSprite { transition: transform 0.01s linear; } ' 
              + '</style>';
      },
    } 
  }
</script>

<style scoped>
  .w4uSpriteDrag {
    position: absolute;  
    touch-action: none;
    user-select: none;
    -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
  }
  .w4uSprite {
    position: absolute;
    touch-action: none;
    user-select: none;
  }

</style>

<template class="self">
  <span class="w4uDragFrame"> 
    <w4u-io 
      v-bind:name="name" 
      v-bind:outputs="w4uStringOut"
    /> 
  </span> 
</template>

<script>
//  import Vue from "vue";
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";
//  import interact from "interactjs";

  export default {
    mixins: [W4uIo, C4uGlue], 
    props: {
            name: {type: String, default: 'drag0'},          //automatic numbering would need glue for unique id...
           },
    data: function() {
           return {
             c4uParentTag: "w4u-sprite",
             w4uOutputs: { 'x': {'value': 0.5, 'time':0.0 },
                           'y': {'value': 0.5, 'time':0.0 },
                           'a': {'value': 0.5, 'time':0.0 },

                         },
             w4uDragger: null,
            }
        },
     mounted() {
      this.createElem();
     },
     methods: { /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentDisconnected(parent) {
           this.deleteElem();
        }, /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        c4uParentReconnected(parent) {
           this.createElem();
        },

        mouseMove (mouseEvent) {
  var xpos;
  var ypos;
  if (mouseEvent)
  {
    //FireFox
    xpos = mouseEvent.pageX - document.body.scrollLeft;
    ypos = mouseEvent.pageY - document.body.scrollTop;
  }
  else
  {
    //IE
    xpos = window.event.x + 2;
    ypos = window.event.y + 2;
  }
  if(mouseEvent.buttons) {
   var target = mouseEvent.currentTarget;
   if(target.hasAttribute('is-dragging')) {
     if(!target.getAttribute('mouse-x')) {
       target.setAttribute('mouse-x', xpos.toString());
       target.setAttribute('mouse-y', ypos.toString());
               console.log("mouse0 x:"+xpos.toString()+" y:"+ypos.toString());
     } else {
       var mx = parseFloat(target.getAttribute('mouse-x')); 
       var my = parseFloat(target.getAttribute('mouse-y'));
       //target.setAttribute('data-x', xpos.toString());
       //target.setAttribute('data-y', ypos.toString());
               console.log("drag0 x:"+mx.toString()+" y:"+my.toString());
               console.log("drag  x:"+xpos.toString()+" y:"+ypos.toString());
               console.log("delta x:"+ (xpos-mx).toString()+" y:"+(ypos-my).toString());
       target.style.webkitTransform =
         target.style.transform =
           'translate(' + (xpos-mx).toString() + 'px, ' + (ypos-my).toString() + 'px)';
     }


   }
  }
        },
        dragStart (event) {
             // eslint-disable-next-line no-console            
             console.log("started");
             event.dataTransfer.dropEffect = "move";
             event.dataTransfer.setData("text/plain", event.target.id);

  var emptyImage = document.createElement('img');
  // Set the src to be a 0x0 gif
  emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  event.dataTransfer.setDragImage(emptyImage, 0, 0);

             event.currentTarget.setAttribute('is-dragging', 'true');
        },
        dragUpd (event) {
             // eslint-disable-next-line no-console            
             console.log("updated");

  var x = (parseFloat(event.currentTarget.getAttribute('mouse-x')) || 0);
  var y = (parseFloat(event.currentTarget.getAttribute('mouse-y')) || 0);

             // eslint-disable-next-line no-console        
             console.log("coord: dx:"+x.toString()+" dy:"+y.toString());



        },
        dragEnd (event) {
             // eslint-disable-next-line no-console            
             console.log("ended");



var target = event.currentTarget;
   if(target.hasAttribute('is-dragging')) {

       // var mx = parseFloat(target.getAttribute('mouse-x')); 
       // var my = parseFloat(target.getAttribute('mouse-y'));
       //target.setAttribute('data-x', xpos.toString());
       //target.setAttribute('data-y', ypos.toString());
        //       console.log("drag0 x:"+mx.toString()+" y:"+my.toString());
        //      console.log("drag  x:"+xpos.toString()+" y:"+ypos.toString());
        //       console.log("delta x:"+ (xpos-mx).toString()+" y:"+(ypos-my).toString());
       target.style.webkitTransform =
         target.style.transform =
           'translate(0px,0px)';
       target.removeAttribute('is-dragging');
       target.removeAttribute('mouse-x');
       target.removeAttribute('mouse-y');

/*
       var vueSprite = vueDrag.c4uParent;
       var stageBox = "self";
       if(vueSprite && vueSprite.c4uParent) {
         stageBox = vueSprite.c4uParent.getStageBox();
       }
       var time = 0.1;
       var x = (xpos - stageBox.left)/(stageBox.right-stageBox.left);
       Vue.set(vueDrag.w4uOutputs, 'x', {'value': x, 'time': time });   
       var y = (ypos - stageBox.top)/(stageBox.bottom-stageBox.top);
       Vue.set(vueDrag.w4uOutputs, 'y', {'value': y, 'time': time });  
*/

   }


        },
        createElem() {
/*
         const vueDrag = this;
             var vueSprite = vueDrag.c4uParent;
             var stageBox = "self"; 
             if(vueSprite && vueSprite.c4uParent) {
               stageBox = vueSprite.c4uParent.getStageBox();
             }
*/
         // const vueDrag = this;
         if(this.c4uParent) {
           this.deleteElem();
         }
         var sprite = this.c4uParent.$refs.w4uSpriteDrag;
          // Add the ondragstart event listener
          sprite.addEventListener("dragstart", this.dragStart);
          //sprite.addEventListener("drag", this.dragUpd);
          sprite.addEventListener("dragend", this.dragEnd);
          //var frame = this.c4uParent.c4uParent.$refs.w4uStage;
          sprite.addEventListener("mousemove", this.mouseMove);
            // eslint-disable-next-line no-console 
           console.log("init");
	},
        deleteElem() {
          var sprite = this.c4uParent.$refs.w4uSpriteDrag;
          // Add the ondragstart event listener
          sprite.removeEventListener("dragstart", this.dragStart);
          sprite.addEventListener("dragend", this.dragEnd);
          sprite.addEventListener("mousemove", this.mouseMove);
         if(this.w4uDragger) {
           this.w4uDragger.unset();
           //interact(this.c4uParent.$refs.w4uSprite).unset();
           this.w4uDragger = null;
         }
	}, 
      },

  }
</script>

<style scoped>
  .w4uDragFrame {
  }
</style>

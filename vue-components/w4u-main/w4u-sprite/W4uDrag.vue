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
  import interact from "interactjs";

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


        dragMoveListener (event) {
             // eslint-disable-next-line no-console            
             console.log("moved");
             // eslint-disable-next-line no-console 
console.log("event x0:"+event.x0.toString()+" dx:"+event.dx.toString());
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx/1.0
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy/1.0

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
},


        createElem() {
         const vueDrag = this;
             var vueSprite = vueDrag.c4uParent;
             var stageBox = "self";
             if(vueSprite && vueSprite.c4uParent) {
               stageBox = vueSprite.c4uParent.getStageBox();
             }

         if(this.c4uParent) {
           this.deleteElem();
           //this.w4uDragger = interact(this.c4uParent.$refs.w4uSprite);
           this.w4uDragger = interact(this.c4uParent.$refs.w4uSpriteDrag);
           this.w4uDragger = this.w4uDragger.draggable({
    inertia: true,
    autoScroll: true,
    modifiers: [
      interact.modifiers.restrict({
        //restriction: this.c4uParent.c4uParent.$refs.w4uStage,
        restriction: stageBox,
        endOnly: true
      })
    ],
         onend: {function(event) { 
             // eslint-disable-next-line no-console            
             console.log("ended");
         }},
         onmove: this.dragMoveListener,
         listeners: {
           /*eslint no-unused-vars: ["error", { "args": "none" }]*/
           start(event) {
             // eslint-disable-next-line no-console
             console.log("start it");
           },
           /*eslint no-unused-vars: ["error", { "args": "none" }]*/ 
           move(event) {
             // eslint-disable-next-line no-console            
             console.log("move it");
             // eslint-disable-next-line no-unused-vars
             var e = event;
             var vueSprite = vueDrag.c4uParent;
             if(vueSprite) {
               // eslint-disable-next-line no-console        
               console.log("parent x0:"+event.x0.toString()+" dx:"+event.dx.toString());
/*
               var stageBox = vueSprite.c4uParent.getStageBox();

               var time = event.dt/1000.0;
               var x = (event.x0 + event.dx - stageBox.left)/(stageBox.right-stageBox.left);
               Vue.set(vueDrag.w4uOutputs, 'x', {'value': x, 'time': time });   
               var y = (event.y0 + event.dy - stageBox.top)/(stageBox.bottom-stageBox.top);
               Vue.set(vueDrag.w4uOutputs, 'y', {'value': y, 'time': time });  
*/
             }         
           },  
           /*eslint no-unused-vars: ["error", { "args": "none" }]*/
           e2nd(event) {
             // eslint-disable-next-line no-console
             console.log("end it");
             // eslint-disable-next-line no-unused-vars
             var e = event;
/*
             var vueSprite = vueDrag.c4uParent;
             if(vueSprite) {
               // eslint-disable-next-line no-console        
               console.log("parent2 x0:"+event.x0.toString()+"dx:"+event.dx.toString());
               var stageBox = vueSprite.c4uParent.getStageBox();

               var time = event.dt/1000.0;
               var x = (event.x0 + event.dx - stageBox.left)/(stageBox.right-stageBox.left);
               Vue.set(vueDrag.w4uOutputs, 'x', {'value': x, 'time': time });   
             } 
*/
           },
 
          }
       });
this.w4uDragger = this.w4uDragger.on('dragmove', function (event) {  // call this listener on every dragmove
             // eslint-disable-next-line no-console
             console.log("dragmove it");
  });
this.w4uDragger = this.w4uDragger.dropzone({
    ondrop: function (event) {
             // eslint-disable-next-line no-console
             console.log("drop it");
    }
  })
  .on('dropactivate', function (event) {
             // eslint-disable-next-line no-console
             console.log("drop soon");
  });
            // eslint-disable-next-line no-console 
           console.log("init");
         }
	},
        deleteElem() {
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

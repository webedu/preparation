<template class="self">
  <span class="w4uDragFrame"> 
    <w4u-io 
      v-bind:name="name" 
      v-bind:outputs="w4uStringOut"
    /> 
  </span> 
</template>

<script>
  import Vue from "vue";
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
        createElem() {
         const vueDrag = this;
         if(this.c4uParent) {
           this.deleteElem();
           this.w4uDragger = interact(this.c4uParent.$refs.w4uSprite);
           this.w4uDragger.draggable({
         onend: {function(event) { 
             // eslint-disable-next-line no-console            
             console.log("ended");
         }},
         listeners: {
           /*eslint no-unused-vars: ["error", { "args": "none" }]*/
           start(event) {
             // eslint-disable-next-line no-console
             console.log("started");
           },
           /*eslint no-unused-vars: ["error", { "args": "none" }]*/ 
           move(event) {
             // eslint-disable-next-line no-console            
             console.log("moved");
             // eslint-disable-next-line no-unused-vars
             var e = event;
             var vueSprite = vueDrag.c4uParent;
             if(vueSprite) {
               // eslint-disable-next-line no-console        
               console.log("parent x0:"+event.x0.toString()+"dx:"+event.dx.toString());
               var stageBox = vueSprite.c4uParent.getStageBox();

               var time = event.dt/1000.0;
               var x = (event.x0 + event.dx - stageBox.left)/(stageBox.right-stageBox.left);
               Vue.set(vueDrag.w4uOutputs, 'x', {'value': x, 'time': time });   
             }         
           },  
           /*eslint no-unused-vars: ["error", { "args": "none" }]*/
           end(event) {
             // eslint-disable-next-line no-console
             console.log("ended2");
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
            // eslint-disable-next-line no-console 
           console.log("init");
         }
	},
        deleteElem() {
         if(this.w4uDragger) {
           //this.w4uDragger.unset();
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

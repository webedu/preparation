<template>  
  <div 
    id="mktodo" 
    class="c4uPages"
  >
    <!--div style='position: relative;float:right;' -->
    <slot />
  <!-- /div --> 
  </div>
</template>
 
<style scoped>
  .c4uPages {
    float: left;
    width: 100%;
    overflow:hidden;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
//  import ZingTouch from "zingtouch";
 
  export default {
    mixins: [C4uGlue],
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            c4uCurrentPage: null,
            }
        },
    computed: {
      c4uAllPages: function() {
         return this.c4uChildren['c4u-page'];
      }  
    },
    mounted() {
         /*
         var swipeElement = document.getElementById('mktodo');
         activeRegion.bind(swipeElement, 'swipe', function() {
            alert("swiped");
         });
         */ 
    }, 
    methods: { 
       /*eslint no-unused-vars: ["error", { "args": "none" }]*/
       c4uChildDisconnected(child) { this.updateDisableStatus(); },  
       /*eslint no-unused-vars: ["error", { "args": "none" }]*/
       c4uChildReconnected(child) { this.updateDisableStatus(); },  
       previousPage: function () {
         if(this.previousPageExists()) {
            for(var i=1; i<this.c4uAllPages.length; i++) {
               if(this.c4uCurrentPage.c4uUid == this.c4uAllPages[i].c4uUid) {
                  this.c4uCurrentPage.pageDirection = "c4uBackward";
                  this.c4uCurrentPage.pageVisible = false;
                  this.c4uCurrentPage= this.c4uAllPages[i-1];
                  this.c4uCurrentPage.pageDirection = "c4uBackward";
                  this.c4uCurrentPage.pageVisible = true;
                  this.updateDisableStatus();
                  return true;
               }  
            }
         }
         return false; 
       },
       nextPage: function () {
         if(this.nextPageExists()) {
            for(var i=0; i<(this.c4uAllPages.length-1); i++) {
               if(this.c4uCurrentPage.c4uUid == this.c4uAllPages[i].c4uUid) {
                  this.c4uCurrentPage.pageDirection = "c4uForward";
                  this.c4uCurrentPage.pageVisible = false;
                  this.c4uCurrentPage= this.c4uAllPages[i+1];
                  this.c4uCurrentPage.pageDirection = "c4uForward";
                  this.c4uCurrentPage.pageVisible = true;
                  this.updateDisableStatus();
                  return true;
               }  
            }
         }
         return false;
       },
       previousPageExists: function () {
          if (!this.c4uCurrentPage) { return false; }
          if (this.c4uAllPages.length < 2) { return false; }
          if (this.c4uCurrentPage.c4uUid == this.c4uAllPages[0].c4uUid) { return false; }
          return true;  
       }, 
       nextPageExists: function () {
          if (!this.c4uCurrentPage) { return false; }
          if (this.c4uAllPages.length < 2) { return false; }
          if (this.c4uCurrentPage.c4uUid == this.c4uAllPages[this.c4uAllPages.length-1].c4uUid) { return false; }
          return true;  
       }, 
       updateDisableStatus: function () {
         if('c4u-page-forward' in this.c4uChildren) {
           for(var f=0; f<(this.c4uChildren['c4u-page-forward'].length); f++) {
             this.c4uChildren['c4u-page-forward'][f].updateDisableStatus();
           }
         }
         if('c4u-page-backward' in this.c4uChildren) {
           for(var b=0; b<(this.c4uChildren['c4u-page-backward'].length); b++) {
             this.c4uChildren['c4u-page-backward'][b].updateDisableStatus();
           }
         }
       },
       addOne: 
        /*eslint no-unused-vars: ["error", { "args": "none" }]*/
        function(event) {
          this.counter += 1;
       },
    },


  }
</script>

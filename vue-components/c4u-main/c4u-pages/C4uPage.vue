<template class="self">
  <div class='c4uPage' v-bind:class="pageDirection" v-show="pageVisible">
  <slot></slot> 
  </div> 
</template>

<style scoped>
  * { w2idth:100%; 
      d2isplay: inline-block;
    }
  .c4uPage {
    p2osition: absolute;
    w2idth:100%;
    l2eft: 0%;
    t2op: 200px;
  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    data: function() {
           return {
            c4uParentTag: "c4u-pages",
            pageVisible: false,
            pageDirection: "c4uFast"
            }
        },
    mixins: [C4uGlue], 
    methods: { 
       hide: function() {this.pageVisible = false; },
       show: function() {this.pageVisible = true; },
       addOne: function(event) {
          this.counter += 1;
          if (this.c4uParent) {
            this.c4uParent.counter += 100;
          }
       },
    },
    updated() {
         if (this.c4uParent && !this.c4uParent.c4uCurrentPage) {
            this.c4uParent.c4uCurrentPage = this;
            this.pageVisible = true; 
         } 
    },
  }
</script>

<template class="self">
  <div 
    ref="c4uRow" 
    class="c4uRow"
  >
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-html="w4uStyle" />
    <div class="c4uRow2">
      <div class="c4uCol2"></div>
      <slot /> 
      <div class="c4uCol2"></div>
    </div>
  </div> 
</template>

<style scoped>
  .c4uRow {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-left: auto;
    margin-right: auto;
    background-color: red;
  }
  .c4uRow2 {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
  }

</style>

<script>
//  import Vue from "vue";
  import C4uGlue from "c4u-glue";
//  import Bootstrap from "bootstrap";
//  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  Vue.use(BootstrapVue);
//  Vue.use(IconsPlugin);
//  import "bootstrap/dist/css/bootstrap.css";
//  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
    mixins: [C4uGlue],
    data: function() {
           return {
            c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            c4uCurrentPage: null,
            c4uAbsBorder: 50,
            }
        },
    mounted() {
      var rowElem = this.$refs.c4uRow;
      rowElem.addEventListener("resize", this.rowResize);
      window.addEventListener("resize", this.windowResize);
      this.calculateWidth();
    },
  beforeDestroy() {
      var rowElem = this.$refs.c4uRow;
      rowElem.removeEventListener("resize", this.rowResize);
      window.removeEventListener("resize", this.windowResize);
  },
    computed: {
      w4uStyle: function() {
         return '<style>' 
              + '.c4uCol2 { max-width: '+this.c4uAbsBorder.toString()+'px; } '
              + '.c4uCol2 { width: '+this.c4uAbsBorder.toString()+'px; } '
              + '</style>';
          }
      },
    methods: { 
       windowResize: function () {
           // eslint-disable-next-line no-console
           console.log('window resize happened in c4u-row');
           this.handleColumns();
         },
       rowResize: function () {
           // eslint-disable-next-line no-console
           console.log('row resize happened in c4u-row');
         },
      getRowBox() {
          return this.$refs.c4uRow.getBoundingClientRect();
      }, 
        handleColumns() {
          this.calculateBorder();
          if(this.c4uChildren['c4u-coll']) {
            for(var i=0; i<(this.c4uChildren['c4u-coll'].length); i++) {
              var column = this.c4uChildren['c4u-coll'][i];
              column.calculateWidth();
            }
          }
        },
      calculateWidths() {
           var rowBox = this.getRowBox();
           var rowWidth = rowBox.right-rowBox.left;
           var borderWidth = rowWidth;
           var contentWidth = rowWidth;
           // add type:  xs, sm, md, lg, xl
           //             544, 768, 992, 1200
           //             540, 720, 960, 1140
           if (rowWidth > 600) {
              contentWidth *= 10.0/12.0;
              borderWidth *= 1.0/12.0;
           } else {
              borderWidth = 0.0;
           }
           return {border: Math.floor(borderWidth), content: Math.floor(contentWidth), row: Math.round(rowWidth)};
      },
      calculateBorder() {
         if(this.$refs.c4uRow) {
           var widths = this.calculateWidths();
           this.c4uAbsBorder = widths.border;
         }          
      }

       },
    



  }
</script>

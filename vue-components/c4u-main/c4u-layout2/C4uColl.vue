<template class="self">
 <span class="c4uColx"> 
  <link
    v-for="(href, key) in globalCss" 
    v-bind:key="key"
    v-bind:href="href" 
    rel="stylesheet"  
    type="text/css"
  > 
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-html="w4uStyle" />
  <div ref="c4uCol"
       class="c4uCol">
    <slot /> 
  </div>
 </span>
</template>

<style scoped>
 .c4uCol { border: 1px dotted blue; }
</style>

<script>
  import C4uCss from "c4u-css";
//  import Vue from "vue";
  import C4uGlue from "c4u-glue";
//  import Bootstrap from "bootstrap";
//  import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
//  Vue.use(BootstrapVue);
//  Vue.use(IconsPlugin);
//  import "bootstrap/dist/css/bootstrap.css";
//  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
    mixins: [C4uCss, C4uGlue],
    props: {
            name: {type: String, default: 'col0'},   //automatic numbering would need glue for unique id...
            width:  {type: String, default: '20%'},
            padding: {type: String, default: '15px'} 
           },
    data: function() {
           return {
             c4uParentTag: "c4u-roww",
             c4uAbsWidth: 200, 
           }
        },
    mounted() {
      this.calculateWidth();
    },
    computed: {
      w4uStyle: function() {
         return '<style>' 
              + '.c4uCol { max-width: '+this.c4uAbsWidth.toString()+'px; } '
              + '.c4uCol { width: '+this.c4uAbsWidth.toString()+'px; } '
              + '.c4uCol { padding-right: '+this.padding+'; } '
              + '.c4uCol { padding-left: '+this.padding+'; } '
            //  + '.c4uCol { position: relative; } ' 
              + '</style>';
          }
      },
    methods: {
      calculateWidth() {
         if(this.c4uParent && this.$refs.c4uCol) {
           var rowWidths = this.c4uParent.calculateWidths();
           //var rowWidth = rowWidths.row;
           var contentWith = rowWidths.content;

           var fraction = 1/3.0;  // from this.width (% or px)
           if (this.width.indexOf('%') > -1) {         // '33.3%'
            fraction = parseFloat(this.width)/100.0;
           } 
           // adapt percentage according to width (left-, rigth-border & double or maximize)
           //if (rowWidth < 400) {
           //   fraction = 1.0;
           //}
           this.c4uAbsWidth = Math.floor(fraction*contentWith);
         }          
      }
    }
  }
</script>



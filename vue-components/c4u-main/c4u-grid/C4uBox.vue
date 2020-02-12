<template class="self">
  <span class="c4uBox">
    <link 
      v-for="(href, key) in globalCss" 
      v-bind:key="key" 
      v-bind:href="href" 
      rel="stylesheet" 
      type="text/css"
    > 
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="c4uStyle" />
    <span class="c4uBox2">
      <slot /> 
    </span> 
  </span> 
</template>

<style scoped>
  .c4uBox {
  }
</style>

<script>
  import C4uCss from "c4u-css";
  //import C4uGlue from "c4u-glue";
 
  export default {
    mixins: [C4uCss], 
    props: {
            name: {type: String, default: 'box0'},          //automatic numbering would need glue for unique id...
            column:  {type: Number, default: 1}, 
            row:     {type: Number, default: 1},
            width:   {type: Number, default: 1}, 
            height:  {type: Number, default: 1}, 
           },
    data: function() {
           return {
            // c4uParentTag: "c4u-also-to-be-defined",  // no parent tag
            }
        },
    computed: {
      c4uStyle: function() {
         var colStart = this.column;
         var rowStart = this.row;
         var colEnd = this.column + this.width;
         var rowEnd = this.row + this.height;
         // may use parent size for limitation... 
         return '<style>' 
              + '.c4uBox { grid-column-start: '+colStart+'; } '
              + '.c4uBox { grid-row-start: '+rowStart+'; } '
              + '.c4uBox { grid-column-end: '+colEnd+'; } '
              + '.c4uBox { grid-row-end: '+rowEnd+'; } '
              + '</style>';
      }
  }
}
</script>

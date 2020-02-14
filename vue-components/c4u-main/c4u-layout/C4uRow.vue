<template class="self">
  <div 
    ref="c4uRow" 
    class="c4uRow"
  >
    <link 
      v-for="(href, key) in globalCss" 
      v-bind:key="key"
      rel="stylesheet"  
      v-bind:href="href" 
      type="text/css" 
    > 
    <div class="container-fluid">
     <div class="row">
      <slot />
     </div> 
    </div> 
  </div> 
</template>

<style scoped>
</style>

<script>
  import C4uGlue from "c4u-glue";
  import C4uCss from "c4u-css";

  export default {
    mixins: [C4uCss, C4uGlue],
    mounted() {
             // eslint-disable-next-line no-console
             console.log("row");
    },
  }
</script>

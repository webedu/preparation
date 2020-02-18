<template> 
  <span class="c4uHtml3">
    <link 
      v-for="(href, key) in globalCss" 
      v-bind:key="key"
      rel="stylesheet"  
      v-bind:href="href" 
      type="text/css" 
    > 
    <slot />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="c4uHtml2" />
  </span>
</template>

<style scoped>
  .c4uHtml3 {
    background: blue; 
  }
</style>

<script>
  import C4uCss from "c4u-css";
  import axios from "axios";

  export default {
    mixins: [C4uCss], 
    props: {url: {type: String, default: ''}},
    data: function() {
           return {
            c4uHtml2: "<p>Loading...</p>"
            }
        },
    created() {
        // console.log("***** HTML-LOADER-created"); 
    },
    mounted() {
         if(this.url) {
            axios.get(this.url)
                 .then(response => { this.c4uHtml2 = response.data; });	
         }
    },
  }
</script>

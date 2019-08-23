<template> 
  <span class='c4uHtml3'>y<slot></slot><span v-html='c4uHtml2'></span></span>
</template>

<style scoped>
  .c4uHtml3 {
    background: blue; 
  }
</style>

<script>
//  import C4uHttp from "c4u-http";
//  import C4uHttp from "./C4uHttp.js";  
    import axios from "axios";
//  import C4uGlue from "c4u-glue";

  export default {
    props: ['url'],
    data: function() {
           return {
            c4uHtml2: "<p>Loading...</p>"
            }
        },
   // mixins: [/* C4uGlue, */ C4uHttp], 
    created() {
         console.log("***** HTML-LOADER-created"); 
    },
    mounted() {
         if(this.url) {
           //this.http().get(this.url)
           // .then(response => { this.c4uHtml2 = response.data; });

	    axios.get(this.url)
                 .then(response => { this.c4uHtml2 = response.data; });	

//           this.c4uHtml2 = "<p>Ready !</p>"; 
         }
               
    },
    updated() {
    },
    beforeDestroy() {
    },

  }
</script>

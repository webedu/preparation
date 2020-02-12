<template> 
  <span>
    <style v-html="c4uCss" />
  </span> 
</template> 

<style scoped>
  .c4uScript {  }
</style>

<script>
  import axios from "axios";

  export default {
    props: {url: String},
    data: function() {
           return {
            c4uCss: ""
            }
        },
    created() {
        // console.log("***** HTML-LOADER-created"); 
    },
    mounted() {
         if(this.url) {
             axios.get(this.url)
                 .then(response => { this.c4uCss = response.data; );});	
         }
    },


  }
</script>



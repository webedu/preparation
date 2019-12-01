<template> 
  <span>
  <script class='c4uScript'><slot></slot></script>
  <script v-html='c4uScript2'></script>
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
            c4uScript2: ""
            }
        },
    created() {
        // console.log("***** HTML-LOADER-created"); 
    },
    mounted() {
         if(this.url) {
	    axios.get(this.url)
                 .then(response => { this.c4uScript2 = response.data; eval(this.c4uScript2);});	
         }
    },
  }
</script>



<template> 
  <span>
    <script class="c4uScript">
      <slot />
    </script>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <script v-html="c4uScript2" />
  </span> 
</template> 

<style scoped>
  .c4uScript {  }
</style>
 
<script>
  import axios from "axios";

  export default {
    props: {url: {type: String, default: ''}},
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



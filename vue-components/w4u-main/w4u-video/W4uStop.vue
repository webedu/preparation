<template class="self">
  <span class='w4uVideoStop'> 
     <!--w4u-io v-bind:name="name"></w4u-io--> 
     <div class="w4uStop" ref="w4uStop"> 
       <slot></slot>  
     </div>
  </span> 
</template>

<script>
  import C4uGlue from "c4u-glue";
  // moment.js
  // https://stackoverflow.com/questions/19355952/make-html5-video-stop-at-indicated-time 
  export default {
    props: {
            name: {type: String, default: 'stop0'},          //automatic numbering would need glue for unique id...
            ts: {type: String, default: '0.5'}               // float 0.0-1.0 or '00:00:00' as 'hh:mm:ss'
           },
    data: function() {
           return {
             c4uParentTag: "w4u-video"
            }
        },
    mixins: [C4uGlue], 
    computed: {
    } 
  }
</script>

<style scoped>
  .w4uVideoStop {
    
  }
</style>

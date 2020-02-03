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

  export default {
    props: {
            name: {type: String, default: 'stop0'},          //automatic numbering would need glue for unique id...
            time: {type: String, default: '0.5'}             // float 0.0-1.0 or '00:00:00' as 'hh:mm:ss' or '2.56 s' or float>1.0
           },
    data: function() {
           return {
             c4uParentTag: "w4u-video",
             oldFraction: 0.0,
             stopTs: null,
            }
        },
    mixins: [C4uGlue],
    methods: {
      init(parent) {
        if(parent) {
            this.stopTs = parent.convertTimestamp(this.time);
        }
      },
      update(fraction) {  
        if(!this.stopTs) { this.init(this.c4uParent); }
        if((fraction >= this.stopTs) && (this.oldFraction<this.stopTs)) {
           if(this.c4uParent) { this.c4uParent.stop(); } 
        }
        this.oldFraction = fraction;  
      },
    }, 
    computed: {
    },
    mounted() {
    }   
  }
</script>

<style scoped>
  .w4uVideoStop {
    
  }
</style>

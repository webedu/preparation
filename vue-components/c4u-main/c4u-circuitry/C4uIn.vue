<template class="self">
  <span class='c4uIn'>
  <p>{{this.value}}i</p>
  <slot></slot> 
  </span>  
</template>

<style scoped>
  .c4uIn {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  
  export default { 
    props: {name: String, value: Number},
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry",
            c4uOldValue: null
            }
        },
    mixins: [C4uGlue], 
    watch: {
       value: function (newValue) {
           //this.outValueChanged(newValue);
           console.log("c4uIn [#"+this.c4uUid+"]  receives new value B: " + newValue);
           
       }
    },
    methods: { 
       changeInValue: function(value) {
          this.value = value;
          if(this.value != this.c4uOldValue) {
             this.c4uOldValue = this.value;
             //change-event ??? sync ??
             console.log("c4uIn [#"+this.c4uUid+"] receives new value A: " + value);
             var details = {'name': this.name, 'value': this.value, 'time': 0.1}
var event = new CustomEvent('c4uIn-changed-'+this.name, {"bubbles":true, "composed":true, "detail": details});
 this.$el.dispatchEvent(event);
 
         }
       }
    },
    created() {
         console.log("***** Slot-2nd-created " + " #" + this.c4uUid); 
    },
    mounted() {
         console.log("***** Slot-2nd-mounted " + " #" + this.c4uUid);
         this.changeInValue(this.value); 
    },
    updated() {
         console.log("***** Slot-2nd-updated " + " #" + this.c4uUid);
    },
    beforeDestroy() {
         console.log("***** Slot-2nd-destroyed " + " #" + this.c4uUid);
    },

  }
</script>

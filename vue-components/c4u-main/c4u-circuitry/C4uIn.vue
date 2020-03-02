<template class="self">
  <span class="c4uIn">
    <slot /> 
  </span>  
</template>

<style scoped>
  .c4uIn {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
  
  export default { 
    mixins: [C4uGlue], 
    props: {name: {type: String, default: 'in'}, 
            value: {type: Number, default: 0.0}
           },
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry",
            c4uOldValue: null
            }
        },
    mounted() {
         this.changeInValue(this.value); 
         //this.$nextTick( function () { 
         //   this.changeInValue(this.value);
         //});
    },
    methods: { 
       changeInValue: function(value) {
          // this.value = value;  // no direct change on own props recommended
          if(value != this.c4uOldValue) {
             if (this.c4uParent && this.c4uParent.c4uAllConnections) { 
               this.c4uOldValue = value;
             }
             // this.$emit('input', value); would only be needed for v-model bind ... 
             var details = {'name': this.name, 'value': value, 'time': 0.1}
             var event = new CustomEvent('c4uIn-changed-'+this.name, {"bubbles":true, "composed":true, "detail": details});
             this.$el.dispatchEvent(event);
         }
       }
    },

  }
</script>

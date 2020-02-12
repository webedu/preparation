<template class="self">
  <span class="c4uConnection">
    <slot /> 
  </span> 
</template>
 
<style scoped>
  .c4uConnection {  }
</style>

<script>
  import C4uGlue from "c4u-glue";
 
  export default {
    mixins: [C4uGlue], 
    props: {source: {type: String, default: 'out'}, 
            target: {type: String, default: 'in'}
           },
    data: function() {
           return {
            c4uParentTag: "c4u-circuitry"
            }
        },
  }
</script>

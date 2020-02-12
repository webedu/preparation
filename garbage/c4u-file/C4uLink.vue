<template> 
  <link 
    rel="stylesheet" 
    v-bind:href="href" 
    type="text/css"
  > 
</template> 

<style scoped>
</style>

<script>
  export default {
    props: {href: {type: String, default: ''}},
  }
</script>



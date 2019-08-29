<template class="self">
  <span class='w4uStage'>
     <span class="w4uStage2"> 
        <slot></slot>  
     </span>
  </span>  
</template>

<script>

  export default {
    props: {
            name: {type: String, default: 'stage0'},          //automatic numbering would need glue for unique id...
            // width:  375px, 
            // height: 375px
           }
  }
</script>

<style scoped>
  .w4uStage2 {
    position: relative;
    width: 500px;
    height: 500px;
    border: solid 2px blue;
  }
  .w4uStage {
    width: 510px;
    height: 510px;
    border: solid 3px red;
  }
</style>

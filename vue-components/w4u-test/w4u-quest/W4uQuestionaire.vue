<template class="self">
  <span class="w4uQuestionaire">
    <div
      ref="w4uQuestionaire" 
      class="w4uQuestionaire"
    > 
      <slot />  
    </div>
  </span>  
</template>

<script>
  import C4uGlue from "c4u-glue";

  export default {
    mixins: [C4uGlue],
    props: {
            name: {type: String, default: 'questionaire0'},          //automatic numbering would need glue for unique id...
            // width:  375px, 
            // height: 375px
           },
    methods: {
    } 
  }
</script>

<style scoped>

</style>

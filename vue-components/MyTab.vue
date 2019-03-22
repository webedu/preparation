<template> 
  <div class='hallo'>
    <h1 v-bind:class="[isOdd ? 'odd' : 'even']" >My Vue Web Component</h1>
    <div>{{ msg }}</div>
  </div>
</template>

<style scoped>
  h1 {
    background: red;
  }
  h1.odd {
    background: blue;
  }
  h1.even {
    background: green;
  }
</style>

<script>
  import bus from "./bus" 

  export default {
    props: ['msg'],
    data: () => ({
            isOdd: false
        }),
    mounted() {
       this.$nextTick( function () { 
       bus.$emit('addchild', this);
       //console.log(" ENtry send");
       });
    }

  }
</script>

<template class="self"> 
  <span class="w4uRetreive"> 
    <w4u-io 
      v-bind:name="name" 
      v-bind:outputs="w4uStringOut"
    /> 
  </span> 
</template>

<script>
  import Vue from "vue";
  import C4uGlue from "c4u-glue";
  import W4uIo from "w4u-io";

  export default {
    mixins: [W4uIo, C4uGlue], 
    props: {
            name: {type: String, default: 'store0'},               //automatic numbering would need glue for unique id...
            mode: {type: String, default: 'permanent'},            //'permanent','session'
            key2:  {type: String, default: 'store0'},
           },
    data: function() {
           return {
             c4uParentTag: "c4u-circuitry",
             w4uOutputs:  {'retrieve': {'value': 0.0, 'time':0.0 },  //0.0-1.0 
             },
            }
        },
    computed: {
      w4uStyle: function() {
         return '<style>';
      },
    },
    mounted() {
/*
       window.addEventListener('storage', () => {
         // When local storage changes, dump the list to
         // the console.
         // eslint-disable-next-line no-console 
         console.log(JSON.parse(localStorage.getItem(this.key)));    
       }
*/
       var retrieved = window.localStorage.getItem(this.key2);
       Vue.set(this.w4uOutputs, 'retrieve', {'value': parseFloat(retrieved), 'time': 0.1});
    }, 
    // localStorage.getItem("lastname");
    // sessionStorage
    // https://developer.mozilla.org/de/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }

/*
var watchLocalStorage = function(vue, w4uOutputs, key2) {
  return new Promise(function(resolve, reject) {
    // stuff using username, password
    if ( 1==1 ) {  // everything turned out fine
      resolve("Stuff worked!");
    } else {
      reject(Error("It broke"));
    }
  });
}
*/

</script>

<style scoped>
  .w4uVisibility {
  }
</style>

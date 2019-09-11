var vueDocu = new Vue({
  el: "#docugrid",
  data: {
    documenu: "",
    docucontent: ""
  },
  methods: {
    loadContent(url) {
      axios.get(url)
           .then(response => {
              this.docucontent = response.data;
           });
    },
  }, 
  mounted() {
     console.log("Hi ");
     this.loadContent("svg.html");
  }
});

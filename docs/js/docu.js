var vueDocu = new Vue({
  el: "#docugrid",
  data: {
    documenu: "",
    docucontent: ""
  },
  methods: {
    clickit: function (event, url) {
        myvar = event;
    },
    loadMenu(url) {
      axios.get(url)
           .then(response => {
              this.documenu = response.data;
           });
    },
    loadContent(url) {
      axios.get(url)
           .then(response => {
              this.docucontent = response.data;
           });
    },
  }, 
  mounted() {
     this.loadMenu("menu.html");
     this.loadContent("svg.html");
  }
});

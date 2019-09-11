var vueDocu = new Vue({
  el: "#docugrid",
  data: {
    documenu: "",
    docucontent: ""
  },
  methods: {
    clickit: function (event) {
        for(var i = 0; i < event.path.length; i++) {
          var attributes = event.path[i].attributes;
          for(var j = 0; j < attributes.length; j++) {
              if('click-it' == attributes[j].name) {
                 return this.loadContent(attributes[j].value);
              }
          }
        }
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
              var urlParts = config.url.split('#');
              if (urlParts.length > 1) {
                 location.hash = "#" + urlParts[1];
              }
           });
    },
  }, 
  mounted() {
     this.loadMenu("menu.html");
     this.loadContent("svg.html");
  }
});

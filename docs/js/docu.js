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
      this.documenu = "<p>Loading...<p>"
      axios.get(url)
           .then(response => {
              this.documenu = response.data;
           });
    },
    loadContent(url) {
      location.search = url.split('.')[0];
      this.docucontent = "<p>Loading...<p>"
      axios.get(url)
           .then(response => {
              this.docucontent = response.data;
              var urlParts = response.config.url.split('#');
              if (urlParts.length > 1) {
                 location.hash = "#" + urlParts[1];
              }
           });
    },
  }, 
  created() {
     if("" == this.documenu) {
       this.loadMenu("menu.html");
     }
     if("" == this.docucontent) {
       var file = 'svg.html';
       if (location.search.length > 1) {
         file = location.search + '.html';
         if (location.hash.length > 1) {
            file += location.hash;
         }
       }
       this.loadContent(file);
     }
  }
});

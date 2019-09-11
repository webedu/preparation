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
              var urlParts = response.config.url.split('#');
              if (urlParts.length > 1) {
                 location.hash = "#" + urlParts[1];
                 location.search = urlParts[0].split('.')[0];
              }
           });
    },
  }, 
  created() {
     this.loadMenu("menu.html");
     var file = 'svg.html';
     if (location.search > 1) {
       file = location.search + '.html';
     }
     this.loadContent(file);
  }
});

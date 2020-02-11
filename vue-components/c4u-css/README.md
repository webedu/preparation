Vue mixin to handle reuse of global css links inside shadow dom of web components

1. Mark links with additional atribute w4u-type="global":
 
 <link rel="stylesheet" href="xxx/bootstrap.min.css" type="text/css" w4u-type="global"> 

2. Add mixin to web component, that should reuse marked links: 

 mixins: [C4uCss], 

3. ... and add link-loop to template:

 <link v-for="href in globalCss" rel="stylesheet"  v-bind:href="href" type="text/css">

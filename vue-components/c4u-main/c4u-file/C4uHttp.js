import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

const c4uHttp = new Vue();

export default {
    methods: {
          http() {
            return c4uHttp.$http;
          }, 
    },
};

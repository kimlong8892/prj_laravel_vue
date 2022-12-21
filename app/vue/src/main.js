import Vue from "vue";
import AuthApp from './AuthApp.vue'
import VueRouter from "vue-router";
import store from "@/store";
import ListRouter from "@/router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false;
Vue.use(VueRouter);

import loading from 'vuejs-loading-screen';
Vue.use(loading, {
    bg: '#41b883ad',
    icon: 'refresh',
    size: 3,
    icon_color: 'white',
})

const authRouter = new VueRouter({
    mode: 'history',
    routes: ListRouter
});

new Vue({
    router: authRouter,
    render: h => h(AuthApp),
    store: store
}).$mount('#app');
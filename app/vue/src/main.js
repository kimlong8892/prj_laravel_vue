// import * as Vue from 'vue'
// import i18n from "@/i18n";
// import AuthApp from './AuthApp.vue'
// import VueRouter from "vue-router";
// import ListRouter from "@/router";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
// Vue.config.productionTip = false;
// Vue.use(VueRouter);
// import store from "@/store";
//
// const authRouter = new VueRouter({
//     mode: 'history',
//     routes: ListRouter
// });
//
// new Vue({
//     router: authRouter,
//     render: h => h(AuthApp),
//     i18n: i18n,
//     store: store
// }).$mount('#app');
//
//
import { createApp } from 'vue';
import App from './MainApp';
import router from './router/index';
import store from "./store/index";
import i18n from "@/i18n";
import './styles/app.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');

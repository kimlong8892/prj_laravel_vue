import Vue from "vue";
import Vuex from "vuex";
import AdminLoginStore from "@/store/AdminLogin/store";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        AdminLoginStore
    }
});

export default store;
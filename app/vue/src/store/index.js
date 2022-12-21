import Vue from "vue";
import Vuex from "vuex";
import AdminStore from "@/store/Admin/store";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        AdminStore
    }
});

export default store;
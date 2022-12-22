import {createStore} from "vuex";
import AdminLoginStore from "@/store/AdminLogin/store";
import AdminForgotPassword from "@/components/Admin/Auth/AdminForgotPassword";

const store = createStore({
    modules: {
        AdminLoginStore,
        AdminForgotPassword
    }
});

export default store;
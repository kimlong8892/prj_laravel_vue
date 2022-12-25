import {createStore} from "vuex";
import AdminLoginStore from "@/store/AdminLogin/store";
import AdminForgotPasswordStore from "@/store/AdminForgotPassword/store";
import AdminResetPasswordStore from "@/store/AdminResetPassword/store";
import AdminInfoStore from "@/store/AdminInfo/store";

const store = createStore({
    modules: {
        AdminLoginStore,
        AdminForgotPasswordStore,
        AdminResetPasswordStore,
        AdminInfoStore
    }
});

export default store;
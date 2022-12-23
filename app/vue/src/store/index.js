import {createStore} from "vuex";
import AdminLoginStore from "@/store/AdminLogin/store";
import AdminForgotPasswordStore from "@/store/AdminForgotPassword/store";
import AdminResetPasswordStore from "@/store/AdminResetPassword/store";

const store = createStore({
    modules: {
        AdminLoginStore,
        AdminForgotPasswordStore,
        AdminResetPasswordStore
    }
});

export default store;
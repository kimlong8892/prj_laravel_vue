import AdminActions from "@/store/AdminForgotPassword/actions";
import AdminGetTers from "@/store/AdminForgotPassword/getTers";
import AdminMutations from "@/store/AdminForgotPassword/mutations";
import AdminStates from "@/store/AdminForgotPassword/states";

const AdminForgotPasswordStore = {
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default AdminForgotPasswordStore;
import AdminActions from "@/store/AdminResetPassword/actions";
import AdminGetTers from "@/store/AdminResetPassword/getTers";
import AdminMutations from "@/store/AdminResetPassword/mutations";
import AdminStates from "@/store/AdminResetPassword/states";

const AdminResetPasswordStore = {
    namespaced: true,
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default AdminResetPasswordStore;
import AdminActions from "@/store/AdminLogin/actions";
import AdminGetTers from "@/store/AdminLogin/getTers";
import AdminMutations from "@/store/AdminLogin/mutations";
import AdminStates from "@/store/AdminLogin/states";

const AdminLoginStore = {
    namespaced: true,
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default AdminLoginStore;
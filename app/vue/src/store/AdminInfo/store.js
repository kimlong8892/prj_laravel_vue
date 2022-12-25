import AdminActions from "@/store/AdminInfo/actions";
import AdminGetTers from "@/store/AdminInfo/getTers";
import AdminMutations from "@/store/AdminInfo/mutations";
import AdminStates from "@/store/AdminInfo/states";

const AdminInfoStore = {
    namespaced: true,
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default AdminInfoStore;
import AdminActions from "@/store/Admin/actions";
import AdminGetTers from "@/store/Admin/getTers";
import AdminMutations from "@/store/Admin/mutations";
import AdminStates from "@/store/Admin/states";


const AdminStore = {
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default AdminStore;
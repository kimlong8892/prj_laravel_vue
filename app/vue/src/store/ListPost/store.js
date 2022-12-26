import AdminActions from "@/store/ListPost/actions";
import AdminGetTers from "@/store/ListPost/getTers";
import AdminMutations from "@/store/ListPost/mutations";
import AdminStates from "@/store/ListPost/states";

const ListPostStore = {
    namespaced: true,
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default ListPostStore;
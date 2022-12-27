import AdminActions from "@/store/Post/actions";
import AdminGetTers from "@/store/Post/getTers";
import AdminMutations from "@/store/Post/mutations";
import AdminStates from "@/store/Post/states";

const PostStore = {
    namespaced: true,
    state: AdminStates,
    mutations: AdminMutations,
    getters: AdminGetTers,
    actions: AdminActions
};

export default PostStore;
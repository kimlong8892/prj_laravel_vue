import Actions from "@/store/AdminForgotPassword/actions";
import GetTers from "@/store/AdminForgotPassword/getTers";
import Mutations from "@/store/AdminForgotPassword/mutations";
import States from "@/store/AdminForgotPassword/states";

const AdminForgotPasswordStore = {
    namespaced: true,
    state: States,
    mutations: Mutations,
    getters: GetTers,
    actions: Actions
};

export default AdminForgotPasswordStore;
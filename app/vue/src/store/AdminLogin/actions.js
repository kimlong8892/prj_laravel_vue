import axios from 'axios';

export default {
    login(context, view) {
        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/login', {
            email: context.getters.getEmail,
            password: context.getters.getPassword
        })
        .then(response => {
            // eslint-disable-next-line no-prototype-builtins
            if (response.data.hasOwnProperty('access_token')) {
                localStorage.setItem('admin_access_token', response.data.access_token);
            }
        })
        .catch(e => {
            const dataError = e.response.data;
            // eslint-disable-next-line no-prototype-builtins
            if (dataError.hasOwnProperty('code_error')) {
                context.commit('setError', dataError.code_error);
                view.$isLoading(false);
            }
        });
    }
}
import axios from 'axios';

export default {
    login(context, payload) {
        context.commit('setLoading', true);

        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/login', {
            email: payload.email,
            password: payload.password,
            recaptcha: payload.recaptcha
        })
        .then(response => {
            // eslint-disable-next-line no-prototype-builtins
            if (response.data.hasOwnProperty('access_token')) {
                localStorage.setItem('admin_access_token', response.data.access_token);
                window.location.replace(window.location.origin + '/admin/home');
            }
        })
        .catch(e => {
            context.commit('setLoading', false);
            const dataError = e.response.data;

            // eslint-disable-next-line no-prototype-builtins
            if (dataError.hasOwnProperty('code_error')) {
                context.commit('setError', dataError.code_error);
                // eslint-disable-next-line no-prototype-builtins
            } else if (dataError.hasOwnProperty('errors')) {
                context.commit('setError', dataError.message);
            }
        });
    }
}
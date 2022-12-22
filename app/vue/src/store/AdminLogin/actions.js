import axios from 'axios';

export default {
    login(context) {
        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/login', {
            email: context.getters.getEmail,
            password: context.getters.getPassword,
            recaptcha: context.getters.getRecaptcha
        })
        .then(response => {
            // eslint-disable-next-line no-prototype-builtins
            if (response.data.hasOwnProperty('access_token')) {
                localStorage.setItem('admin_access_token', response.data.access_token);
                window.location.replace(window.location.origin + '/admin/home');
            }
        })
        .catch(e => {
            if (e.response.data) {
                const dataError = e.response.data;

                console.log(dataError);

                // eslint-disable-next-line no-prototype-builtins
                if (dataError.hasOwnProperty('code_error')) {
                    context.commit('setError', dataError.code_error);
                    // eslint-disable-next-line no-prototype-builtins
                } else if (dataError.hasOwnProperty('errors')) {
                    context.commit('setError', dataError.message);
                }
            }

            context.commit('setLoading', false);
        });
    }
}
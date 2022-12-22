import axios from 'axios';

export default {
    forgotPassword(context, view) {
        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/forgot-password', {
            email: context.getters.getEmail,
            recaptcha: context.getters.getRecaptcha
        })
        .then(response => {
            // eslint-disable-next-line no-prototype-builtins
            if (response.data.hasOwnProperty('success')) {
                //
            }
        })
        .catch(e => {
            if (e.response.data) {
                const dataError = e.response.data;
                // eslint-disable-next-line no-prototype-builtins
                if (dataError.hasOwnProperty('code_error')) {
                    context.commit('setError', dataError.code_error);
                    view.$isLoading(false);
                }
            }
        });
    }
}
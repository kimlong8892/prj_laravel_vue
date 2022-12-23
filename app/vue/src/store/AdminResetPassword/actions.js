import axios from 'axios';

export default {
    resetPassword(context, payload) {
        context.commit('setLoading', true);

        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/reset-password', {
            email: payload.email,
            password: payload.password,
            password_confirmation: payload.password,
            recaptcha: payload.recaptcha,
            token: payload.token
        })
        .then(response => {
            context.commit('setLoading', false);

            // eslint-disable-next-line no-prototype-builtins
            if (response.data.hasOwnProperty('success') && response.data.success) {
                context.commit('setSuccess', true);
                // eslint-disable-next-line no-prototype-builtins
            } else if (response.data.hasOwnProperty('code_error')) {
                context.commit('setError', response.data.code_error);
            }
        })
        .catch(e => {
            if (e.response.data) {
                const dataError = e.response.data;

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
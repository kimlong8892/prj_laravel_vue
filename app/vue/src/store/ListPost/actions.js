import axios from 'axios';

export default {
    getListPostAction(context) {
        context.commit('setLoading', true);
        axios.get(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json'
            },
            params: {
                page: context.getters.getCurrentPage,
                search: context.getters.getSearch
            }
        })
        .then(response => {
            context.commit('setLoading', false);
            const data = response.data.data;

            // eslint-disable-next-line no-prototype-builtins
            if (data.hasOwnProperty('list_post') && response.data.success) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty('total_page')) {
                    context.commit('setTotalPage', data.total_page);
                }

                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty('list_post')) {

                    console.log(data.list_post);
                    context.commit('setListPost', data.list_post);
                }
            }
        })
        .catch(e => {
            context.commit('setLoading', false);
            context.commit('setError', e.response.data.message ?? 'ERROR_NO_MESS');
        });
    }
}
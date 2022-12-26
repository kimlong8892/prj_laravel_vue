import axios from 'axios';

export default {
    getListPostAction(context) {
        context.commit('setLoading', true);
        axios.get(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json'
            },
            data: {
                page: context.getters.getCurrentPage
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
                    context.commit('setListPost', data.list_post);
                }
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
}
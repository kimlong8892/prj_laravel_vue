import axios from 'axios';
import i18n from "@/i18n";

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
    },

    getListPostActionWeb(context) {
        context.commit('setLoading', true);
        axios.get(process.env.VUE_APP_URL_API_BACKEND + '/posts', {
            params: {
                page: context.getters.getCurrentPage,
                search: context.getters.getSearch,
                per_page: 12
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
    },
    deletePostAction(context, id) {
        context.commit('setLoading', true);
        axios.delete(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(() => {
                context.commit('setLoading', false);
                window.location.replace(window.location.origin + '/admin/post/index?page=' + context.getters.getCurrentPage);
            })
            .catch(e => {
                context.commit('setLoading', false);
                alert(e.data.mgs ?? i18n.t('ERROR'));
            });
    }
}
import axios from 'axios';

export default {
    async getPostEditAction(context, postId) {
        context.commit('setLoading', true);
        context.commit('setIsSuccessUpdate', false);

        await axios.get(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts/' + postId +  '/edit', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json'
            }
        })
        .then(response => {
            context.commit('setLoading', false);
            const data = response.data.data;
            context.commit('setName', data.name);
            context.commit('setContent', data.content);
            context.commit('setImageUrl', data.image);
            context.commit('setId', data.id);
        })
        .catch(e => {
            context.commit('setLoading', false);
            context.commit('setDetailError', e.response.data.mgs ?? 'ERROR_NO_MESS');
        });
    },

    updatePostAction(context, postId) {
        let data = new FormData();
        data.append('image', context.getters.getImage);
        data.append('name', context.getters.getName);
        data.append('content', context.getters.getContent);
        data.append('_method', 'PUT');
        context.commit('setLoading', true);

        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts/' + postId, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin_access_token'),
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(() => {
            context.commit('setLoading', false);
            context.commit('setIsSuccessUpdate', true);
        })
        .catch(e => {
            context.commit('setLoading', false);
            context.commit('setUpdateError', e.response.data.mgs ?? 'ERROR_NO_MESS');
        });
    },

    addPostAction(context) {
        let data = new FormData();
        data.append('image', context.getters.getImage);
        data.append('name', context.getters.getName);
        data.append('content', context.getters.getContent);

        context.commit('setLoading', true);
        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts', data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => {
            context.commit('setLoading', false);

            // eslint-disable-next-line no-prototype-builtins
            if (response.data.hasOwnProperty('post_id')) {
                window.location.replace(window.location.origin + '/admin/post/edit/' + response.data.post_id);
            }
        })
        .catch(e => {
            context.commit('setLoading', false);
            context.commit('setAddError', e.response.data.mgs ?? 'ERROR_NO_MESS');
        });
    },

    deletePostAction(context) {
        context.commit('setLoading', true);
        axios.delete(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts/' + context.getters.getId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response => {
                context.commit('setLoading', false);
                console.log(response);
            })
            .catch(e => {
                context.commit('setLoading', false);
                console.log(e);
            });
    }
}
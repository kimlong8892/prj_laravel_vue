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
        })
        .catch(e => {
            context.commit('setLoading', false);
            context.commit('setDetailError', e.response.data.mgs ?? 'ERROR_NO_MESS');
        });
    },

    updatePostAction(context, postId) {
        let data = new FormData();

        console.log(context.getters.getImage);
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
        context.commit('setLoading', true);
        axios.post(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts', {
            name: context.getters.getName,
            content: context.getters.getContent
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json'
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
            console.log(e);
            context.commit('setLoading', false);
            context.commit('setAddError', e.response.data.mgs ?? 'ERROR_NO_MESS');
        });
    }
}
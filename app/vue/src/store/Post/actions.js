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
        context.commit('setLoading', true);
        axios.put(process.env.VUE_APP_URL_API_BACKEND + '/admin/posts/' + postId, {
           id: postId,
           name: context.getters.getName,
           content: context.getters.getContent
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json'
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
    }
}
import axios from 'axios';

export default {
    actionAdminInfo(context) {
        axios.get(process.env.VUE_APP_URL_API_BACKEND + '/admin/admin', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                Accept: 'application/json'
            }
        })
        .then(response => {
            context.commit('setAdminInfo', response.data.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
}
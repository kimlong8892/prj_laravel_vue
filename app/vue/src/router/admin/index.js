import { createRouter, createWebHistory } from 'vue-router'
import AdminRouter from "@/router/admin/AdminRouter";

const router = createRouter({
    history: createWebHistory(),
    routes:  [
        ...AdminRouter
    ]
});

router.beforeEach((to) => {
    if (to.name === 'admin.home') {
        if (!localStorage.getItem('admin_access_token')) {
            window.location.replace(window.location.origin + '/admin/login');
        }
    } else if (to.name === 'admin.login' || to.name === 'admin.forgot_password' || to.name === 'admin.reset_password') {
        if (localStorage.getItem('admin_access_token')) {
            window.location.replace(window.location.origin + '/admin/home');
        }
    }

    return true;
})

export default router;
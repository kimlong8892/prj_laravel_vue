import { createRouter, createWebHistory } from 'vue-router'
import AdminNotFound from "@/components/Admin/404/NotFound.vue";
import {getAdminDir} from "@/helpers/functions";
import AdminLogin from "@/components/Admin/Auth/Login.vue";
import AdminForgotPassword from "@/components/Admin/Auth/ForgotPassword.vue";
import AdminHome from "@/components/Admin/Home/Home.vue";
import AdminResetPassword from "@/components/Admin/Auth/ResetPassword.vue";
import AdminListPost from "@/components/Admin/Post/ListPost.vue";
import AdminEditPost from "@/components/Admin/Post/EditPost.vue";
import AdminNewPost from "@/components/Admin/Post/NewPost.vue";

const ADMIN_DIR = getAdminDir();
const AdminRouter = [
    {
        path: ADMIN_DIR + '/login',
        name: 'admin.login',
        component: AdminLogin
    },
    {
        path: ADMIN_DIR + '/forgot-password',
        name: 'admin.forgot_password',
        component: AdminForgotPassword
    }, {
        path: ADMIN_DIR + '/home',
        name: 'admin.home',
        component: AdminHome
    },
    {
        path: ADMIN_DIR + '/reset-password',
        name: 'admin.reset_password',
        component: AdminResetPassword
    },
    {
        path: ADMIN_DIR + '/post/index',
        name: 'admin.post.index',
        component: AdminListPost
    },
    {
        path: ADMIN_DIR + '/post/edit/:id',
        name: 'admin.post.edit',
        component: AdminEditPost
    },
    {
        path: ADMIN_DIR + '/post/new',
        name: 'admin.post.new',
        component: AdminNewPost
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes:  [
        ...AdminRouter,
        {path: '/:catchAll(.*)', component: AdminNotFound}
    ]
});

router.beforeEach((to) => {
    if (to.name !== 'admin.login' && to.name !== 'admin.forgot_password' && to.name !== 'admin.reset_password') {
        if (!localStorage.getItem('admin_access_token')) {
            window.location.replace(window.location.origin + '/admin/login');
        }
    } else {
        if (localStorage.getItem('admin_access_token')) {
            window.location.replace(window.location.origin + '/admin/home');
        }
    }

    return true;
})

export default router;
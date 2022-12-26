import AdminForgotPassword from "@/components/Admin/Auth/AdminForgotPassword";
import AdminHome from "@/components/Admin/Home/AdminHome";
import AdminLogin from "@/components/Admin/Auth/AdminLogin";
import AdminResetPassword from "@/components/Admin/Auth/AdminResetPassword";
import {getAdminDir} from "@/helpers/functions";
import AdminListPost from "@/components/Admin/Post/AdminListPost.vue";

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
    }
];

export default AdminRouter;
import AdminForgotPassword from "@/components/Admin/Auth/AdminForgotPassword";
import AdminHome from "@/components/Admin/Home/AdminHome";
import AdminLogin from "@/components/Admin/Auth/AdminLogin";
import AdminResetPassword from "@/components/Admin/Auth/AdminResetPassword";
import {getAdminDir} from "@/helpers/functions";

const ADMIN_DIR = getAdminDir();

const AdminRouter = [{
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
    }
];

export default AdminRouter;
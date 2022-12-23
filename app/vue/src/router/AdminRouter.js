import AdminForgotPassword from "@/components/Admin/Auth/AdminForgotPassword";
import AdminHome from "@/components/Admin/Home/AdminHome";
import AdminLogin from "@/components/Admin/Auth/AdminLogin";
import AdminResetPassword from "@/components/Admin/Auth/AdminResetPassword";

const AdminRouter = [{
    path: '/admin/login',
    name: 'admin.login',
    component: AdminLogin
},
    {
        path: '/admin/forgot-password',
        name: 'admin.forgot_password',
        component: AdminForgotPassword
    }, {
        path: '/admin/home',
        name: 'admin.home',
        component: AdminHome
    },
    {
        path: '/admin/reset-password',
        name: 'admin.reset_password',
        component: AdminResetPassword
    }
];

export default AdminRouter;
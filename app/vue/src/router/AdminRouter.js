import AdminLogin from "@/components/Admin/Auth/AdminLogin";
import AdminForgotPassword from "@/components/Admin/Auth/AdminForgotPassword";

const AdminRouter = [{
    path: '/admin/login', component: AdminLogin
}, {
    path: '/admin/forgot-password', component: AdminForgotPassword
}];

export default AdminRouter;
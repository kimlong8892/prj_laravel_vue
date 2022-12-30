import { createRouter, createWebHistory } from 'vue-router'
import AdminNotFound from "@/components/Admin/404/AdminNotFound.vue";
import WebHome from "@/components/Web/Home/WebHome";

const AdminRouter = [
    {
        path: '/',
        name: 'web.home',
        component: WebHome
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes:  [
        ...AdminRouter,
        {path: '/:catchAll(.*)', component: AdminNotFound}
    ]
});

export default router;
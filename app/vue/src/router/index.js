import { createRouter, createWebHistory } from 'vue-router'
import AdminRouter from "@/router/AdminRouter";

const router = createRouter({
    history: createWebHistory(),
    routes:  [
        ...AdminRouter
    ]
});

export default router;
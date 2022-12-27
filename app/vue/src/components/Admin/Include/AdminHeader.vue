<script setup>
import { ref } from "vue";
import {getAdminDir} from "@/helpers/functions";

const isOpen = ref(false);
</script>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
    name: 'AdminHeader',
    computed: {
        ...mapGetters('AdminInfoStore', ['getAdminInfo'])
    },
    data() {
        return {
            userInfo: {}
        }
    },
    methods: {
        ...mapActions('AdminInfoStore', ['actionAdminInfo']),
        logout() {
            axios.get(process.env.VUE_APP_URL_API_BACKEND + '/admin/logout', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('admin_access_token'),
                    Accept: 'application/json'
                }
            })
            .then(response => {
                if (response.data.success) {
                    localStorage.removeItem('admin_access_token');
                    window.location.replace(window.location.origin + '/admin/login');
                }
            });
        }
    },

}
</script>

<template>
    <div class="flex">
        <div
                :class="isOpen ? 'w-40' : 'w-60'"
                class="flex flex-col h-screen p-3 duration-300 bg-gray-800 shadow"
        >
            <div class="space-y-3">
                <h1 class="text-xl font-bold text-white text-success">
                    {{ $t('hello') }} - {{ this.getAdminInfo.name }}
                </h1>

                <div class="flex-1">
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                        <li class="rounded-sm">
                            <router-link
                                    :to="getAdminDir() + '/home'"
                                    class="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>

                                <span :class="'text-gray-100 ' + ($route.name === 'admin.home' ? 'text-success' : '')">{{ $t('Home') }}</span>
                            </router-link>
                        </li>
                        <li class="rounded-sm">
                            <RouterLink
                                    :to="getAdminDir() + '/post/index'"
                                    class="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                                    />
                                </svg>

                                <span :class="'text-gray-100 ' + ($route.name === 'admin.post.index' || $route.name === 'admin.post.edit' ? 'text-success' : '')">{{ $t('Post management') }}</span>
                            </RouterLink>
                        </li>
                        <li class="rounded-sm" @click="logout">
                            <span
                                 class="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                            >
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 text-gray-100"
                                >
                                    <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                </svg>

                                <span class="text-gray-100"> Logout </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container mx-auto mt-12">
            <router-view></router-view>
        </div>
    </div>
</template>


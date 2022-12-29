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
    <div class="flex main-app">
        <div
                :class="isOpen ? 'w-40' : 'w-60'"
                class="flex flex-col h-screen p-3 duration-300 bg-gray-800 shadow main-left"
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
                                <i class="fa fa-home fa-2x text-white"></i>

                                <span :class="'text-gray-100 ' + ($route.name === 'admin.home' ? 'text-success' : '')">{{ $t('Home Admin') }}</span>
                            </router-link>
                        </li>
                        <li class="rounded-sm">
                            <RouterLink
                                    :to="getAdminDir() + '/post/index'"
                                    class="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <i class="fa fa-pager fa-2x text-white"></i>

                                <span :class="'text-gray-100 ' + ($route.name === 'admin.post.index' || $route.name === 'admin.post.edit' ? 'text-success' : '')">{{ $t('Post management') }}</span>
                            </RouterLink>
                        </li>
                        <li class="rounded-sm" @click="logout">
                            <span
                                 class="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                            >
                                <i class="fa fa-user fa-2x text-white"></i>

                                <span class="text-gray-100">{{ $t('Logout') }}</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container main-right">
            <router-view></router-view>
        </div>
    </div>
</template>


<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content} | ` + this.siteName : this.siteName }}</template>
    </metainfo>
    <div id="app">
        <div v-if="this.getAdminInfo">
            <AdminHeader></AdminHeader>
        </div>

        <div v-if="!this.getAdminInfo">
            <router-view></router-view>
        </div>

        <footer id="footer-main">
            &copy;Copyright {{ new Date().getFullYear() }} by KimLong
        </footer>
    </div>
</template>

<script>
    import AdminHeader from "@/components/Admin/Include/AdminHeader";
    import {mapActions, mapGetters} from "vuex";
    import {siteName} from "@/helpers/functions";

    export default {
        name: 'MainAppAdmin',
        computed: {
            ...mapGetters('AdminInfoStore', ['getAdminInfo'])
        },
        components: {AdminHeader},
        methods: {
            ...mapActions('AdminInfoStore', ['actionAdminInfo']),
        },
        beforeMount(){
            this.actionAdminInfo();
        },
        data() {
            return {
                siteName: siteName()
            }
        }
    }
</script>

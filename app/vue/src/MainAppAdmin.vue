<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content} | Vue` : `Vue` }}</template>
    </metainfo>
    <div id="app">
        <AdminHeader></AdminHeader>

        <footer id="footer-main">
            &copy;Copyright {{ new Date().getFullYear() }} by KimLong
        </footer>
    </div>
</template>

<script>
    import AdminHeader from "@/components/Admin/Include/AdminHeader";

    export default {
        name: 'MainAppAdmin',
        components: {AdminHeader}
    }
</script>

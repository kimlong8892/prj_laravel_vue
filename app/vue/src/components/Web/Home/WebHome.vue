<template>
    <h1>alo</h1>
</template>

<script>
    import {useMeta} from "vue-meta";
    import i18n from "@/i18n";

    export default {
        setup() {
            useMeta({
                'title': i18n.t('Home')
            })
        },
        name: 'WebHome',
    }
</script>
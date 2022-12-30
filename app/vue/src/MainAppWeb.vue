<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content} | ` + this.siteName : this.siteName }}</template>
    </metainfo>
    <div id="app">
        <WebHeader></WebHeader>
        <div class="container-fluid pl-5 pr-5">
            <router-view></router-view>
        </div>
        <WebFooter></WebFooter>
    </div>
</template>
<script>
import WebHeader from "@/components/Web/Include/WebHeader";
import WebFooter from "@/components/Web/Include/WebFooter";
import {siteName} from "@/helpers/functions";
export default {
    components: {WebFooter, WebHeader},
    data() {
        return {
            siteName: siteName()
        }
    }
}
</script>
<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content} | Vue` : `Vue` }}</template>
    </metainfo>
    <div id="app">
        <router-view></router-view>
        <footer id="footer-main">
            &copy;Copyright {{ new Date().getFullYear() }} by KimLong
        </footer>
    </div>
</template>

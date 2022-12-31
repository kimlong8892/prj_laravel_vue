<template>
    <div v-if="this.getImage && this.getName">
        <loading v-model:active="this.getLoading"
                 :is-full-page="true"/>
        <div class="text-center mb-3 border p-2">
            <img class="w-100" :src="this.getImage" :alt="this.getName">
            <h1 class="mt-2 text-xl">{{ this.getName }}</h1>
        </div>

        <div class="mt-5 mb-5 border p-2">
            <div v-html="this.getContent"></div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Loading from 'vue-loading-overlay';

export default {
    name: 'PostDetail',
    components: {Loading},
    computed: {
        ...mapGetters('PostStore', ['getLoading', 'getId', 'getName', 'getContent', 'getImage']),
    },
    methods: {
        ...mapActions('PostStore', ['getPostDetailAction']),
    },
    async beforeMount() {
       await this.getPostDetailAction(this.$route.params.id);
       document.title = this.getName;
    }
}
</script>
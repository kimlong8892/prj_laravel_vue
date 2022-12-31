<template>
    <div>
        <loading v-model:active="this.getLoading"
                 :is-full-page="true"/>
        <ListPost v-if="this.getListPost" :listData="this.getListPost"/>
        <PaginationCustom @update:modelValue="changePage($event)"
                          :currentPage="this.getCurrentPage"
                          :modelValue="this.getCurrentPage"
                          :totalPage="this.getTotalPage"/>
    </div>
</template>

<script>
import {useMeta} from "vue-meta";
import i18n from "@/i18n";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loading from 'vue-loading-overlay';
import {setGetParam} from "@/helpers/functions";
import PaginationCustom from "@/components/Include/Pagination";
import ListPost from "@/components/Web/Post/ListPost";

let isLoadFirst = false;

export default {
    components: {ListPost, PaginationCustom, Loading},
    setup() {
        useMeta({
            'title': i18n.t('Home')
        });
    },
    computed: {
        ...mapGetters('ListPostStore', ['getError', 'getLoading', 'getListPost', 'getTotalPage', 'getCurrentPage'])
    },
    name: 'HomeIndex',
    methods: {
        ...mapMutations('ListPostStore', ['setSearch', 'setCurrentPage']),
        ...mapActions('ListPostStore', ['getListPostActionWeb']),
        changePage(page) {
            page = parseInt(page);

            if (isNaN(page)) {
                page = 1;
            }

            setGetParam('page', page);
            this.setCurrentPage(page);
            this.getListPostActionWeb();
        },
    },
    beforeMount() {
        if (!isLoadFirst) {
            isLoadFirst = true;

            // eslint-disable-next-line no-prototype-builtins
            if (this.$route.hasOwnProperty('query')) {
                this.changePage(this.$route.query.page);
            }

            this.getListPostActionWeb();
        }
    }
}
</script>
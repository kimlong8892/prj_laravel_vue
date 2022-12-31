<template>
    <div>
        <loading v-model:active="this.getLoading"
               :is-full-page="true"/>

        <div class="grid-container grid grid-cols-4" v-if="this.getListPost">
            <div class="item1 col-span-1" v-for="index in this.getListPost.length" :key="index">
              <PostItemList :image="this.getListPost[index - 1].image" :name="this.getListPost[index - 1].name" />
            </div>
        </div>

      <PaginationCustom @update:modelValue="changePage($event)"
                  :currentPage="this.getCurrentPage"
                  :modelValue="this.getCurrentPage"
                  :totalPage="this.getTotalPage" />
    </div>
</template>

<script>
    import {useMeta} from "vue-meta";
    import i18n from "@/i18n";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import PostItemList from "@/components/Web/Include/Post/PostItemInList";
    import Loading from 'vue-loading-overlay';
    import {setGetParam} from "@/helpers/functions";
    import PaginationCustom from "@/components/Include/Pagination";
    let isLoadFirst = false;

    export default {
      components: {PaginationCustom, PostItemList, Loading},
      setup() {
            useMeta({
                'title': i18n.t('Home')
            })
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
              this.changePage(this.$route.query.page);
              this.getListPostActionWeb();
          }
      }
    }
</script>
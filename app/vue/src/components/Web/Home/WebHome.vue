<template>
    <div>
        <loading v-model:active="this.getLoading"
               :is-full-page="true"/>
        <div class="grid-container grid grid-cols-4" v-if="this.getListPost">
            <div class="item1 col-span-1" v-for="index in this.getListPost.length" :key="index">
              <PostItemList :image="this.getListPost[index - 1].image" :name="this.getListPost[index - 1].name" />
            </div>
        </div>

      <div class="mt-3 mb-5" v-if="this.getTotalPage > 1">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px">
            <li v-if="this.getCurrentPage > 1">
              <a href="#"
                 @click="() => changePage(this.getCurrentPage - 1)"
                 class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {{ $t('Previous') }}
              </a>
            </li>

            <li v-for="index in this.getTotalPage" :key="index">
              <a v-if="index === this.getCurrentPage"
                 href="#" aria-current="page"
                 :data-page="index"
                 @click="changePage(index)"
                 class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                {{ index }}
              </a>
              <a v-else
                 href="#"
                 :data-page="index"
                 @click="() => changePage(index)"
                 class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {{ index }}
              </a>
            </li>
            <li v-if="this.getCurrentPage < this.getTotalPage">
              <a href="#"
                 @click="() => changePage(this.getCurrentPage + 1)"
                 class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {{ $t('Next') }}
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
</template>

<script>
    import {useMeta} from "vue-meta";
    import i18n from "@/i18n";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import PostItemList from "@/components/Web/Include/Post/PostItemInList";
    import Loading from 'vue-loading-overlay';
    import {setGetParam} from "@/helpers/functions";
    let isLoadFirst = false;

    export default {
      components: {PostItemList, Loading},
      setup() {
            useMeta({
                'title': i18n.t('Home')
            })
        },
        computed: {
            ...mapGetters('ListPostStore', ['getError', 'getLoading', 'getListPost', 'getTotalPage', 'getCurrentPage'])
        },
        name: 'WebHome',
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
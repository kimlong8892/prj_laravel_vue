<template>
  <div>
    <loading v-model:active="this.getLoading"
             :is-full-page="true"/>
    <ErrorAlert v-if="this.getError !== ''" :error="this.getError" />
    <div v-else-if="this.getListPost">
      <h1 class="text-2xl uppercase mb-3">{{ $t('List post') }}</h1>
      <form class="mb-5" @submit.prevent="submitSearch">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input type="search" id="default-search"
                 v-model="this.search"
                 class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 :placeholder="$t('Input search')">
          <button type="button"
                  @click="submitSearch"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ $t('Search') }}
          </button>
        </div>
      </form>


      <div class="text-right">
          <RouterLink to="/admin/post/new"
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <i class="fa fa-plus-circle"></i>
              {{ $t('Add post') }}
          </RouterLink>
      </div>

      <table class="table-bordered mt-5">
        <thead>
        <tr>
          <th width="5%">{{ $t('ID') }}</th>
          <th width="40%">{{ $t('Name') }}</th>
          <th width="20%">{{ $t('Post avatar') }}</th>
          <th width="20%">{{ $t('Admin create') }}</th>
          <th width="15%">{{ $t('Action') }}</th>
        </tr>
        </thead>
        <tbody v-if="this.getListPost.length > 0">
        <tr v-for="index in this.getListPost.length" :key="index">
          <td class="text-center">{{ this.getListPost[index - 1].id }}</td>
          <td>{{ this.getListPost[index - 1].name }}</td>
          <td>
            <img :src="this.getListPost[index - 1].image" :alt="this.getListPost[index - 1].name">
          </td>
          <td>{{ this.getListPost[index - 1].admin.name }}</td>
          <td class="text-center">
            <RouterLink :to="'/admin/post/edit/' + this.getListPost[index - 1].id"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <i class="fa fa-edit"></i>
              {{ $t('Edit') }}
            </RouterLink>
            <button
                @click="this.deletePostAction(this.getListPost[index - 1].id)"
               class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              <i class="fa fa-trash"></i>
              {{ $t('Delete') }}
            </button>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="4" class="text-center text-red">{{ $t('Record not found') }}</td>
        </tr>
        </tbody>

      </table>

      <PaginationCustom @update:modelValue="changePage($event)"
                        v-if="this.getCurrentPage && this.getTotalPage"
                        :currentPage="this.getCurrentPage"
                        :modelValue="this.getCurrentPage"
                        :totalPage="this.getTotalPage" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loading from 'vue-loading-overlay';
import {useMeta} from 'vue-meta'
import i18n from "@/i18n";
import {setGetParam} from "@/helpers/functions";
import ErrorAlert from "@/components/Admin/Include/ErrorAlert.vue";
import PaginationCustom from "@/components/Include/Pagination";
let isLoadFirst = false;

export default {
  setup() {
    useMeta({
      title: i18n.t('Admin list post')
    });
  },
  name: 'AdminListPost',
  data() {
    return {
      search: this.$route.query.search ?? ''
    }
  },
  computed: {
    ...mapGetters('ListPostStore', ['getListPost', 'getLoading', 'getTotalPage', 'getCurrentPage', 'getSearch', 'getError'])
  },
  components: {Loading, ErrorAlert, PaginationCustom},
  methods: {
    ...mapActions('ListPostStore', ['getListPostAction', 'deletePostAction']),
    ...mapMutations('ListPostStore', ['setListPost', 'setCurrentPage', 'setTotalPage', 'setSearch']),
    changePage(page) {
      page = parseInt(page);

      if (isNaN(page)) {
        page = 1;
      }

      setGetParam('page', page);
      this.setCurrentPage(page);
      this.getListPostAction();
    },
    submitSearch() {
      this.setCurrentPage(1);
      setGetParam('page', this.getCurrentPage);
      this.setSearch(this.search);
      setGetParam('search', this.search);
      this.getListPostAction();
    },
    deleteMethod(id) {
        this.deletePostAction(id);
    }
  },
  beforeMount() {
    if (!isLoadFirst) {
      this.setSearch(this.search);
      this.changePage(this.$route.query.page);
      isLoadFirst = true;
    }
  }
}
</script>
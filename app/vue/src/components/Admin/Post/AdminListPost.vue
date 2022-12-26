<template>
  <div>
    <loading v-model:active="this.getLoading"
             :is-full-page="true"/>

    <h1 class="text-2xl uppercase mb-3">{{ $t('List post') }}</h1>

    <table v-if="this.getListPost" class="table-bordered">
      <tbody>
      <tr>
        <th>{{ $t('ID') }}</th>
        <th>{{ $t('Name') }}</th>
        <th>{{ $t('Admin') }}</th>
        <th>{{ $t('Action') }}</th>
      </tr>

      <tr v-for="index in this.getListPost.length" :key="index">
        <td>{{ this.getListPost[index - 1].id }}</td>
        <td>{{ this.getListPost[index - 1].name }}</td>
        <td>{{ this.getListPost[index - 1].admin.name }}</td>
        <td>
          <a href="#"
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <i class="fa fa-edit"></i>
            {{ $t('Edit') }}
          </a>
          <a href="#"
             class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <i class="fa fa-trash"></i>
            {{ $t('Delete') }}
          </a>
        </td>
      </tr>
      </tbody>

    </table>

    <div class="mt-5">
      <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
          <li>
            <a href="#"
               class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {{ $t('Previous') }}
            </a>
          </li>

          <li v-for="index in this.getTotalPage" :key="index">
            <a v-if="index === this.getCurrentPage"
               href="#" aria-current="page"
               :data-page="index"
               @click="changePage"
               class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
              {{ index }}
            </a>
            <a v-else
               href="#"
               :data-page="index"
               @click="changePage"
               class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              {{ index }}
            </a>
          </li>
          <li>
            <a href="#"
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
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loading from 'vue-loading-overlay';
import {useMeta} from 'vue-meta'
import i18n from "@/i18n";

export default {
  setup() {
    useMeta({
      title: i18n.t('Admin list post')
    });
  },
  name: 'AdminListPost',
  computed: {
    ...mapGetters('ListPostStore', ['getListPost', 'getLoading', 'getTotalPage', 'getCurrentPage'])
  },
  components: {Loading},
  methods: {
    ...mapActions('ListPostStore', ['getListPostAction']),
    ...mapMutations('ListPostStore', ['setListPost', 'setCurrentPage', 'setTotalPage']),
    changePage(event) {
       this.setCurrentPage(event.target.getAttribute('data-page'));
       this.setTotalPage(this.getTotalPage);
    }
  },
  beforeMount() {
    this.getListPostAction();
  }
}
</script>
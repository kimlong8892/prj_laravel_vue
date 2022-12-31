<template>
  <div class="mt-3 mb-5 text-center" v-if="this.totalPage > 1">
    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px">
        <li v-if="this.currentPage > 1">
          <a href="#"
             @click="() => $emit('update:modelValue', this.currentPage - 1)"
             class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {{ $t('Previous') }}
          </a>
        </li>

        <li v-for="index in this.totalPage" :key="index">
          <a v-if="index === this.currentPage"
             href="#" aria-current="page"
             :data-page="index"
             class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
            {{ index }}
          </a>
          <a v-else
             href="#"
             :data-page="index"
             @click="() => $emit('update:modelValue', index)"
             class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {{ index }}
          </a>
        </li>
        <li v-if="this.currentPage < this.totalPage">
          <a href="#"
             @click="() => $emit('update:modelValue', this.currentPage + 1)"
             class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {{ $t('Next') }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
      name: 'PaginationCustom',
      props: {
          currentPage: {
              type: String,
              value: ''
          },
          totalPage: {
            type: String,
            value: ''
          },
          modelValue: {
            type: String,
            value: ''
          }
      }
  }
</script>
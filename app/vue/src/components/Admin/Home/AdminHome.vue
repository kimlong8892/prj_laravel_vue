<template>
  <section class="m-4 bg-white border border-gray-300 border-solid rounded shadow">
    <section class=" flex flex-row flex-wrap items-center text-center border-b border-solid border-gray-300">
      <div class="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r"><span
          class="text-xs font-medium text-gray-500 uppercase">TOTAL REVENUE</span>
        <div class="py-4 flex items-center justify-center text-center"><span class="mr-4 text-3xl">$485,985</span> <span
            class="inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs">+9.1%</span></div>
      </div>
      <div class="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r"><span
          class="text-xs font-medium text-gray-500 uppercase">PREDICTED MONTHLY REVENUE</span>
        <div class="py-4 flex items-center justify-center text-center"><span class="mr-4 text-3xl">$6,576</span> <span
            class="inline-flex items-center bg-green-500 h-6 px-2 rounded text-white text-xs">+12.0%</span></div>
      </div>
      <div class="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r"><span
          class="text-xs font-medium text-gray-500 uppercase">ACTIVE RENTERS</span>
        <div class="py-4 flex items-center justify-center text-center"><span class="mr-4 text-3xl">152</span> <span
            class="inline-flex items-center bg-red-500 h-6 px-2 rounded text-white text-xs">-12</span></div>
      </div>
      <div
          class="p-4 w-full sm:w-1/2 lg:w-1/4 border-b border-solid border-gray-300 md:border-b-0 sm:border-r flex flex-col items-center">
        <span class="text-xs font-medium text-gray-500 uppercase">PENDING RENTS</span> <span
          class="block py-4 text-gray-500 text-3xl">$930,10</span></div>
    </section>
  </section>
</template>

<script>
import {useMeta} from 'vue-meta'
import i18n from '../../../i18n';

export default {
  setup() {
    useMeta({
      title: i18n.t('Admin home')
    });
  },
  name: 'AdminHome'
}
</script>
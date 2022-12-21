<template>
  <h1>{{ getTest }}</h1>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'TestInclude',
    computed: {
      ...mapGetters(['getTest'])
    }
  }
</script>
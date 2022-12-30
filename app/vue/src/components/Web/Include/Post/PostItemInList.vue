<template>
  <div class="p-2">
    <img :src="this.image" :alt="this.name" class="image-item-post">
    <h3>{{ this.name }}</h3>
  </div>
</template>

<script>
  export default {
      name: 'PostItemList',
      props: {
        image: {
            type: String,
            value: ''
        },
        name: {
            type: String,
            value: ''
        }
      }
  }
</script>

<style scoped>
  .image-item-post {
      border-radius: 10px;
  }
</style>
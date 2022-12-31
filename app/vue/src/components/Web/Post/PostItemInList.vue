<template>
    <div class="p-2">
        <router-link :to="'/post/' + this.id">
            <img :src="this.image" :alt="this.name" class="image-item-post">
            <h3 class="mt-2">{{ this.name }}</h3>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'PostItemList',
    props: {
        image: {
            type: String,
        },
        name: {
            type: String,
        },
        id: {
            type: String,
        }
    }
}
</script>

<style scoped>
.image-item-post {
    border-radius: 10px;
}
</style>
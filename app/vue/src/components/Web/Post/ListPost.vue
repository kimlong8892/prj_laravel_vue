<template>
    <div class="container mx-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" v-if="this.getListPost">
        <div class="col-span-1 flex flex-col bg-white border-2 p-4" v-for="index in this.getListPost.length" :key="index">
            <PostItemList :image="this.getListPost[index - 1].image" :name="this.getListPost[index - 1].name" :id="this.getListPost[index - 1].id" />
        </div>
    </div>
</template>

<script>
    import PostItemList from "@/components/Web/Post/PostItemInList";
    import {mapGetters} from "vuex";
    export default {
        name: 'ListPost',
        components: {PostItemList},
        computed: {
            ...mapGetters('ListPostStore', ['getListPost'])
        }
    }
</script>
<template>
    <div class="container mx-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" v-if="this.listData">
        <div class="col-span-1 flex flex-col bg-white border-2 p-4" v-for="index in this.listData.length" :key="index">
            <PostItemList :image="this.listData[index - 1].image" :name="this.listData[index - 1].name" :id="this.listData[index - 1].id" />
        </div>
    </div>
</template>

<script>
    import PostItemList from "@/components/Web/Post/PostItemInList";
    export default {
        name: 'ListPost',
        components: {PostItemList},
        props: {
            listData: {
                type: Object
            }
        }
    }
</script>
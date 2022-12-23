<template>
    <p class="text-red text-center">{{ this.error }}</p>
</template>

<script>
    export default {
        name: 'ErrorAlert',
        props: {
            error: String
        }
    }
</script>
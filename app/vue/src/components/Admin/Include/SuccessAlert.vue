<template>
    <p class="text-success text-center">{{ this.success }}</p>
</template>

<script>
export default {
    name: 'SuccessAlert',
    props: {
        success: String
    }
}
</script>
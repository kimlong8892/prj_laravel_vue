<template>
    <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {{ $t(this.label) }}
            <RequiredIcon v-if="this.required"/>
        </label>
        <input :type="this.type"
               :name="this.name"
               :placeholder="$t(this.label)"
               :value="modelValue"
               @blur="(event) => $emit('update:modelValue', event.target.value)"
               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <p class="text-red" v-if="this.error">{{ $t(this.error) }}</p>
    </div>
</template>

<script>
    import RequiredIcon from "@/components/Admin/Include/RequiredIcon";

    export default {
        name: 'InputField',
        components: {RequiredIcon},
        props: {
            'modelValue': String,
            'name': {
                type: String,
                value: ''
            },
            'label': {
                type: String,
                value: ''
            },
            'type': {
                type: String,
                value: ''
            },
            'error': {
                type: String,
                value: ''
            },
            'required': {
                type: Boolean,
                value: false
            }
        }
    }
</script>
<template>
  <div>
    <label :for="this.name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ $t(this.label) }}
      <RequiredIcon v-if="this.required"/>
    </label>
    <ckeditor :editor="this.modelEditor"
              :name="this.name"
              :config="this.modelEditorConfig"
              :modelValue="this.modelValue"
              @input="(value) => changeValue(value)">{{ this.modelValue }}</ckeditor>
    <p class="text-red" v-if="this.error">{{ $t(this.error) }}</p>
  </div>
</template>

<script>
import RequiredIcon from "@/components/Admin/Include/RequiredIcon.vue";
import {ckeditorConfig} from "@/helpers/functions";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'CkeditorField',
  components: {RequiredIcon},
  props: {
    'modelValue': {
      type: String,
      value: ''
    },
    'name': {
      type: String,
      value: ''
    },
    'label': {
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
  },
  data() {
      return {
        modelEditor: ClassicEditor,
        modelEditorConfig: ckeditorConfig()
      }
  },
  methods: {
    changeValue(value) {
      this.$emit('update:modelValue', value);
    }
  }
}
</script>
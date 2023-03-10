<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <loading v-model:active="this.getLoading"
             :is-full-page="true"/>

    <ErrorAlert v-if="this.getUpdateError" :error="this.getUpdateError"/>
    <ErrorAlert v-if="this.getDetailError" :error="this.getDetailError"/>

    <form v-else class="space-y-4 md:space-y-6" @submit.prevent="submitForm">
      <img v-if="this.getImageUrl" :src="this.getImageUrl" alt="" style="width: 128px"/>

      <div>
        <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {{ $t('Avatar post') }}
        </label>
        <input type="file" name="image" accept="image/*"
               @change="uploadImage($event)"/>
      </div>
      <InputField name="email"
                  :modelValue="this.name"
                  @update:modelValue="this.name = $event; validate();"
                  :error="this.errors.name"
                  type="text"
                  label="Name"
                  :required="true"
      />
      <CkeditorField name="content"
                     :modelValue="this.content"
                     @update:modelValue="this.content = $event; validate();"
                     :error="this.errors.content"
                     label="Content"
                     :required="true"
      />

      <button type="submit"
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {{ $t('Save') }}
      </button>
    </form>
    <SuccessAlert v-if="this.getIsSuccessUpdate" :success="$t('UPDATE_POST_SUCCESS')"/>
  </section>
</template>

<script>
import {useMeta} from "vue-meta";
import i18n from "@/i18n";
import InputField from "@/components/Admin/Include/InputField.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Loading from 'vue-loading-overlay';
import ErrorAlert from "@/components/Admin/Include/ErrorAlert.vue";
import SuccessAlert from "@/components/Admin/Include/SuccessAlert.vue";
import CkeditorField from "@/components/Admin/Include/CkeditorField.vue";

export default {
  setup() {
    useMeta({
      'title': i18n.t('Admin post edit')
    })
  },
  computed: {
    ...mapGetters('PostStore', ['getImageUrl', 'getName', 'getContent', 'getLoading', 'getDetailError', 'getUpdateError', 'getIsSuccessUpdate'])
  },
  data() {
    return {
      errors: [],
      id: this.$route.params.id,
      name: '',
      content: '',
      image: null
    }
  },
  components: {CkeditorField, InputField, Loading, ErrorAlert, SuccessAlert},
  name: 'AdminEditPost',
  methods: {
    validate() {
      let isInvalid = false;
      this.errors = [];

      if (this.name === '') {
        this.errors.name = 'FIELD_IS_REQUIRED';
        isInvalid = true;
      }

      if (this.content === '') {
        this.errors.content = 'FIELD_IS_REQUIRED';
        isInvalid = true;
      }

      return isInvalid;
    },
    submitForm() {
      const isInvalid = this.validate();

      if (!isInvalid) {
        this.setName(this.name);
        this.setContent(this.content);
        this.setImage(this.image);
        this.updatePostAction(this.id);
      }
    },
    ...mapActions('PostStore', ['getPostEditAction', 'updatePostAction']),
    ...mapMutations('PostStore', ['setName', 'setContent', 'setImage', 'setImageUrl']),
    uploadImage(event) {
      this.image = event.target.files[0];
      this.setImageUrl(URL.createObjectURL(this.image));
    }
  },
  async beforeMount() {
    await this.getPostEditAction(this.id);
    this.name = this.getName;
    this.content = this.getContent;
  },
}
</script>
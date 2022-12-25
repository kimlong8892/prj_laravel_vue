<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <loading v-model:active="this.getLoading"
                 :is-full-page="true"/>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="p-3 text-center">
                        <img class="w-50 mr-2 rounded-full d-inline" src="/images/avatar.png" alt="logo">
                    </div>
                    <h1 class="text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {{ $t('LOGIN') }}
                    </h1>
                    <ErrorAlert v-if="this.getError" :error="$t(this.getError)"/>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="submitLogin">
                        <InputField name="email"
                                    :modelValue="this.email"
                                    @update:modelValue="this.email = $event; validate();"
                                    :error="this.errors.email"
                                    type="text"
                                    label="EMAIL"
                                    />

                        <InputField name="password"
                                    :modelValue="this.password"
                                    @update:modelValue="this.password = $event; validate();"
                                    :error="this.errors.password"
                                    type="password"
                                    label="PASSWORD"
                                    />
                        <div>
                            <vue-recaptcha @verify="verifyCaptcha" class="w-100"
                                           ref="recaptcha"
                                           @reset="resetCaptcha()"
                                           :sitekey="this.recaptchaSiteKey"></vue-recaptcha>
                            <p class="text-red" v-if="errors.recaptcha">{{ $t(errors.recaptcha) }}</p>
                        </div>
                        <button type="submit"
                                class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ $t('LOGIN') }}
                        </button>
                        <div class="text-right mt-0">
                            <RouterLink to="/admin/forgot-password"
                                        class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                {{ $t('FORGOT_PASSWORD') }}?
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {isEmail} from "@/helpers/functions";
import {VueRecaptcha} from 'vue-recaptcha';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {useMeta} from 'vue-meta'
import InputField from "@/components/Admin/Include/InputField";
import ErrorAlert from "@/components/Admin/Include/ErrorAlert";
import i18n from '../../../i18n';

export default {
    setup() {
        useMeta({
            title: i18n.t('Admin login')
        });
    },
    name: 'AdminLogin',
    computed: {
        ...mapGetters('AdminLoginStore', [
            'getError',
            'getLoading'
        ])
    },
    components: {VueRecaptcha, Loading, InputField, ErrorAlert},
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            recaptcha: '',
            recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY
        };
    },
    methods: {
        validate() {
            let isInvalid = false;
            this.errors = [];

            if (this.email === '') {
                this.errors.email = 'FIELD_IS_REQUIRED';
                isInvalid = true;
            } else if (!isEmail(this.email)) {
                this.errors.email = 'FIELD_IS_EMAIL';
                isInvalid = true;
            }

            if (this.password === '') {
                this.errors.password = 'FIELD_IS_REQUIRED';
                isInvalid = true;
            }

            if (this.recaptcha === '') {
                this.errors.recaptcha = 'FIELD_IS_REQUIRED';
                isInvalid = true;
            }

            return isInvalid;
        },
        submitLogin() {
            this.setError('');
            const isInvalid = this.validate();

            if (!isInvalid) {
                this.login({
                    email: this.email, password: this.password, recaptcha: this.recaptcha
                });
                this.resetCaptcha();
            }
        },
        ...mapActions('AdminLoginStore', ['login']),
        ...mapMutations('AdminLoginStore', ['setLoading', 'setError']),
        verifyCaptcha(response) {
            this.recaptcha = response;
            this.validate();
        },
        resetCaptcha() {
            this.$refs.recaptcha.reset();
            this.recaptcha = '';
        },
    },
}
</script>

<style scoped>


</style>
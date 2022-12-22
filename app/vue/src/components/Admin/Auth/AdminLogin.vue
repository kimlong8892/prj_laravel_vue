<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <loading v-model:active="this.getLoading"
                 :is-full-page="fullPage"/>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div class="p-3 text-center">
                        <img class="w-50 mr-2 rounded-full d-inline" src="/images/avatar.png" alt="logo">
                    </div>
                    <h1 class="text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {{ $t('LOGIN') }}
                    </h1>
                    <p class="text-red text-center" v-if="this.getError">{{ $t(this.getError) }}</p>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="submitLogin">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ $t('EMAIL') }}
                                <RequiredIcon/>
                            </label>
                            <input type="email"
                                   name="email"
                                   id="email"
                                   v-model="email"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="">
                            <p class="text-red" v-if="errors.email">{{ $t(errors.email) }}</p>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                {{ $t('PASSWORD') }}
                                <RequiredIcon/>
                            </label>
                            <input type="password"
                                   name="password"
                                   id="password"
                                   v-model="password"
                                   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <p class="text-red" v-if="errors.password">{{ $t(errors.password) }}</p>
                        </div>
                        <div>
                            <vue-recaptcha @verify="verifyMethod" class="w-100"
                                           ref="recaptcha"
                                           @reset="resetCaptcha()"
                                           :sitekey="this.recaptchaSiteKey"></vue-recaptcha>
                            <p class="text-red" v-if="errors.recaptcha">{{ $t(errors.recaptcha) }}</p>
                        </div>
                        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ $t('LOGIN') }}
                        </button>
                        <div class="items-center text-center">
                            <RouterLink to="/admin/forgot-password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
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
import RequiredIcon from "@/components/Admin/Include/RequiredIcon";
import { VueRecaptcha } from 'vue-recaptcha';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
    name: 'AdminLogin',
    computed: {
        ...mapGetters(['getError', 'getLoading'])
    },
    components: {VueRecaptcha, RequiredIcon, Loading},
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            recaptcha: '',
            recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
            fullPage: true
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
                this.setLoading(true);
                this.setEmail(this.email);
                this.setPassword(this.password);
                this.setRecaptcha(this.recaptcha);
                this.login();
                this.resetCaptcha();
            }
        },
        ...mapActions(['login']),
        ...mapMutations(['setEmail', 'setPassword', 'setRecaptcha', 'setLoading', 'setError']),
        verifyMethod(response) {
            this.recaptcha = response;
            this.validate();
        },
        resetCaptcha() {
            this.$refs.recaptcha.reset();
            this.recaptcha = '';
        }
    },
}
</script>

<style scoped>


</style>
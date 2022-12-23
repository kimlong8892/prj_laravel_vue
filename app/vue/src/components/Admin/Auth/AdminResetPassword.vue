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
                        {{ $t('FORGOT_PASSWORD') }}
                    </h1>

                    <ErrorAlert v-if="this.getError" :error="this.getError"/>
                    <SuccessAlert v-if="this.getSuccess" :success="$t('RESET_PASSWORD_SUCCESS')"/>

                    <form class="space-y-4 md:space-y-6" @submit.prevent="submitResetPassword">
                        <InputField name="password"
                                    :modelValue="this.password"
                                    @update:modelValue="this.password = $event; validate();"
                                    :error="this.errors.password"
                                    type="password"
                                    label="PASSWORD"
                        />

                        <InputField name="confirm_password"
                                    :modelValue="this.confirmPassword"
                                    @update:modelValue="this.confirmPassword = $event; validate();"
                                    :error="this.errors.confirmPassword"
                                    type="password"
                                    label="CONFIRM PASSWORD"
                        />

                        <div>
                            <vue-recaptcha @verify="verifyCaptcha" class="w-100"
                                           ref="recaptcha"
                                           @reset="resetCaptcha()"
                                           :sitekey="this.recaptchaSiteKey"></vue-recaptcha>
                            <p class="text-red" v-if="errors.recaptcha">{{ $t(errors.recaptcha) }}</p>
                        </div>
                        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ $t('RESET_PASSWORD') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { VueRecaptcha } from 'vue-recaptcha';
    import InputField from "@/components/Admin/Include/InputField";
    import SuccessAlert from "@/components/Admin/Include/SuccessAlert";
    import ErrorAlert from "@/components/Admin/Include/ErrorAlert";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import Loading from 'vue-loading-overlay';

    export default {
        name: 'AdminResetPassword',
        computed: {
            ...mapGetters('AdminResetPasswordStore', ['getError', 'getSuccess', 'getLoading'])
        },
        components: {VueRecaptcha, InputField, SuccessAlert, ErrorAlert, Loading},
        data() {
            return {
                errors: [],
                recaptcha: '',
                recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
                password: '',
                confirmPassword: '',
                email: new URL(location.href).searchParams.get('email'),
                token: new URL(location.href).searchParams.get('token'),
            }
        },
        methods: {
            ...mapActions('AdminResetPasswordStore', ['resetPassword']),
            ...mapMutations('AdminResetPasswordStore', ['setLoading', 'setError']),
            validate() {
                let isInvalid = false;
                this.errors = [];

                if (this.password === '') {
                    this.errors.password = 'FIELD_IS_REQUIRED';
                    isInvalid = true;
                }

                if (this.confirmPassword === '') {
                    this.errors.confirmPassword = 'FIELD_IS_REQUIRED';
                    isInvalid = true;
                }

                if (this.password !== '' && this.confirmPassword !== '' && this.password !== this.confirmPassword) {
                    this.errors.confirmPassword = 'CONFIRM_PASSWORD_ERROR';
                    isInvalid = true;
                }

                if (this.recaptcha === '') {
                    this.errors.recaptcha = 'FIELD_IS_REQUIRED';
                    isInvalid = true;
                }

                return isInvalid;
            },
            submitResetPassword() {
                this.setError('');
                const isInvalid = this.validate();

                if (!isInvalid) {
                    this.resetPassword({
                        email: this.email, password: this.password, token: this.token, recaptcha: this.recaptcha
                    });
                    this.resetCaptcha();
                }
            },
            verifyCaptcha(response) {
                this.recaptcha = response;
                this.validate();
            },
            resetCaptcha() {
                this.$refs.recaptcha.reset();
                this.recaptcha = '';
            },
        }
    }
</script>
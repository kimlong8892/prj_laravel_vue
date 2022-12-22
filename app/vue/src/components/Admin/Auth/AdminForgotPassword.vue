<template>
    <div class="card card-container">
        <img id="profile-img" class="profile-img-card" src="/images/avatar.png" alt=""/>
        <form class="form-signing" method="POST" @submit.prevent="submitForgotPassword">
            <div class="form-group">
                <label for="email">
                    {{ $t('EMAIL') }}
                    <RequiredIcon/>
                </label>
                <input type="text"
                       @blur="validate()"
                       name="email"
                       v-model="email"
                       class="form-control">
                <p class="text-danger" v-if="errors.email">{{ $t(errors.email) }}</p>
            </div>
            <div class="form-group mt-2 mb-2 d-flex align-items-center">
<!--                <vue-recaptcha class="w-100"-->
<!--                               sitekey="6Lf12p8bAAAAAJXePjQJMnVeRBspHTR4APJ85VTL"></vue-recaptcha>-->
            </div>
            <button class="btn btn-lg btn-primary btn-block btn-signing" type="submit">{{
                    $t('FORGOT_PASSWORD')
                }}
            </button>
        </form>
        <router-link class="forgot-password" to="/admin/login">{{ $t('LOGIN') }}</router-link>
    </div>
</template>

<script>
import RequiredIcon from "@/components/Admin/Include/RequiredIcon";
import {isEmail} from "@/helpers/functions";

export default {
    name: 'AdminForgotPassword',
    components: {RequiredIcon},
    data() {
        return {
            email: '',
            errors: [],
            recaptcha: ''
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

            return isInvalid;
        },
        submitForgotPassword() {
            const isInvalid = this.validate();

            if (!isInvalid) {
                alert(1);
            }
        }
    }
}
</script>

<style scoped>

.card-container.card {
    max-width: 350px;
    padding: 40px 40px;
}

.btn {
    font-weight: 700;
    height: 36px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}

/*
 * Card component
 */
.card {
    background-color: #F7F7F7;
    /* just in case there no content*/
    padding: 20px 25px 30px;
    margin: 50px auto 25px;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

/*
 * Form styles
 */
.profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
}

.form-signing #inputEmail,
.form-signing #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
}

.form-signing input[type=email],
.form-signing input[type=password],
.form-signing input[type=text],
.form-signing button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signing .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
}

.btn.btn-signing {
    /*background-color: #4d90fe; */
    background-color: rgb(104, 145, 162);
    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
    padding: 0;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signing:hover,
.btn.btn-signing:active,
.btn.btn-signing:focus {
    background-color: rgb(12, 97, 33);
}

.forgot-password {
    color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus {
    color: rgb(12, 97, 33);
}
</style>
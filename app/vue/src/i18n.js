import { createI18n } from 'vue-i18n-lite';

const i18n = createI18n({
    locale: 'vi',
    messages: {
        'en': {
            home: 'Home'
        },
        'vi': {
            INVALID_EMAIL_OR_PASSWORD: 'Sai email hoặc mật khẩu',
            FIELD_IS_REQUIRED: 'Trường này không được bỏ trống',
            FIELD_IS_EMAIL: 'Sai định dạng email',
            EMAIL: 'Địa chỉ email',
            PASSWORD: 'Mật khẩu',
            LOGIN: 'Đăng nhập',
            FORGOT_PASSWORD: 'Quên mật khẩu',
            "error captcha": "Lỗi captcha"
        }
    }
});

export default i18n;



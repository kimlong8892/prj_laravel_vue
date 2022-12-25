import { createI18n } from 'vue-i18n-lite';

const i18n = createI18n({
    locale: 'vi',
    messages: {
        'en': {
            "home": 'Home'
        },
        'vi': {
            "INVALID_EMAIL_OR_PASSWORD": 'Sai email hoặc mật khẩu',
            "FIELD_IS_REQUIRED": 'Trường này không được bỏ trống',
            "FIELD_IS_EMAIL": 'Sai định dạng email',
            "EMAIL": 'Địa chỉ email',
            "PASSWORD": 'Mật khẩu',
            "LOGIN": 'Đăng nhập',
            "FORGOT_PASSWORD": 'Quên mật khẩu',
            "error captcha": "Lỗi captcha",
            "FORGOT_PASSWORD_SUCCESS": "Vui lòng kiểm tra email[{email}] để đặt lại mật khẩu",
            "CONFIRM PASSWORD": "Nhập lại mật khẩu",
            "RESET_PASSWORD": "Đặt lại mật khẩu",
            "CONFIRM_PASSWORD_ERROR": "Mật khẩu không trùng nhau",
            "RESET_PASSWORD_SUCCESS": "Đặt lại mật khẩu thành công",
            "passwords.token": "Link đặt mật khẩu không còn tồn tại",
            "passwords_user": "Người dùng này không còn tồn tại",
            "passwords_throttled": "Bạn đã đặt lại mật khẩu mới đây, vui lòng đợi ít phút",
            "hello": "Xin chào",
            "Admin home": "Trang chủ quản trị",
            "Admin login": "Đăng nhập quản trị",
            "Admin forgot password": "Quên mật khẩu quản trị",
            "Admin reset password": "Đặt lại mật khẩu quản trị"
        }
    }
});

export default i18n;



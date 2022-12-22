export default {
    getEmail: state => state.email,
    getPassword: state => state.password,
    getError: state => state.error,
    getRecaptcha: state => state.recaptcha,
    getLoading: state => state.isLoading
}
export default {
    setEmail(state, email) {
        state.email = email;
    },
    setPassword(state, password) {
        state.password = password;
    },
    setError(state, error) {
        state.error = error;
    },
    setRecaptcha(state, recaptcha) {
        state.recaptcha = recaptcha;
    },
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    }
}
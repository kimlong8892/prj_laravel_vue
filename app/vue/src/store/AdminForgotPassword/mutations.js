export default {
    setError(state, error) {
        state.error = error;
    },
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setSuccess(state, isSuccess) {
        state.isSuccess = isSuccess;
    }
}
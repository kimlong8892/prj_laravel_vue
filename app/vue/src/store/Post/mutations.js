export default {
    setName(state, name) {
        state.name = name;
    },
    setContent(state, content) {
        state.content = content;
    },
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    },
    setDetailError(state, detailError) {
        state.detailError = detailError;
    },
    setUpdateError(state, updateError) {
        state.updateError = updateError;
    },
    setIsSuccessUpdate(state, isSuccessUpdate) {
        state.isSuccessUpdate = isSuccessUpdate;
    }
}
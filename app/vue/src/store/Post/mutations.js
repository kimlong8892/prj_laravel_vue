export default {
    setId(state, id) {
        state.id = id;
    },
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
    },
    setAddError(state, addError) {
        state.addError = addError;
    },
    setImage(state, image) {
        state.image = image;
    },
    setImageUrl(state, imageUrl) {
        state.imageUrl = imageUrl;
    }
}
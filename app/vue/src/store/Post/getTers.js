export default {
    getName: state => state.name,
    getContent: state => state.content,
    getLoading: state => state.isLoading,
    getDetailError: state => state.detailError,
    getUpdateError: state => state.updateError,
    getIsSuccessUpdate: state => state.isSuccessUpdate,
    getAddError: state => state.addError,
    getImage: state => state.image,
    getImageUrl: state => state.imageUrl
}
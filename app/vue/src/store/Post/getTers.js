export default {
    getName: state => state.name,
    getContent: state => state.content,
    getLoading: state => state.isLoading,
    getDetailError: state => state.detailError,
    getUpdateError: state => state.updateError,
    getIsSuccessUpdate: state => state.isSuccessUpdate
}
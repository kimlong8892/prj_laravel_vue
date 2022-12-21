export default {
    updateTest(context, test) {
        console.log(test);
        context.commit('setTest', 'ABC');
    }
}
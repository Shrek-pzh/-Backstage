import mockRequest from "@/utils/mockRequest";

const state = {
    homeData: {}
}
const mutations = {
    GETALLDATA(state, params) {
        state.homeData = params
    }
}
const actions = {
    async getallData({ commit }) {
        let res = await mockRequest({
            url: "/home/alldata",
            method: "get",
        });
        if (res.code == 20000 || res.code == 200) {
            commit("GETALLDATA", res.data)
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    actions:{},
    mutations:{
        getActiveUser(state,activeUser){
            state.activeUser={
                ...activeUser,
            };
            state.activeUserInfo={
                ...activeUser,
            }
        },
        getActiveUserInfo(state,activeUserInfo){
            const age=(new Date().getTime() - new Date(activeUserInfo.birthday)) / (24 * 3600 * 365.25 * 1000);
            const currentAge=age.toFixed(0);
            state.activeUserInfo={
                ...activeUserInfo,
                birthday: currentAge,
            };
        },
    },
    state:{
        activeUser:{
            name:'',
            secondName:'',
            email:'',
            telephone:'',
            images:[],
        },
        activeUserInfo:{
            birthday: '',
            country: '',
            city: '',
            education: '',
            friends:[],
        }
    },
    getters:{},
    modules:{},
})
import Vue from "vue";
import Router from "vue-router";

//components
import Login from "../components/Login";
import Sign from "../components/Sign";
import AboutUs from "../components/AboutUs";
import HomeContent from "../components/HomeContent";
import UserPage from "../components/UserPage";
import AddInformation from "../components/AddInformation";
import Options from "../components/Options";
import Users from "../components/Users";
import Friends from "@/components/Friends";

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path:'/',
            name:'HomeContent',
            component: HomeContent,
        },
        {
            path:'/login',
            name:'Login',
            component: Login,
        },
        {
            path:'/sign',
            name:'Sign',
            component: Sign,
        },
        {
            path:'/about',
            name:'AboutUs',
            component: AboutUs,
        },
        {
            path:'/user',
            name:'UserPage',
            component: UserPage,
        },
        {
            path:'/aboutYou',
            name:'AddInformation',
            component: AddInformation,
        },
        {
            path:'/options',
            name:'Options',
            component: Options,
        },
        {
            path:'/users',
            name:'Users',
            component: Users,
        },
        {
            path:'/friends',
            name:'Friends',
            component: Friends,
        },
    ],
})
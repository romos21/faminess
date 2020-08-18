import Api from "./Api.js";
export default {
    sign(userInformation){
        return Api().post('sign',userInformation);
    },
    updateUserInfo(userInformation){
        return Api().post('updateUserInfo',userInformation);
    },
    login(userInformation){
        return Api().post('login',userInformation);
    },
    addInfo(userInformation){
        return Api().post('userInfo',userInformation);
    },
    getInfo(user){
        return Api().get('userInfo?user='+user);
    },
    uploadAvatar(userAvatar){
        return Api().post('uploadAvatar',userAvatar);
    },
    uploadPost(userPost){
        return Api().post('uploadPost',userPost);
    },
    getAllUsers(email){
        return Api().get('users?email='+email);
    },
    addFriend(user){
        return Api().post('friends',user);
    },

};
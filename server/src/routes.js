const AuthenticationController=require('./controllers/AuthenticationController');


module.exports=(app,upload)=>{
    app.post('/sign',AuthenticationController.sign);
    app.post('/updateUserInfo',AuthenticationController.updateUserInfo);
    app.post('/login',AuthenticationController.login);
    app.post('/userInfo',AuthenticationController.addUserInfo);
    app.get('/userInfo',AuthenticationController.getUserInfo);
    app.get('/users',AuthenticationController.getAllUsers);
    app.post('/friends',AuthenticationController.addFriend);
    app.post('/uploadAvatar',upload.single('avatar'),AuthenticationController.uploadImage);
    app.post('/uploadPost',upload.single('post'),AuthenticationController.uploadImage);
};
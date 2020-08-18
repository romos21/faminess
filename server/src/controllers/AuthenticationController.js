const {user,userInfo,sequelize}=require('../models');

module.exports={
  async sign(req,res){
      try {
          const User=await user.create(req.body);
          const userJSON=User.toJSON();
          res.send(userJSON);
      }catch (err) {
          console.log(err);
          res.status(400).send({
              error: 'Error in AuthController sign'
          })
      }
  },

    async updateUserInfo(req,res){
      try{
          const User=await user.findOne({
              where:{
                  email:req.body.email,
                  password:req.body.password,
              }
          });
          if(!User){
              return 'no user found';
          }
          const userDataValues=User.dataValues;
          console.log(userDataValues);
          sequelize.sync()
              .then(async ()=>{
                  await user.update({
                      name:req.body.name?req.body.name:userDataValues.name,
                      secondName:req.body.secondName?req.body.secondName:userDataValues.secondName,
                      telephone:req.body.telephone?req.body.telephone:userDataValues.telephone,
                      email:req.body.email?req.body.email:userDataValues.email,
                      password:req.body.newPassword?req.body.newPassword:userDataValues.password,
                  },{
                      where:{
                          email:userDataValues.email,
                          password:userDataValues.password,
                      }
                  });

                  const userUpdateData=await user.findOne({
                      where:{
                          email:req.body.email?req.body.email:userDataValues.email,
                          password:req.body.newPassword?req.body.newPassword:userDataValues.password,
                      }
                  });
                  console.log(userUpdateData);
                  return userUpdateData;
              })
              .then(userUpdateData=>{
                  console.log('userUpdate',userUpdateData);
                  const userUpdateDataJSON=userUpdateData.toJSON();
                  res.send(userUpdateDataJSON);
              })


      }catch (err) {
          console.log(err);
      }
    },

    async login(req,res){
        try {
            const User=await user.findOne({
                where:{
                    email: req.body.email,
                    password:req.body.password
                }
            });
            if(!User){
                return 'no user found';
            }
            const userJSON=User.toJSON();

            console.log(userJSON);
            res.send(userJSON);
        }catch (err) {
            console.log(err);
            res.status(400).send({
                error: 'Error in AuthController login'
            })
        }
    },
    addUserInfo(req,res){
        try {
            sequelize.sync()
                .then(async ()=>{
                    let activeUser= await userInfo.findOne({where:{user:req.body.user}});

                    if(!activeUser){
                        activeUser= await userInfo.create(req.body);
                        console.log('hello');
                    }
                    else {
                        console.log(activeUser.dataValues);
                        const activeUserID=await userInfo.update({
                            birthday:req.body.birthday?req.body.birthday:activeUser.dataValues.birthday,
                            country:req.body.country?req.body.country:activeUser.dataValues.country,
                            city:req.body.city?req.body.city:activeUser.dataValues.city,
                            education:req.body.education?req.body.education:activeUser.dataValues.education,
                        }
                        ,{where:{user:activeUser.dataValues.user}});
                        activeUser=await userInfo.findOne({where:{user:req.body.user?req.body.user:activeUser.dataValues.user}});
                        console.log('AU updated',activeUser.dataValues);
                    }
                return activeUser;
                })
                .then((activeUser)=>{
                    const userInfoJSON=activeUser.toJSON();
                    res.send(userInfoJSON);
                }).catch((err)=>{
                    console.log(err);
            });
        }catch (err) {
            console.log(err);
            res.status(400).send({
                error: 'Error in AuthController getUserInfo'
            })
        }
    },
    getUserInfo(req,res){
      try {
          console.log("QQ", req.query.user);
          sequelize.sync().then(async (result) => {
              console.log("RM",result.models);
              if (result.models['userInfo']) {
                  const activeUser = await result.models.userInfo.findOne({where: {user: req.query.user}});
                  const activeUserJSON = activeUser.toJSON();
                  res.send(activeUserJSON);
              } else {
                  res.send({
                      birthday: '',
                      country: '',
                      city: '',
                      education: '',
                      user: '',
                  });
              }
          });
      }catch (e) {
          console.log('Error');
      }
    },
    uploadImage(req,res,next){
      console.log(req.body);
        if(!req.file){
            console.log("NOT FOUND");
            res.send('file not found')
        }
        res.send(req.file.path);
    },
    getAllUsers(req,res) {
        sequelize.sync()
            .then(async (result) => {
                const users=await result.models.user.findAll({
                    limit:10
                });
                const usersFilter=users.filter(user=>user.email!==req.query.email);
                console.log(usersFilter);
                res.send(usersFilter);
            })
    },

    async addFriend(req,res) {
      console.log('addFriend');
      try {
          sequelize.sync()
              .then((result) => {
                  const User=result.models.user.findOne({
                      where:{
                          email:req.body.activeUserEmail,
                      }
                  })
                  return {User,user:result.models.user};
              })
              .then(async ({User, user}) => {
                  if(!User.friends){
                      await user.update(
                          {
                              ...User,
                              friends:[],
                          },
                          {
                              where:{
                                  email:req.body.activeUserEmail,
                              }
                          }
                      )
                  }
                  user.update({
                      ...User,
                      friends:[User.friends,req.body.newFriendId],
                  },{
                      where:{
                          email:req.body.activeUserEmail,
                      }
                  })
              })
      }catch (err){
          console.log(err);
          console.log(err);
      }
    }

};
module.exports=(sequelize,DataTypes)=>{
    const userInfo=sequelize.define('userInfo'.toString(),{
        birthday:{
            type:DataTypes.DATEONLY
        },
        country:{
            type:DataTypes.STRING
        },
        city:{
            type:DataTypes.STRING
        },
        education:{
            type:DataTypes.STRING
        },
        user:{
            type:DataTypes.STRING,
            unique:true,
        },
    });
    return userInfo;
};


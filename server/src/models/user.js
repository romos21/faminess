module.exports=(sequelize,DataTypes)=>{
    const user=sequelize.define('user',{
        name:DataTypes.STRING,
        secondName:DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            unique:true,
        },
        telephone: {
            type:DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
        friends:DataTypes.JSON,
    });
    return user;
};
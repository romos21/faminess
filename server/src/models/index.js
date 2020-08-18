const Sequelize = require('sequelize');
const config=require('../config/config');


const db={};
const sequelize=new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
);

db.user=require('./user')(sequelize,Sequelize.DataTypes);
db.userInfo=require('./userInfo')(sequelize,Sequelize.DataTypes);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
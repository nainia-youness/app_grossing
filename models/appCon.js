const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: '../config/.env'});

const sequelize = new Sequelize(process.env.APPDATABASE_URL,{dialect: 'postgres',host: 'localhost',
dialectOptions: { 
    multipleStatements: false,
    requestTimeout: 180000
},
pool: {
  max: 10,
  min: 0,
  idle: 10000
}});

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

try{
    sequelize.authenticate();
    console.log("succesfully connected to APPLICATION DATABASE")
}catch(err){
    console.log(err)
}



module.exports = db;


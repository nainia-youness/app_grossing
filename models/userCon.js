const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: '../config/.env'});

const sequelize = new Sequelize(process.env.USERDATABASE_URL,{dialect: 'postgres',host: 'localhost',dialectOptions: { multipleStatements: false} });

const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.js')(sequelize, Sequelize);


try{
    sequelize.authenticate();
    console.log("succesfully connected to USER DATABASE")
}catch(err){
    console.log(err)
}



//const bcrypt = require("bcrypt");

/*
db.user.sync({force:true}).then(() => {
    console.log('New table created');
}).catch((error)=>{
    console.log(error)
}).finally(() => {
    sequelize.close();
});
*/


/*
db.user.findOne({
    where: {
    username: 'othman'
    }
}).then((uti) => console.log(JSON.stringify(uti)));
*/


/*
bcrypt.hash("Ziyad@2020", 10).then((hash)=>{
    db.user.create({
        username: 'ziyad',
        email: 'ziyad@gmail.com',
        password: hash
    });}).catch((err) => { console.log(err); });
*/

/*
// Find all users
db.user.findAll().then((util) => console.log(JSON.stringify(util))) ////console.log(JSON.stringify(util[0]))
.catch((error) => { console.log(error); });

*/



module.exports = db;
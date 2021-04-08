
module.exports= (sequelize, Sequelize) => {
    
const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()') // Or Sequelize.UUIDV1
      },

    username: { 
            type:Sequelize.STRING,
            allowNull: false, 
            required : true,
            validate: {
                notEmpty: true}
        }, 

    email: { 
            type:Sequelize.STRING,
            unique: true,
            allowNull: false,
            required : true, 
            validate:{
                notEmpty: true,
                isEmail: true }
        },

    password: { 
            type:Sequelize.STRING,
            allowNull: false, 
            required : true,
            validate: {
                notEmpty: true}
        },

    isAdmin : { 
            type:Sequelize.BOOLEAN,
            defaultValue: false },
},{
    tableName: 'users',
    timestamps: false
  });

        return User;

};
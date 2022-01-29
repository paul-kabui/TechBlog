const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');
const saltRounds = 10;

class User extends Model {
validatePassword(loginPwd) {
    bcrypt.compare(loginPwd, this.password).then(function(result) {
        return result
  	}).catch((err)=>{console.log('error')});
	}}
	User.init(
  //define user models attribute here
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username :{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
          },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6],
        },
    }
},
{   
    sequelize,
    freezeTableName: true, //stops auto-plurazation
    tableName: 'User',//defines the tables name
    underscored: true,
    // Add a hook so as to hash the password b4 its saved and updated
    // hooks performs action before thedata is saved in this case dat

        hooks: {
            beforeCreate: async (userData) => {
              userData.password = await bcrypt.hash(userData.password, saltRounds);
              return userData;
            },
            beforeUpdate: async (updatedUserData) => {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, saltRounds);
              return updatedUserData;
            },
          },
    }
);

module.exports = User;
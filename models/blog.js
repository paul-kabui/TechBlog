const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Blog extends Model {};
//define blog models attribute here
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'User',
              key: 'id',
            },
        },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Blog',
  }
);

module.exports = Blog;
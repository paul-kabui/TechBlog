const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {};
Comment.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
        },
    },
    blogId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Blog',
          key: 'id',
        },
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
    modelName: 'Comment',
}
);

module.exports = Comment;
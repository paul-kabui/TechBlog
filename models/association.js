const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');
// association must be pair
// association between user and blog
User.hasMany(Blog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'userId'
});

// association between user and comment
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

// association between blog and comment
Blog.hasMany(Comment, {
  foreignKey: 'blogId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blogId'
});

module.exports = { User, Blog, Comment};
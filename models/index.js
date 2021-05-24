const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// KEEP THIS! IT WORKS
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});


// KEEP THIS! IT WORKS
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// KEEP THIS! IT WORKS
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});




module.exports = {
  User,
  Comment,
  Post
};
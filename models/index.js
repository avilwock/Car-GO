const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Car = require('./Car');

User.hasMany (Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade' 
});

User.hasMany (Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany (Car, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Car.belongsTo (User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Comment, Car };


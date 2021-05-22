const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData);
  const posts = await Post.bulkCreate(postData);
  const comments = await Comment.bulkCreate(commentData);
  return users;
};

seedDatabase();

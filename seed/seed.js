const sequelize = require("../config/config");
const { User, Post } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData);
  const posts = await Post.bulkCreate(postData);
  return users;
};

seedDatabase();

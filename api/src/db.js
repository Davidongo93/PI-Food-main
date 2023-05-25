require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
//Instantiating Sequelize
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Reading all files from Models folder, they are required and added to the array  modelDefiners.
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inject Sequelize to all models
modelDefiners.forEach(model => model(sequelize));
// Uppercase models name ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Sequelize has all models in sequelize.models. we can use it destructuring.
const { Recipe,Diet } = sequelize.models;
// Then it can be related.
Recipe.belongsToMany(Diet, { through: 'recipe-diet' , timestamps: false });
Diet.belongsToMany(Recipe, { through: 'recipe-diet' , timestamps: false });

module.exports = {
  ...sequelize.models, // To import models like: const { Product, User } = require('./db.js');
  conn: sequelize,     // To import connection { conn } = require('./db.js');
};

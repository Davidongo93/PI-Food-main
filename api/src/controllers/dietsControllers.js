const axios = require('axios');
require('dotenv').config();
const { KEY, URL } = process.env;
const { Diet } = require('../db.js');
    
const createDiets = async () => {
  // Fetch diets from external API
  const response = await axios.get(`${URL}/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=40`);
  const data = response.data.results;

  // Create a Set to avoid duplicates
  const uniqueDiets = new Set();
  data.forEach((result) => {
    result.diets.forEach((diet) => {
      uniqueDiets.add(diet);
    });
  });

  // Sort and insert diets into database
  const sortedDiets = [...uniqueDiets].sort();
  await Diet.bulkCreate(sortedDiets.map((diet) => ({ diet })), { ignoreDuplicates: true });

  // Query diets from database and return them
  const diets = await Diet.findAll({
    attributes: ['diet'],
    order: [['diet', 'ASC']]
  });
  return diets.map((diet) => diet.diet);
};

module.exports = createDiets;

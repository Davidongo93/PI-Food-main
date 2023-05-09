const axios = require('axios');
require('dotenv').config();
const {KEY,URL} = process.env;
const {Diet} = require('../db.js');
    
    const createDiets = async ()=> 
    await axios.get(`${URL}/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=40`)
    .then(async(response)=>{
        const data = response.data.results;
        // se crea un set para que no hallan datos repetidos.
         const uniqueDiets = new Set();

data.forEach((result) => {
  result.diets.forEach((diet) => {
    uniqueDiets.add(diet);
  });
});
// se toman todos los elementos y se organizan
const sortedDiets = [...uniqueDiets].sort();
console.log(sortedDiets);
await Diet.bulkCreate(sortedDiets.map((diet) => ({ diet })), { ignoreDuplicates: true });

      
});

module.exports = createDiets;

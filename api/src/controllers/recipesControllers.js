const { Op } = require('sequelize');
const { Recipe,Diet } = require('../db.js');
const axios = require ('axios');
const {KEY,URL} = process.env;


// Controller function to create a new recipe
const createRecipe = async (title,image,summary,healthScore,analyzedInstructions,diets) => {
  // Create a new recipe in the database
    const newRecipe = await Recipe.create({title,image,summary,healthScore,analyzedInstructions});
  // Find or create instances of the diets associated with the recipe
    const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));
  // Associate the diets with the recipe
    await newRecipe.setDiets(dietInstances.map(diet => diet[0].id));
  // Get the diets associated with the recipe
    const recipeDiets = await newRecipe.getDiets();
  // Return an object containing the recipe information and the associated diets
    const result = [
       newRecipe,
        recipeDiets
     ] ;
  
    return result;
  };

// Utility function to clean up recipe data
const cleanArray = (arr) => {
  return arr.map((elem) => {
    const diets = elem.diets.map((diet) => {
      if (typeof diet === 'string') {
        return diet;
      } else {
        return diet.diet;
      }
    });

    return {
      id: elem.id,
      title: elem.title,
      image: elem.image,
      diets: diets,
      healthScore: elem.healthScore
    };
  });
};

// Function to search for recipes by title
const getRecipeByTitle = async (title) => {
  // Search for recipes in the database that match the title
    const dbRecipesRaw = await Recipe.findAll({
        where: {
            title:{
                [Op.iLike]:`%${title}%`
            }
        },
        limit:15
    });
    // Search for recipes in the external API that match the title
    const apiRecipesRaw= (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&query=${title}&addRecipeInformation=true`)).data.results;
    // Clean up the recipe data
    const apiRecipes = cleanArray(apiRecipesRaw);
    const dbRecipes = cleanArray(dbRecipesRaw);
    // Combine the results from the database and the API
    const result = [...dbRecipes,...apiRecipes]
    if (result.length === 0) {
        // Return an error message if no recipes were found
        return { message: `There's no avaliable recipes for your query: '${title}'.` };
    }
     // Return up to 15 recipes
    //return result.slice(0, 15);
    return result
    
};


const getAllRecipes = async () =>{
    const apiRecipesRaw= (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&addRecipeInformation=true`)).data.results;
    const dbRecipesRaw = await Recipe.findAll({
      include: [{
        model: Diet,
        attributes: ['id', 'diet'],
      }],
    });
    const dbRecipes = cleanArray(dbRecipesRaw);
    const apiRecipes = cleanArray(apiRecipesRaw);
    
    return await [...dbRecipes,...apiRecipes];
};
// Function to get a recipe by ID from the database or the external API
const getRecipeById = async(id,source) => {
    const response = 
    source === "api"
    ?await axios.get(`${URL}/${id}/information?apiKey=${KEY}`)
    :await Recipe.findByPk(id,{
        include: [{
          model: Diet,
          attributes: ['id', 'diet'],
        }],
      }).then(recipe => {
        if (!recipe) {
          throw new Error('UUID valid but Recipe not found');
        }
        const diets = recipe.diets.map(elem => ( elem.diet));
        const {id, title,image,summary,healthScore,analyzedInstructions} = recipe;
        return {id, title,image,summary,healthScore,diets,analyzedInstructions}
      })
  /*      .catch(error => {
      console.log(error.message);
      }); */

 if (source === "api") {
   // Get the recipe from the external API
        const {id,title, image, summary,healthScore,diets,analyzedInstructions} = response.data;
        return {id,title, image, summary,healthScore,diets,analyzedInstructions};
 } else {
       return response;
      }
};

module.exports = 
{createRecipe,getRecipeById, getRecipeByTitle, getAllRecipes}

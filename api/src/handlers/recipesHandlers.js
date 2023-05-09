const axios = require('axios');
const {Videogame} = require('../db.js');
//const {createRecipe,getRecipeById, getRecipeByName, getAllRecipes} = require ('../controllers/recipesControllers.js')

// Getting handlers.
const getRecipesHandler = async (req,res)=>  {
    const {name} = req.query;
    const results = name?await getRecipeByName(name):await getAllRecipes();

try {
    if (name){
        res.send(await results);

} else{
       res.send (await results);
       //console.log(await results);
   }
} catch (error) {
    
}
};

module.exports = {
   getRecipesHandler
}
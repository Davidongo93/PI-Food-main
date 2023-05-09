const axios = require('axios');
const {Recipe,Diet} = require('../db.js');
const {createRecipe,getRecipeById, getRecipeByTitle, getAllRecipes} = require ('../controllers/recipesControllers.js')


//post recipe handler
const postRecipesHandler = async (req,res)=>{
    const {title,image,summary,healthScore,analyzedInstructions,diets} = req.body;
    try {
       if(!title||!image||!summary||!healthScore||!analyzedInstructions||!diets) throw Error ("Missing data")
       const newRecipe = await createRecipe(title,image,summary,healthScore,analyzedInstructions,diets)
       res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};
// Get recipes handlers.
const getRecipesHandler = async (req,res)=>  {
    const {title} = req.query;
    console.log(title);
    const results = title?await getRecipeByTitle(title):await getAllRecipes();

try {
    if (title){
        res.send(await results);

} else{
       res.send (await results);
       //console.log(await results);
   }
} catch (error) {
    res.status(400).json({error:error.message});
}

};
const getRecipeByIdHandler = async (req,res)=>{
res.send("visualiza por ID")
}


module.exports = {
   getRecipesHandler,
   getRecipeByIdHandler,
   postRecipesHandler
}
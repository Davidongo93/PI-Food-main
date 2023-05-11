const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const {
    createRecipe,
    getRecipeById,
    getRecipeByTitle,
    getAllRecipes } = require('../controllers/recipesControllers.js');

// Handler for POST /recipes
const postRecipesHandler = async (req, res) => {
    const { title, image, summary, healthScore, analyzedInstructions, diets } = req.body;
    try {
        if (!title || !image || !summary || !healthScore || !analyzedInstructions || !diets) {
            throw Error("Missing data");
        }
 // Create the new recipe
        const newRecipe = await createRecipe(title, image, summary, healthScore, analyzedInstructions, diets);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler for GET /recipes
const getRecipesHandler = async (req, res) => {
    const { title } = req.query;

    // Get the results based on whether there's a title query or not
    const results = title ? await getRecipeByTitle(title) : await getAllRecipes();

    try {
        res.send(await results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Handler for GET /recipes/:id
const getRecipeByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";

    try {
        // Get the recipe by id
        const recipe = await getRecipeById(id, source);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getRecipesHandler,
    getRecipeByIdHandler,
    postRecipesHandler
};

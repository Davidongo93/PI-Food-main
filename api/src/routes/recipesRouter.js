const { Router } = require('express');
const recipesRouter = Router();
// Import handlers
const {
    getRecipesHandler,
    getRecipeByIdHandler,
    postRecipesHandler
} = require('../handlers/recipesHandlers.js');

// GET Routes
recipesRouter.get('/', getRecipesHandler);
recipesRouter.get('/:id', getRecipeByIdHandler);

// POST Route
recipesRouter.post('/', postRecipesHandler);

module.exports = recipesRouter;

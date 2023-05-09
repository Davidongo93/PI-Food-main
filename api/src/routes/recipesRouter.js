const { Router } = require('express');
const recipesRouter = Router();
//import handlers
const {
    getRecipesHandler,
    getRecipeByIdHandler,
    postRecipesHandler
} = require ('../handlers/recipesHandlers.js')

// Get Routes.
recipesRouter.get('/',getRecipesHandler);
recipesRouter.get('/:id',getRecipeByIdHandler);

// Post Routes.
recipesRouter.post('/', postRecipesHandler);
module.exports = recipesRouter;
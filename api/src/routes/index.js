const { Router } = require('express');
const dietsRouter = require('./dietsRouter');
const recipesRouter = require('./recipesRouter');

const router = Router();

// Setting up routers
router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);

module.exports = router;

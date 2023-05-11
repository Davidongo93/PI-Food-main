const { Router } = require('express');
const dietsRouter = Router();

const getDietsHandler = require('../handlers/getDietsHandler.js');

// Define the endpoint for retrieving diets
dietsRouter.get('/', getDietsHandler);

module.exports = dietsRouter;

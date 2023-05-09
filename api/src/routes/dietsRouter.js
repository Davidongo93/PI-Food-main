const { Router } = require('express');
const dietsRouter = Router();
const getDietsHandler = require ('../handlers/getDietsHandler.js')

dietsRouter.get('/',getDietsHandler)
module.exports = dietsRouter;

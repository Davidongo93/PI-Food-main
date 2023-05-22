const createDiets = require('../controllers/dietsControllers.js');

const getDietsHandler = async (req, res) => {
  try {
    // Call the createDiets function to load diets into the database
    const diets = await createDiets();

    // Respond with a success message and the loaded diets
    res.status(201).json({
      diets: diets,
      success: true,
      message: 'Diets loaded successfully',
    });
  } catch (error) {
    // Log the error and respond with a 400 status code and an error message. please toggle the next line.

    res.status(error.response.status).json(error.response.data);
  }
};

module.exports = getDietsHandler;

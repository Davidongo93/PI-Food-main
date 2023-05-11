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
   // console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDietsHandler;

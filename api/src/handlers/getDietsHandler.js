const createDiets = require ('../controllers/dietsControllers.js')

const getDietsHandler =  async (req,res)=>{

    try {
    const dietsLoad = await createDiets();
    res.status(201).json({
        success: true,
        message: 'Dietas cargadas exitosamente en la base de datos'
    });

    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = getDietsHandler;
const { Op } = require('sequelize');
const { Recipe,Diet } = require('../db.js');
const axios = require ('axios');
const {KEY,URL} = process.env;


//Controller post Recipe
const createRecipe = async (title,image,summary,healthScore,analyzedInstructions,diets) => {
    const newRecipe = await Recipe.create({title,image,summary,healthScore,analyzedInstructions});
     // Busca las instancias de las dietas por su nombre y crea nuevas instancias si no existen
    const dietInstances = await Promise.all(diets.map(diet => Diet.findOrCreate({ where: { diet } })));
   // Agrega las instancias de las dietas a la receta en la tabla intermedia
    await newRecipe.setDiets(dietInstances.map(diet => diet[0].id));
   // Obtén las instancias de las dietas asociadas a la receta
    const recipeDiets = await newRecipe.getDiets();
   // Crea un objeto que contenga la información de la receta y la lista de dietas asociadas
    const result = [
       newRecipe,
        recipeDiets
     ] ;
  
    return result;
  };

//array para limpiar datos recibidos.
const cleanArray= (arr)=>{
    return arr.map(elem=>{
    return{
        id:elem.id,
        title:elem.title,
        image:elem.image
    }
})
};



const getRecipeByTitle = async (title) => {
    const dbRecipesRaw = await Recipe.findAll({
        where: {
            title:{
                [Op.iLike]:`%${title}%`
            }
        },
        limit:15
    });
    const apiRecipesRaw= (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&query=${title}`)).data.results;
    const apiRecipes = cleanArray(apiRecipesRaw);
    const dbRecipes = cleanArray(dbRecipesRaw);
    const result = [...dbRecipes,...apiRecipes]
    if (result.length === 0) {
        return { message: `There's no avaliable recipes for your query: '${title}'.` };
    }
    return result.slice(0, 15);
    
};


const getAllRecipes = async () =>{
    const apiRecipesRaw= (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100`)).data.results;
    const dbRecipesRaw = await Recipe.findAll();
    const dbRecipes = cleanArray(dbRecipesRaw);
    const apiRecipes = cleanArray(apiRecipesRaw);
    
    return await [...dbRecipes,...apiRecipes];
};

const getRecipeById = async(id,source) => {
    const response = 
    source === "api"
    ?await axios.get(`${URL}/${id}/information?apiKey=${KEY}`)
    :await Recipe.findByPk(id,{
        include: [{
          model: Diet,
          attributes: ['id', 'diet'],
        }],
      }).then(recipe => {
        if (!recipe) {
          throw new Error('Recipe not found');
        }
        const diets = recipe.diets.map(elem => ( elem.diet));
        const {id, title,summary,healthScore,analyzedInstructions} = recipe;
        return {id, title,summary,healthScore,diets,analyzedInstructions}
      })
      .catch(error => {
        console.error(error);
      });

 if (source === "api") {
        const {id,title, image, summary,healthScore,diets,analyzedInstructions} = response.data;
        return {id,title, image, summary,healthScore,diets,analyzedInstructions};
      } else {
       
 return response;
      }
};





module.exports = 
{createRecipe,getRecipeById, getRecipeByTitle, getAllRecipes}

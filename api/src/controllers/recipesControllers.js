const { Op } = require('sequelize');
const { Recipe,Diet } = require('../db.js');
const axios = require ('axios');
const {KEY,URL} = process.env;
// array helps to present data clean
const cleanArray= (arr)=>{
return arr.map(elem=>{
    return{
        id:elem.id,
        title:elem.title,
        image:elem.image
    }
})
};

const getAllRecipes = async () =>{
    const apiRecipesRaw= (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100`)).data.results;
    const dbRecipesRaw = await Recipe.findAll();
    const dbRecipes = cleanArray(dbRecipesRaw);
    const apiRecipes = cleanArray(apiRecipesRaw);
    
    return await [...dbRecipes,...apiRecipes];
};

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
  
const getRecipeByTitle = async (title) => {
    const dbRecipes = await Recipe.findAll({
        where: {
            title:{
                [Op.ilike]:`%${title}%`
            }
        },
        limit:15
    });
    console.log(await dbRecipes);
    const apiRecipesRaw= (await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&query=${title}`)).data.results;
    const apiRecipes = cleanArray(apiRecipesRaw);
    const result = [...dbRecipes,...apiRecipes]

};
/* 
    const apiVideogamesRaw = (await axios.get(`${URL}/games?search=${name}&key=${KEY}&pageSize=15`)).data.results;
    const apiVideogames = cleanArray(apiVideogamesRaw);
    const filteredApi = apiVideogames.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()));
    const result = [...dbVideogames, ...filteredApi];
    if (result.length === 0) {
      return { message: `No se encontró ningún videojuego que coincida con: '${name}'.` };
    }
    return result.slice(0, 15);
  }; */
const getRecipeById = () => {};





module.exports = 
{createRecipe,getRecipeById, getRecipeByTitle, getAllRecipes}

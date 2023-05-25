import {
    GET_DIETS,
    GET_RECIPE,
    GET_RECIPES,
    FIND_RECIPES,
    SORT_AZ_ASC,
    SORT_AZ_DES,
    SORT_HS_ASC,
    SORT_HS_DES,
    FILTER_SOURCE,
    FILTER_DIETS
  } from "./actions";
  
  const initialState = {
    backupRecipes: [],
    recipes: [],
    recipe: [],
    diets: []
  };
  
  const rootReducer = (state = initialState, action) => {
    let apiRecipes = [];
    let dbRecipes = [];
    const allRecipes = state.backupRecipes;

    switch (action.type) {
      case GET_DIETS:
        return { ...state, diets: action.payload };
      case GET_RECIPE:
        return { ...state, recipe: action.payload };
      case GET_RECIPES:
        return {
          ...state,
          recipes: action.payload,
          backupRecipes: action.payload
        };
      case FIND_RECIPES:
        return { ...state,
          recipes: action.payload,
          backupRecipes: action.payload
        };
      case SORT_AZ_ASC:
        const sortedRecipesAZ = [...state.recipes].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        return { ...state,
           recipes: sortedRecipesAZ,
           backupRecipes: sortedRecipesAZ
           };
      case SORT_AZ_DES:
        const sortedRecipesZA = [...state.recipes].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        return { ...state,
           recipes: sortedRecipesZA,
           backupRecipes: sortedRecipesZA
           };
      case SORT_HS_ASC:
        const sortedRecipesHSAsc = [...state.recipes].sort(
            (a, b) => b.healthScore - a.healthScore
          
        );
        return { ...state,
           recipes: sortedRecipesHSAsc,
           backupRecipes: sortedRecipesHSAsc
           };
      case SORT_HS_DES:
        const sortedRecipesHSDes = [...state.recipes].sort(
            (a, b) => a.healthScore - b.healthScore
        );
        return { ...state,
           recipes: sortedRecipesHSDes,
           backupRecipes: sortedRecipesHSDes
           };
      case FILTER_SOURCE:       
          if (action.payload==="ALL") {
            return { ...state, recipes:allRecipes  };
          } else {
            if (action.payload==="API") {
              apiRecipes = allRecipes.filter((recipes)=> !isNaN(recipes.id) );
              return {...state,
                recipes:apiRecipes
              };
            } else {
              dbRecipes = allRecipes.filter((recipes)=>isNaN(recipes.id));
              return {...state,
                recipes:dbRecipes
              };
            }
          }
          
      case FILTER_DIETS:
        if (action.payload === "ALL"){
          return {...state, recipes:allRecipes}
        } else {
          const filteredByDiets = allRecipes.filter((recipe) =>
          recipe.diets.includes(action.payload)
          );
          return { ...state, recipes: filteredByDiets };
        }
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
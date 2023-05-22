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
    recipes: [],
    recipe: [],
    diets: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DIETS:
        return { ...state, diets: action.payload };
      case GET_RECIPE:
        return { ...state, recipe: action.payload };
      case GET_RECIPES:
        return { ...state, recipes: action.payload };
      case FIND_RECIPES:
        return { ...state, recipes: action.payload };
      case SORT_AZ_ASC:
        const sortedRecipesAZ = [...state.recipes].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        return { ...state, recipes: sortedRecipesAZ };
      case SORT_AZ_DES:
        const sortedRecipesZA = [...state.recipes].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        return { ...state, recipes: sortedRecipesZA };
      case SORT_HS_ASC:
        const sortedRecipesHSAsc = [...state.recipes].sort(
            (a, b) => b.healthScore - a.healthScore
          
        );
        return { ...state, recipes: sortedRecipesHSAsc };
      case SORT_HS_DES:
        const sortedRecipesHSDes = [...state.recipes].sort(
            (a, b) => a.healthScore - b.healthScore
        );
        return { ...state, recipes: sortedRecipesHSDes };
      case FILTER_SOURCE:
        const filteredBySource = state.recipes.filter(
          (recipe) => recipe.source === action.payload
        );
        return { ...state, recipes: filteredBySource };
      case FILTER_DIETS:
        const filteredByDiets = state.recipes.filter((recipe) =>
          recipe.diets.includes(action.payload)
        );
        return { ...state, recipes: filteredByDiets };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
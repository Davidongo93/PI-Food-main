import {
    GET_DIETS,
    GET_RECIPE,
    GET_RECIPES,
    FIND_RECIPES,
    SORT_AZ_ASC,
  /*  SORT_AZ_DES,
    SORT_HS_ASC,
    SORT_HS_DES,
    FILTER_SOURCE,
    FILTER_DIETS */
} from "./actions";


const initialState = {
   recipes:[],
    recipe: [],
    diets: []
};
 const rootReducer = (state = initialState,action)=>{
    switch (action.type) {
       case GET_DIETS:
            return {...state,diets:action.payload}
        case GET_RECIPE:
            return {...state,recipe:action.payload}
        case GET_RECIPES:
            return {...state,recipes:action.payload}
        case FIND_RECIPES:
            return {...state,recipes:action.payload}
        case SORT_AZ_ASC:
         state.recipes.sort()
            return {...state}
       default:
        return {...state};
    };
 };
 export default rootReducer;

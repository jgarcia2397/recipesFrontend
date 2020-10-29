import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	recipes: [],
	recipeCreated: false,
	loading: false,
	error: null,
};

const createRecipeInit = (state, action) => {
	return updateObject(state, { recipeCreated: false });
};

const createRecipeStart = (state, action) => {
	return updateObject(state, { loading: true, recipeCreated: false });
};

const createRecipeSuccess = (state, action) => {
	const newIngredients = [...action.ingredients];
	const newDirections = [...action.directions];

	const newRecipe = {
		basicDetails: action.basicDetails,
		ingredients: newIngredients,
		directions: newDirections,
	};

	const newRecipeList = [...state.recipes, newRecipe];

	const updatedObject = {
		recipes: newRecipeList,
		loading: false,
		error: null,
		recipeCreated: true,
	};

	return updateObject(state, updatedObject);
};

const createRecipeFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		recipeCreated: false,
		error: action.error,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
        case actionTypes.CREATE_RECIPE_INIT:
			return createRecipeInit(state, action);
		case actionTypes.CREATE_RECIPE_START:
			return createRecipeStart(state, action);
		case actionTypes.CREATE_RECIPE_SUCCESS:
			return createRecipeSuccess(state, action);
		case actionTypes.CREATE_RECIPE_FAILED:
			return createRecipeFailed(state, action);
		default:
			return state;
	}
};

export default reducer;

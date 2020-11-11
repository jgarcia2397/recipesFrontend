import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	recipes: [],
	recipeId: -1,
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

const updateRecipeInit = (state, action) => {
	return updateObject(state, { recipeCreated: false, recipeId: action.id });
};

const updateRecipeStart = (state, action) => {
	return updateObject(state, { loading: true, recipeCreated: false });
};

// ToDo: This update is not fully working. Need to figure out how to merge oldRecipe object with new changes (newRecipe will have blank values for anything that did not change)
const updateRecipeSuccess = (state, action) => {
	const newIngredients = [...action.ingredients];
	const newDirections = [...action.directions];

	const newRecipe = {
		basicDetails: action.basicDetails,
		ingredients: newIngredients,
		directions: newDirections,
	};

	const newRecipeList = [...state.recipes];
	newRecipeList.splice(state.recipeId, 1, newRecipe);

	const updatedObject = {
		recipes: newRecipeList,
		loading: false,
		error: null,
		recipeCreated: true,
		recipeId: -1,
	};

	return updateObject(state, updatedObject);
};

const updateRecipeFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		recipeCreated: false,
		error: action.error,
		recipeId: -1,
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
		case actionTypes.UPDATE_RECIPE_INIT:
			return updateRecipeInit(state, action);
		case actionTypes.UPDATE_RECIPE_START:
			return updateRecipeStart(state, action);
		case actionTypes.UPDATE_RECIPE_SUCCESS:
			return updateRecipeSuccess(state, action);
		case actionTypes.UPDATE_RECIPE_FAILED:
			return updateRecipeFailed(state, action);
		default:
			return state;
	}
};

export default reducer;

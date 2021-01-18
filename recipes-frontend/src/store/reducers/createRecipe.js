import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	recipes: [],
	currentRecipe: {},
	recipeId: -1,
	recipeCreated: false,
	recipeDeleted: false,
	isModifyRecipe: false,
	loading: false,
	error: null,
};

const getRecipeByRecipeIdStart = (state, action) => {
	return updateObject(state, { loading: true, error: null });
};

const getRecipeByRecipeIdSuccess = (state, action) => {
	const foundRecipe = {...action.recipe};

	return updateObject(state, {
		currentRecipe: foundRecipe,
		loading: false,
		error: null,
	});
};

const getRecipeByRecipeIdFailed = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const getAllUserRecipesStart = (state, action) => {
	return updateObject(state, { loading: true, error: null });
};

const getAllUserRecipesSuccess = (state, action) => {
	return updateObject(state, {
		recipes: action.recipes,
		loading: false,
		error: null,
	});
};

const getAllUserRecipesFailed = (state, action) => {
	return updateObject(state, { loading: false, error: action.error });
};

const createRecipeInit = (state, action) => {
	localStorage.setItem('isModifyRecipe', false);
	return updateObject(state, { recipeCreated: false, isModifyRecipe: false });
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
	localStorage.setItem('isModifyRecipe', true);
	return updateObject(state, {
		recipeCreated: false,
		recipeId: action.id,
		isModifyRecipe: true,
	});
};

const updateRecipeStart = (state, action) => {
	return updateObject(state, { loading: true, recipeCreated: false });
};

// helper function for updateRecipeSuccess
const mergeObjects = (obj1, obj2) => {
	let answer = { ...obj1 };

	const keys = Object.keys(obj2);

	for (const key of keys) {
		if (obj2[key] !== '') {
			answer[key] = obj2[key];
		}
	}
	return answer;
};

// ToDo: RecipeList for ingredients and directions does not re-render when updating a recipe
const updateRecipeSuccess = (state, action) => {
	// const newIngredients = [...state.recipes[state.recipeId].ingredients, ...action.ingredients];
	// const newDirections = [...state.recipes[state.recipeId].directions, ...action.directions];
	const newIngredients = [...action.ingredients];
	const newDirections = [...action.directions];

	const newBasicDetails = mergeObjects(
		state.recipes[state.recipeId].basicDetails,
		action.basicDetails
	);

	const newRecipe = {
		basicDetails: newBasicDetails,
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

const deleteRecipeInit = (state, action) => {
	return updateObject(state, { recipeDeleted: false });
};

const deleteRecipeStart = (state, action) => {
	return updateObject(state, { loading: true, recipeDeleted: false });
};

const deleteRecipeSuccess = (state, action) => {
	return updateObject(state, { loading: false, recipeDeleted: true });
};

const deleteRecipeFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		recipeDeleted: false,
		error: action.error,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_RECIPE_BY_RECIPE_ID_START:
			return getRecipeByRecipeIdStart(state, action);
		case actionTypes.GET_RECIPE_BY_RECIPE_ID_SUCCESS:
			return getRecipeByRecipeIdSuccess(state, action);
		case actionTypes.GET_RECIPE_BY_RECIPE_ID_FAILED:
			return getRecipeByRecipeIdFailed(state, action);
		case actionTypes.GET_ALL_USER_RECIPES_START:
			return getAllUserRecipesStart(state, action);
		case actionTypes.GET_ALL_USER_RECIPES_SUCCESS:
			return getAllUserRecipesSuccess(state, action);
		case actionTypes.GET_ALL_USER_RECIPES_FAILED:
			return getAllUserRecipesFailed(state, action);
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
		case actionTypes.DELETE_RECIPE_INIT:
			return deleteRecipeInit(state, action);
		case actionTypes.DELETE_RECIPE_START:
			return deleteRecipeStart(state, action);
		case actionTypes.DELETE_RECIPE_SUCCESS:
			return deleteRecipeSuccess(state, action);
		case actionTypes.DELETE_RECIPE_FAILED:
			return deleteRecipeFailed(state, action);
		default:
			return state;
	}
};

export default reducer;

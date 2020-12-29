import * as actionTypes from './actionTypes';
import axiosRecipes from '../../axios-recipes';

export const getAllUserRecipesStart = () => {
	return {
		type: actionTypes.GET_ALL_USER_RECIPES_START,
	};
};

export const getAllUserRecipesSuccess = recipes => {
	return {
		type: actionTypes.GET_ALL_USER_RECIPES_SUCCESS,
		recipes,
	};
};

export const getAllUserRecipesFailed = error => {
	return {
		type: actionTypes.GET_ALL_USER_RECIPES_FAILED,
		error: error,
	};
};

export const getAllUserRecipes = userId => {
	return dispatch => {
		dispatch(getAllUserRecipesStart());

		axiosRecipes
			.get(`/recipes/user/${userId}`)
			.then(response => {
				dispatch(getAllUserRecipesSuccess(response.data.recipes));
			})
			.catch(err => {
				dispatch(getAllUserRecipesFailed(err.response.data.message));
			});
	};
};

export const createRecipeInit = () => {
	return {
		type: actionTypes.CREATE_RECIPE_INIT,
		isModifyRecipe: false,
	};
};

export const createRecipeStart = () => {
	return {
		type: actionTypes.CREATE_RECIPE_START,
	};
};

export const createRecipeSuccess = (basicDetails, ingredients, directions) => {
	return {
		type: actionTypes.CREATE_RECIPE_SUCCESS,
		basicDetails: basicDetails,
		ingredients: ingredients,
		directions: directions,
	};
};

export const createRecipeFailed = error => {
	return {
		type: actionTypes.CREATE_RECIPE_FAILED,
		error: error,
	};
};

export const createRecipe = (basicDetails, ingredients, directions, creatorId) => {
	return dispatch => {
		dispatch(createRecipeStart());

		const newRecipe = {
			basicDetails,
			ingredients,
			directions,
			creator: creatorId,
		};

		axiosRecipes
			.post('/recipes', JSON.stringify(newRecipe))
			.then(response => {
				dispatch(
					createRecipeSuccess(
						response.data.recipe.basicDetails,
						response.data.recipe.ingredients,
						response.data.recipe.directions
					)
				);
			})
			.catch(err => {
				// ToDo: This only returns error message from backend. For all requests, need to handle the error case for network issue with backend and no response is sent - need to show default error in this case 
				dispatch(createRecipeFailed(err.response.data.message));		
			});
	};
};

export const updateRecipeInit = recipeId => {
	return {
		type: actionTypes.UPDATE_RECIPE_INIT,
		id: recipeId,
		isModifyRecipe: true,
	};
};

export const updateRecipeStart = () => {
	return {
		type: actionTypes.UPDATE_RECIPE_START,
	};
};

export const updateRecipeSuccess = (basicDetails, ingredients, directions) => {
	return {
		type: actionTypes.UPDATE_RECIPE_SUCCESS,
		basicDetails: basicDetails,
		ingredients: ingredients,
		directions: directions,
	};
};

export const updateRecipeFailed = error => {
	return {
		type: actionTypes.UPDATE_RECIPE_FAILED,
		error: error,
	};
};

export const updateRecipe = (basicDetails, ingredients, directions, recipeId) => {
	return dispatch => {
		dispatch(updateRecipeStart());

		const updatedRecipe = {
			basicDetails,
			ingredients,
			directions,
		};

		axiosRecipes
			.patch(`/recipes/${recipeId}`, JSON.stringify(updatedRecipe))
			.then(response => {
				dispatch(
					updateRecipeSuccess(
						response.data.recipe.basicDetails,
						response.data.recipe.ingredients,
						response.data.recipe.directions
					)
				);
			})
			.catch(err => {
				// ToDo: This only returns error message from backend. For all requests, need to handle the error case for network issue with backend and no response is sent - need to show default error in this case 
				dispatch(updateRecipeFailed(err.response.data.message));		
			});
	};
};

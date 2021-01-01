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

export const createRecipe = (
	basicDetails,
	ingredients,
	directions,
	creatorId,
	image
) => {
	return dispatch => {
		dispatch(createRecipeStart());

		const {
			recipeName,
			prepTime,
			prepTimeUnits,
			cookTime,
			cookTimeUnits,
			servings,
			difficulty,
		} = basicDetails;

		const formData = new FormData();
		
		formData.append('recipeName', recipeName);
		formData.append('prepTime', prepTime);
		formData.append('prepTimeUnits', prepTimeUnits);
		formData.append('cookTime', cookTime);
		formData.append('cookTimeUnits', cookTimeUnits);
		formData.append('servings', servings);
		formData.append('difficulty', difficulty);
		formData.append('creator', creatorId);
		formData.append('image', image);

		for (let i = 0; i < ingredients.length; i++) {
			formData.append('ingredients[]', ingredients[i]);
		}

		for (let i = 0; i < directions.length; i++) {
			formData.append('directions[]', directions[i]);
		}

		axiosRecipes
			.post('/recipes', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
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

export const updateRecipe = (
	basicDetails,
	ingredients,
	directions,
	recipeId
) => {
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

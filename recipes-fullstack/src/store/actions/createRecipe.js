import * as actionTypes from './actionTypes';

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

export const createRecipe = (basicDetails, ingredients, directions) => {
	return dispatch => {
        dispatch(createRecipeStart());

        try {
            dispatch(createRecipeSuccess(basicDetails, ingredients, directions));
        } 
        catch (err) {
            dispatch(createRecipeFailed(err));
        }
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

export const updateRecipe = (basicDetails, ingredients, directions) => {
	return dispatch => {
        dispatch(updateRecipeStart());

        try {
            dispatch(updateRecipeSuccess(basicDetails, ingredients, directions));
        } 
        catch (err) {
            dispatch(updateRecipeFailed(err));
        }
    };
};
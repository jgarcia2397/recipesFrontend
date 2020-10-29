import * as actionTypes from './actionTypes';

export const createRecipeInit = () => {
	return {
		type: actionTypes.CREATE_RECIPE_INIT,
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

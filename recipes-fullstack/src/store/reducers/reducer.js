import * as actionTypes from '../actions/actionTypes';

const initialState = {
    prepTime: '',
    prepTImeUnits: 'minutes',
    cookTime: '',
    cookTimeUnits: 'minutes',
    servings: '',
    difficulty: 'Easy',
    ingredients: [],
    directions: [],
};

const reducer = (state = initialState, action) => {};

export default reducer;
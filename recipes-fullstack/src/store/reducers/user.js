import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	name: 'Your Name',
	title: 'Your Title',
	nameAndTitleUpdated: false,
	aboutMe: 'Tell us a bit about yourself!',
	aboutMeUpdated: false,
	favesToCook: 'Feel free to brag about your most famous dishes!',
	favesToCookUpdated: false,
	loading: false,
	error: null,
};

const setNameAndTitleStart = (state, action) => {
	return updateObject(state, {
		loading: true,
		nameAndTitleUpdated: false,
		error: null,
	});
};

const setNameAndTitleSuccess = (state, action) => {
	const updatedState = {
		name: action.name,
		title: action.title,
		nameAndTitleUpdated: true,
		loading: false,
		error: null,
	};

	return updateObject(state, updatedState);
};

const setNameAndTitleFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: action.error,
		nameAndTitleUpdated: false,
	});
};

const setAboutMeStart = (state, action) => {
	return updateObject(state, {
		loading: true,
		aboutMeUpdated: false,
		error: null,
	});
};

const setAboutMeSuccess = (state, action) => {
	const updatedState = {
		aboutMe: action.value,
		aboutMeUpdated: true,
		loading: false,
		error: null,
	};

	return updateObject(state, updatedState);
};

const setAboutMeFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: action.error,
		aboutMeUpdated: false,
	});
};

const setFavesToCookStart = (state, action) => {
	return updateObject(state, {
		loading: true,
		favesToCookUpdated: false,
		error: null,
	});
};

const setFavesToCookSuccess = (state, action) => {
	const updatedState = {
		favesToCook: action.value,
		favesToCookUpdated: true,
		loading: false,
		error: null,
	};

	return updateObject(state, updatedState);
};

const setFavesToCookFailed = (state, action) => {
	return updateObject(state, {
		loading: false,
		error: action.error,
		favesToCookUpdated: false,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_NAME_AND_TITLE_START:
			return setNameAndTitleStart(state, action);
		case actionTypes.SET_NAME_AND_TITLE_SUCCCESS:
			return setNameAndTitleSuccess(state, action);
		case actionTypes.SET_NAME_AND_TITLE_FAILED:
			return setNameAndTitleFailed(state, action);
		case actionTypes.SET_ABOUT_ME_START:
			return setAboutMeStart(state, action);
		case actionTypes.SET_ABOUT_ME_SUCCCESS:
			return setAboutMeSuccess(state, action);
		case actionTypes.SET_ABOUT_ME_FAILED:
			return setAboutMeFailed(state, action);
		case actionTypes.SET_FAVE_COOKS_START:
			return setFavesToCookStart(state, action);
		case actionTypes.SET_FAVE_COOKS_SUCCESS:
			return setFavesToCookSuccess(state, action);
		case actionTypes.SET_FAVE_COOKS_FAILED:
			return setFavesToCookFailed(state, action);
		default:
			return state;
	}
};

export default reducer;

import * as actionTypes from './actionTypes';

export const setNameAndTitleStart = () => {
	return {
		type: actionTypes.SET_NAME_AND_TITLE_START,
	};
};

export const setNameAndTitleSuccess = (nameVal, titleVal) => {
	return {
		type: actionTypes.SET_NAME_AND_TITLE_SUCCESS,
        name: nameVal,
        title: titleVal,
	};
};

export const setNameAndTitleFailed = error => {
	return {
		type: actionTypes.SET_NAME_AND_TITLE_FAILED,
		error: error,
	};
};

export const setNameAndTitle = (name, title) => {
	return dispatch => {
        dispatch(setNameAndTitleStart());

        try {
            dispatch(setNameAndTitleSuccess(name, title));
        } 
        catch (err) {
            dispatch(setNameAndTitleFailed(err));
        }
    };
};

export const setAboutMeStart = () => {
	return {
		type: actionTypes.SET_ABOUT_ME_START,
	};
};

export const setAboutMeSuccess = (newValue) => {
	return {
		type: actionTypes.SET_ABOUT_ME_SUCCESS,
        value: newValue,
	};
};

export const setAboutMeFailed = error => {
	return {
		type: actionTypes.SET_ABOUT_ME_FAILED,
		error: error,
	};
};

export const setAboutMe = (value) => {
	return dispatch => {
        dispatch(setAboutMeStart());

        try {
            dispatch(setAboutMeSuccess(value));
        } 
        catch (err) {
            dispatch(setAboutMeFailed(err));
        }
    };
};

export const setFavesToCookStart = () => {
	return {
		type: actionTypes.SET_FAVE_COOKS_START,
	};
};

export const setFavesToCookSuccess = (newValue) => {
	return {
		type: actionTypes.SET_FAVE_COOKS_SUCCESS,
        value: newValue,
	};
};

export const setFavesToCookFailed = error => {
	return {
		type: actionTypes.SET_FAVE_COOKS_FAILED,
		error: error,
	};
};

export const setFavesToCook = (value) => {
	return dispatch => {
        dispatch(setFavesToCookStart());

        try {
            dispatch(setFavesToCookSuccess(value));
        } 
        catch (err) {
            dispatch(setFavesToCookFailed(err));
        }
    };
};
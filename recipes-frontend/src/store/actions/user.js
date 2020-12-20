import * as actionTypes from './actionTypes';
import axiosRecipes from '../../axios-recipes';

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
		} catch (err) {
			dispatch(setNameAndTitleFailed(err));
		}
	};
};

export const setAboutMeStart = () => {
	return {
		type: actionTypes.SET_ABOUT_ME_START,
	};
};

export const setAboutMeSuccess = newValue => {
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

export const setAboutMe = value => {
	return dispatch => {
		dispatch(setAboutMeStart());

		try {
			dispatch(setAboutMeSuccess(value));
		} catch (err) {
			dispatch(setAboutMeFailed(err));
		}
	};
};

export const setFavesToCookStart = () => {
	return {
		type: actionTypes.SET_FAVE_COOKS_START,
	};
};

export const setFavesToCookSuccess = newValue => {
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

export const setFavesToCook = value => {
	return dispatch => {
		dispatch(setFavesToCookStart());

		try {
			dispatch(setFavesToCookSuccess(value));
		} catch (err) {
			dispatch(setFavesToCookFailed(err));
		}
	};
};

export const authLoginStart = () => {
	return {
		type: actionTypes.AUTH_LOGIN_START,
		isLoggedIn: false,
	};
};

export const authLoginSuccess = (email, password) => {
	return {
		type: actionTypes.AUTH_LOGIN_SUCCESS,
		email: email,
		password: password,
		isLoggedIn: true,
	};
};

export const authLoginFailed = error => {
	return {
		type: actionTypes.AUTH_LOGIN_FAILED,
		error: error,
		isLoggedIn: false,
	};
};

export const authLogin = (email, password) => {
	return dispatch => {
		dispatch(authLoginStart());

		try {
			dispatch(authLoginSuccess(email, password));
		} catch (err) {
			dispatch(authLoginFailed(err));
		}
	};
};

export const authSignupStart = () => {
	return {
		type: actionTypes.AUTH_SIGNUP_START,
		isLoggedIn: false,
	};
};

export const authSignupSuccess = (name, email, password) => {
	return {
		type: actionTypes.AUTH_SIGNUP_SUCCESS,
		name: name,
		email: email,
		password: password,
		isLoggedIn: true,
	};
};

export const authSignupFailed = error => {
	return {
		type: actionTypes.AUTH_SIGNUP_FAILED,
		error: error,
		isLoggedIn: false,
	};
};

export const authSignup = (name, email, password) => {
	return dispatch => {
		dispatch(authSignupStart());

		const authData = {
			name,
			email,
			password,
		};

		try {
			axiosRecipes
				.post('/user/signup', JSON.stringify(authData))
				.then(response => {
					dispatch(
						authSignupSuccess(
							response.data.name,
							response.data.email,
							response.data.password
						)
					);
				})
				.catch(err => {
					dispatch(authSignupFailed(err.response.data.error));
				});
		} catch (err) {
			dispatch(authSignupFailed(err));
		}
	};
};

// export const authLogout = () => {};

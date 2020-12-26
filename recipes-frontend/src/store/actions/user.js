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

export const setAboutMe = (userId, name, title, newAboutMeValue, favesToCook) => {
	return dispatch => {
		dispatch(setAboutMeStart());

		const updatedUserData = {
			name,
			title,
			aboutMe: newAboutMeValue,
			favesToCook,
			image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',		// dummy image for now
		};

		axiosRecipes
			.patch(`/user/${userId}`, updatedUserData)
			.then(response => {
				dispatch(setAboutMeSuccess(response.data.user.aboutMe));
			})
			.catch(err => {
				dispatch(setAboutMeFailed(err.response.data.message));
			});
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

export const setFavesToCook = (userId, name, title, aboutMe, newFavesToCook) => {
	return dispatch => {
		dispatch(setFavesToCookStart());

		const updatedUserData = {
			name,
			title,
			aboutMe,
			favesToCook: newFavesToCook,
			image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',		// dummy image for now
		};

		axiosRecipes
			.patch(`/user/${userId}`, updatedUserData)
			.then(response => {
				dispatch(setFavesToCookSuccess(response.data.user.favesToCook));
			})
			.catch(err => {
				dispatch(setFavesToCookFailed(err.response.data.message));
			});
	};
};

export const getUserStart = () => {
	return {
		type: actionTypes.GET_USER_START,
	};
};

export const getUserSuccess = (name, title, aboutMe, favesToCook, recipes) => {
	return {
		type: actionTypes.GET_USER_SUCCESS,
		name,
		title,
		aboutMe,
		favesToCook,
		recipes,
	};
};

export const getUserFailed = error => {
	return {
		type: actionTypes.GET_USER_FAILED,
		error: error,
	};
};

export const getUser = userId => {
	return dispatch => {
		dispatch(getUserStart());

		axiosRecipes
			.get(`/user/${userId}`)
			.then(response => {
				dispatch(
					getUserSuccess(
						response.data.user.name,
						response.data.user.title,
						response.data.user.aboutMe,
						response.data.user.favesToCook,
						response.data.user.recipes
					)
				);
			})
			.catch(err => {
				dispatch(getUserFailed(err.response.data.message));
			});
	};
};

export const authLoginStart = () => {
	return {
		type: actionTypes.AUTH_LOGIN_START,
		isLoggedIn: false,
	};
};

export const authLoginSuccess = (email, password, userId) => {
	return {
		type: actionTypes.AUTH_LOGIN_SUCCESS,
		email: email,
		password: password,
		id: userId,
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

		const authData = {
			email,
			password,
		};

		axiosRecipes
			.post('/user/login', JSON.stringify(authData))
			.then(response => {
				dispatch(
					authLoginSuccess(
						response.data.email,
						response.data.password,
						response.data.user.id
					)
				);
			})
			.catch(err => {
				dispatch(authLoginFailed(err.response.data.message));
			});
	};
};

export const authSignupStart = () => {
	return {
		type: actionTypes.AUTH_SIGNUP_START,
		isLoggedIn: false,
	};
};

export const authSignupSuccess = (name, email, password, userId) => {
	return {
		type: actionTypes.AUTH_SIGNUP_SUCCESS,
		name: name,
		email: email,
		password: password,
		id: userId,
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

		axiosRecipes
			.post('/user/signup', JSON.stringify(authData))
			.then(response => {
				dispatch(
					authSignupSuccess(
						response.data.name,
						response.data.email,
						response.data.password,
						response.data.user.id
					)
				);
			})
			.catch(err => {
				dispatch(authSignupFailed(err.response.data.message));
			});
	};
};

// export const authLogout = () => {};
